🧭 PRODUCT REQUIREMENTS DOCUMENT (PRD)

Product: RadSystems – Multi-Tenant Education Management Platform

Version: 2.0 (Supabase Edition)

Owner: Yehia Rady (RadSystems)

Target Stack: Next.js (App Router) + Supabase + Tailwind + TypeScript

Deployment: Vercel (frontend), Supabase (backend)

⸻

1. PRODUCT GOAL

Rebuild the current Google Sheets–based RadSystems Assistant Management ecosystem as a multi-tenant web platform.
Each organization (school, tutoring center, or private teacher) gets its own workspace, database isolation, branding, and domain, while keeping all the existing logic (assistant, student, HR, finance, reports) plus new Parent, HR, and Finance portals.

⸻

2. CORE ENTITIES & RELATIONSHIPS

2.1 Entity Map

Organization 1—N Users
Organization 1—N Courses
Course 1—N Assistants
Assistant 1—N Students
Student 1—1 Parent
Assistant 1—N Assignments
Course 1—N Reports
Organization 1—N HRRecords
Organization 1—N FinanceRecords

2.2 Roles

Role	Scope	Capabilities
owner	Organization	Full control, subscription, settings
admin	Organization	User management, HR/Finance
supervisor	Multi-course	Approve assistants, oversee heads
head	Course	Manage assistants/students, run reports
assistant	Course	Update assignments, mark progress
student	Personal	View reports
parent	Children	View children progress
hr	Organization	Payroll, contracts, salary slips
finance	Organization	Income/expenses, subscriptions


⸻

3. MULTI-TENANCY DESIGN
	•	Supabase schema per organization (org_<id>).
	•	Global schema stores:
	•	organizations
	•	subscriptions
	•	usage_logs
	•	Row Level Security (RLS): every query filters by organization_id.
	•	Custom subdomain routing:
https://{org_slug}.radsystems.app
	•	White-label option: custom domains.

⸻

4. AUTHENTICATION & AUTHORIZATION
	•	Supabase Auth (email/password + magic link + OAuth).
	•	On signup → new org or join existing org.
	•	JWT claims include: { org_id, role }.
	•	Middleware:
	•	Redirect unauthorized users.
	•	Auto-expire tokens after 24 h inactivity.
	•	Role-based UI routing via Next.js middleware.

⸻

5. CORE MODULES

5.1 Organization Module

Tables
	•	organizations (id, name, logo_url, colors, domain, owner_id, subscription_tier, created_at)

Functions
	•	createOrganization(org_name, owner_id, brand_colors)
	•	updateBranding(org_id, logo, colors)
	•	getOrganizationUsage(org_id)

⸻

5.2 User Management

Tables
	•	users (id, auth_uid, org_id, role, name, email, phone, status, created_at)
	•	Invite & approval workflow via email link.

Features
	•	Role assignment
	•	Suspend/reactivate
	•	Password reset
	•	Two-factor (optional future)

⸻

5.3 Assistant Management

Tables
	•	assistants (id, org_id, name, email, course_id, start_date, end_date, status, phone, office_hours, auto_id)
	•	Auto-ID generation: coursePrefix + sequence.
	•	Approval workflow (status = pending → email Approve/Reject).
	•	Duplicate prevention.

Endpoints
	•	POST /api/assistants/add
	•	PATCH /api/assistants/{id}/approve
	•	PATCH /api/assistants/{id}/remove

⸻

5.4 Student Management

Tables
	•	students (id, org_id, assistant_id, name, email, phone, parent_phone, status, course_id, joined_at)
	•	Auto-assign to assistant with < 31 students.
	•	Ignore if status='Left'.

Endpoints
	•	POST /api/students/import (CSV or manual)
	•	PATCH /api/students/{id}/updateStatus
	•	GET /api/students/assistant/{assistant_id}

⸻

5.5 Course Configuration

Tables
	•	courses (id, org_id, name, unit, head_id, supervisor_id, config_json)
	•	config_json contains mapping:

