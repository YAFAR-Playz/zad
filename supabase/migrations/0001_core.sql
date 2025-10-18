-- RadSystems Supabase Schema Migration
-- Defines global metadata tables and per-organization schema template objects.

-- Global schema ensures central management for organizations and subscriptions.
create schema if not exists global;
set search_path = global, public;

create table if not exists organizations (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    slug text generated always as (lower(replace(name, ' ', '-'))) stored,
    logo_url text,
    colors jsonb default '{}'::jsonb,
    domain text,
    owner_id uuid not null,
    subscription_tier text not null default 'free',
    stripe_customer_id text,
    stripe_subscription_id text,
    created_at timestamptz not null default now()
);

create unique index if not exists organizations_slug_idx on organizations(slug);
create unique index if not exists organizations_domain_idx on organizations(domain) where domain is not null;

create table if not exists subscriptions (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references organizations(id) on delete cascade,
    plan text not null,
    status text not null,
    current_period_start timestamptz,
    current_period_end timestamptz,
    cancel_at_period_end boolean default false,
    metadata jsonb default '{}'::jsonb,
    created_at timestamptz not null default now()
);

create table if not exists usage_logs (
    id bigint generated always as identity primary key,
    organization_id uuid not null references organizations(id) on delete cascade,
    module text not null,
    action text not null,
    payload jsonb,
    created_at timestamptz not null default now()
);

create table if not exists org_memberships (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references organizations(id) on delete cascade,
    user_id uuid not null,
    role text not null,
    created_at timestamptz not null default now()
);

-- Helper function to create an isolated schema per organization.
create or replace function create_org_schema(p_org_id uuid)
returns void
language plpgsql
security definer
as $$
declare
    schema_name text := format('org_%s', replace(p_org_id::text, '-', ''));
begin
    execute format('create schema if not exists %I', schema_name);

    -- Within the organization schema create all scoped tables.
    execute format($f$
        set search_path = %I;

        create table if not exists users (
            id uuid primary key default gen_random_uuid(),
            auth_uid uuid not null,
            role text not null,
            name text,
            email text not null,
            phone text,
            status text not null default 'active',
            created_at timestamptz not null default now()
        );

        create unique index if not exists users_email_idx on users(email);

        create table if not exists courses (
            id uuid primary key default gen_random_uuid(),
            name text not null,
            unit text,
            head_id uuid,
            supervisor_id uuid,
            config_json jsonb not null default '{{}}'::jsonb,
            created_at timestamptz not null default now()
        );

        create table if not exists assistants (
            id uuid primary key default gen_random_uuid(),
            name text not null,
            email text not null,
            course_id uuid references courses(id) on delete set null,
            start_date date,
            end_date date,
            status text not null default 'pending',
            phone text,
            office_hours text,
            auto_id text,
            created_at timestamptz not null default now()
        );

        create unique index if not exists assistants_email_idx on assistants(lower(email));
        create unique index if not exists assistants_auto_id_idx on assistants(auto_id) where auto_id is not null;

        create table if not exists students (
            id uuid primary key default gen_random_uuid(),
            assistant_id uuid references assistants(id) on delete set null,
            name text not null,
            email text,
            phone text,
            parent_phone text,
            status text not null default 'active',
            course_id uuid references courses(id) on delete set null,
            joined_at timestamptz not null default now()
        );

        create table if not exists parents (
            id uuid primary key default gen_random_uuid(),
            name text not null,
            email text,
            phone text,
            created_at timestamptz not null default now()
        );

        create table if not exists parent_student_link (
            parent_id uuid references parents(id) on delete cascade,
            student_id uuid references students(id) on delete cascade,
            created_at timestamptz not null default now(),
            primary key (parent_id, student_id)
        );

        create table if not exists assignments (
            id uuid primary key default gen_random_uuid(),
            assistant_id uuid references assistants(id) on delete cascade,
            student_id uuid references students(id) on delete cascade,
            title text not null,
            due_date date,
            status text not null default 'pending',
            metadata jsonb default '{{}}'::jsonb,
            created_at timestamptz not null default now()
        );

        create table if not exists reports (
            id uuid primary key default gen_random_uuid(),
            student_id uuid references students(id) on delete cascade,
            course_id uuid references courses(id) on delete cascade,
            assistant_id uuid references assistants(id) on delete set null,
            month date not null,
            pdf_url text,
            email_status text default 'pending',
            share_status text default 'draft',
            created_at timestamptz not null default now()
        );

        create unique index if not exists reports_student_month_idx on reports(student_id, month);

        create table if not exists hr_records (
            id uuid primary key default gen_random_uuid(),
            assistant_id uuid references assistants(id) on delete cascade,
            salary numeric(10,2) not null,
            bonus numeric(10,2) default 0,
            deductions numeric(10,2) default 0,
            total numeric(10,2) not null,
            month date not null,
            approved_by uuid,
            generated_at timestamptz not null default now()
        );

        create table if not exists finance_records (
            id uuid primary key default gen_random_uuid(),
            type text not null,
            description text,
            amount numeric(10,2) not null,
            date date not null,
            reference text,
            category text,
            created_at timestamptz not null default now()
        );

        create table if not exists notifications (
            id uuid primary key default gen_random_uuid(),
            user_id uuid,
            type text not null,
            message text not null,
            status text not null default 'unread',
            created_at timestamptz not null default now()
        );

        create table if not exists quota_counters (
            id bigint generated always as identity primary key,
            module text not null,
            count integer not null default 0,
            period_start timestamptz not null,
            period_end timestamptz not null
        );

    $f$, schema_name);
end;
$$;

-- Function to ensure schema is created whenever a new organization is inserted.
create or replace function handle_new_organization()
returns trigger
language plpgsql
as $$
begin
    perform create_org_schema(new.id);
    return new;
end;
$$;

create trigger organizations_after_insert
    after insert on organizations
    for each row
    execute function handle_new_organization();

reset search_path;

-- Row Level Security Policies template (executed per schema via helper function).
create or replace function apply_org_rls(p_org_id uuid)
returns void
language plpgsql
security definer
as $$
declare
    schema_name text := format('org_%s', replace(p_org_id::text, '-', ''));
    policy_sql text;
begin
    -- Enable RLS for all tables in the org schema and enforce organization based on JWT claim.
    for policy_sql in
        select format('alter table %I.%I enable row level security;', schema_name, tablename)
        from pg_tables
        where schemaname = schema_name
    loop
        execute policy_sql;
    end loop;

    -- Apply simple RLS policy requiring matching org_id claim.
    for policy_sql in
        select format($policy$
            create policy org_access_%I on %I.%I
            using (current_setting('request.jwt.claim.org_id', true)::uuid = %L::uuid)
            with check (current_setting('request.jwt.claim.org_id', true)::uuid = %L::uuid);
        $policy$, tablename, schema_name, tablename, p_org_id::text, p_org_id::text)
        from pg_tables
        where schemaname = schema_name
    loop
        begin
            execute policy_sql;
        exception when duplicate_object then
            null;
        end;
    end loop;
end;
$$;

-- Call apply_org_rls for existing organizations (no-op if none yet)
select apply_org_rls(id) from global.organizations;
