# Deployment Guide

This document captures the environment requirements for deploying RadSystems v2.0 on Vercel and Supabase.

## Environment Variables

Create the following secrets in Vercel:

| Name | Description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Used by Edge Functions |
| `STRIPE_WEBHOOK_SECRET` | Validates incoming Stripe webhooks |
| `OPENAI_API_KEY` | Enables the Rady assistant |
| `RESEND_API_KEY` | Email delivery provider |
| `TWILIO_AUTH_TOKEN` | WhatsApp integration (optional) |
| `TWILIO_ACCOUNT_SID` | WhatsApp integration (optional) |

In Supabase, configure:

- JWT custom claims template to include `org_id` and `role`.
- Storage buckets: `reports`, `branding`, `imports`.
- Edge Function secrets mirroring the `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, and notification providers.

## Migrations & Policies

Run migrations with the Supabase CLI:

```bash
supabase db push
```

The migration automatically provisions a new schema per organization and applies row-level security policies using JWT claims.

## Vercel Configuration

- Use the Next.js App Router build preset.
- Configure the root directory as the repository root.
- Enable the Edge Runtime for API routes that require low latency (notifications, webhooks) when implementing business logic.

## Custom Domains

1. Add `{org_slug}.radsystems.app` as a wildcard domain in Vercel.
2. Allow organizations on the School plan to map custom domains via CNAME and update the `domain` column in `global.organizations`.

## Background Jobs

Deploy the Supabase Edge Functions in `supabase/functions`:

```bash
supabase functions deploy report-generator
supabase functions deploy quota-monitor
```

Schedule the `quota-monitor` function to run hourly using Supabase Scheduled Triggers.

## Monitoring

- Enable Supabase Logs and log drain into your preferred observability platform.
- Connect Vercel to an error monitoring service (e.g., Sentry) for React runtime errors.

## Access Control Checklist

- Verify RLS policies using the Supabase Dashboard Policy tester with different JWT payloads.
- Ensure service role keys are never exposed on the client.
- Rotate Stripe and Supabase keys periodically.