{
  "StudentsTab": {"ExtraColumns":["T","U"]},
  "SchoolsTab": {"ExtraColumns":["V","W"]},
  "Sections": {
    "Homework":["H","I"],
    "Quiz":["J","K","L"],
    "Classwork":["M","N"],
    "Final":["O","P"]
  }
}



Endpoints
	•	/api/courses CRUD
	•	/api/courses/{id}/config

⸻

5.6 Monthly Report System

Tables
	•	reports (id, org_id, student_id, course_id, month, pdf_url, email_status, share_status, created_at)
	•	Generation Flow
	1.	Collect data via Supabase function → JSON.
	2.	Build styled PDF (RadSystems template).
	3.	Store in Supabase Storage /reports/{course}/{assistant}/{student}.pdf.
	4.	Email parent/student.
	5.	Update quota log.

Quota Rules
	•	≤ 100 emails/day/org
	•	≤ 500 share actions/day/org
	•	Auto-resume trigger every 24 h if quota hit.

⸻

5.7 HR Module

Tables
	•	hr_records (id, org_id, assistant_id, salary, bonus, deductions, total, month, approved_by, generated_at)
	•	Generate salary slip PDF.
	•	Export all HR data (CSV).

⸻

5.8 Finance Module

Tables
	•	finance_records (id, org_id, type, description, amount, date, reference, category)
	•	Track expenses, assistant payments, revenues.
	•	Integrate Stripe:
	•	/api/stripe/webhook handles subscription updates.

⸻

5.9 Parent Portal

Tables
	•	parents (id, org_id, name, email, phone)
	•	parent_student_link (parent_id, student_id)
	•	Features:
	•	Dashboard of children.
	•	Download reports.
	•	Contact buttons (WhatsApp/Email).
	•	Notification preferences.

Endpoints
	•	/api/parents/register
	•	/api/parents/login
	•	/api/parents/{id}/children

⸻

5.10 Notifications

Tables
	•	notifications (id, org_id, user_id, type, message, status, created_at)
Integrations
	•	Email via Resend/Postmark.
	•	WhatsApp via Twilio/Meta API.

⸻

5.11 Dashboard & Analytics
	•	Built with Recharts + Supabase views.
	•	Role-based metrics:
	•	Admin: active assistants, student counts, reports generated.
	•	HR: salary summary.
	•	Parent: children performance chart.

⸻

5.12 Branding & Customization
	•	Org chooses theme colors, logo, favicon.
	•	Login page auto-applies branding.
	•	Emails include org header/footer.

⸻

5.13 Super Admin (RadSystems HQ)

Tables
	•	organizations (global)
	•	usage_logs
	•	subscriptions
	•	Access dashboards for monitoring tenants.

⸻

6. FRONTEND ROUTE MAP (Next.js App Router)

Path	Access	Description
/login	Public	Org-branded login
/register	Public	Org or user registration
/dashboard	All roles	Redirects based on role
/admin/*	Owner/Admin	Organization settings
/supervisor/*	Supervisor	Approvals overview
/head/*	Head	Manage assistants/students
/assistant/*	Assistant	Student list, assignments
/student/*	Student	View personal data/reports
/parent/*	Parent	Children overview
/hr/*	HR	Payroll, salary slips
/finance/*	Finance	Expenses, income
/reports/*	Head/Admin	Generate/view reports
/settings/*	Owner	Branding, subscription


⸻

7. API CONTRACT (High-Level)

Auth
	•	POST /api/auth/signup
	•	POST /api/auth/login
	•	POST /api/auth/invite
	•	POST /api/auth/reset

Assistants
	•	POST /api/assistants/add
	•	PATCH /api/assistants/{id}/approve
	•	PATCH /api/assistants/{id}/remove

Students
	•	POST /api/students/import
	•	GET /api/students/{id}
	•	PATCH /api/students/{id}/update

Reports
	•	POST /api/reports/generate
	•	GET /api/reports/student/{id}
	•	GET /api/reports/month/{month}

HR
	•	POST /api/hr/generate
	•	GET /api/hr/slip/{assistant_id}/{month}

Finance
	•	POST /api/finance/record
	•	GET /api/finance/summary/{month}

Notifications
	•	POST /api/notify/email
	•	POST /api/notify/whatsapp

⸻

8. AI FEATURES (Rady Assistant)

Component: In-dashboard chat (OpenAI API).
Capabilities:
	•	Natural-language queries:
	•	“Show assistants missing reports.”
	•	“Generate payroll summary for October.”
	•	Generate AI feedback for reports:
	•	Evaluate grades → Suggest performance comments.
	•	Optional: AI grading engine (future).

⸻

9. QUOTAS & BACKGROUND JOBS
	•	Background functions run via Supabase Edge Functions:
	•	runReportGenerator()
	•	checkQuotaAndSchedule()
	•	Daily reset of email/share counters.
	•	Log every batch in usage_logs.

⸻

10. SECURITY & COMPLIANCE
	•	Supabase RLS for org isolation.
	•	Data encryption (at rest & transit).
	•	Role-verified API routes.
	•	GDPR compliant (Right to Delete/Export).
	•	Audit logs of all actions.

⸻

11. UI / UX STANDARDS
	•	Theme: Off-white background, clean cards, subtle shadows.
	•	Palette: Brick Red #CF441E, Deep Teal #073B4C, Mint #A9D8C7.
	•	Font: Inter / Manrope.
	•	Layout: Sidebar navigation, topbar with logo & user menu.
	•	Reports: PDF header uses org logo + color bar.
	•	Responsive: Mobile, tablet, desktop.

⸻

12. SUBSCRIPTION & BILLING
	•	Stripe integration per organization:
	•	Free Plan → 1 course / 10 assistants.
	•	Pro Plan → Unlimited courses / 100 assistants.
	•	School Plan → Custom quota + domain.
	•	Webhooks to sync subscription status.

⸻

13. DEPLOYMENT & ENVIRONMENT

Environments
	•	dev → radsystems-dev.vercel.app
	•	prod → radsystems.app
	•	supabase project per environment.

CI/CD
	•	Vercel auto-deploy on main branch.
	•	Supabase migrations via CLI.

⸻

14. ROADMAP (Q4 2025 – Q2 2026)

Phase	Deliverables
1	Auth + Multi-Tenant Setup + Branding
2	Assistant + Student Modules
3	Course Config + Report Generation
4	HR + Finance + Parents View
5	AI Assistant “Rady” + Analytics
6	Mobile App (React Native Wrapper)


⸻

15. ACCEPTANCE CRITERIA (AI Agent)

Success =
	1.	Multi-tenant system with isolated org data.
	2.	Full CRUD for assistants, students, and courses.
	3.	Auto-report generation to PDF & email.
	4.	HR and Finance modules functional.
	5.	Parent portal accessible with linked students.
	6.	Stripe subscription working per org.
	7.	Role-based dashboards & analytics live.
	8.	Branded login per org.
	9.	RLS verified secure.
	10.	AI chat (Rady) operational.

⸻

16. OPTIONAL EXTENSIONS
	•	AI grading pipeline (upload handwritten assignments → evaluate vs answer key).
	•	WhatsApp bot for heads/parents.
	•	CSV import/export for legacy migration.
	•	API for external LMS integrations.

⸻

17. OUTPUTS FOR DEV / AI BUILDER

When ingesting this PRD, generate:
	1.	Supabase schema SQL for all tables listed.
	2.	Next.js route structure per Section 6.
	3.	API route handlers matching contracts in Section 7.
	4.	Tailwind UI components (dashboard, tables, modals, reports).
	5.	Supabase Edge Functions for report automation.
	6.	RLS policies restricting access by organization_id.
	7.	Stripe webhook handler (/api/stripe/webhook).
	8.	Deployment config (Vercel env vars, Supabase URL, keys).

⸻

✅ Deliverable Summary

A full-stack, multi-tenant education management SaaS (RadSystems v2.0) on Supabase + Next.js with role-based dashboards, AI assistant, and modular HR / Finance / Parent views — production-ready and brand-isolated per organization.
