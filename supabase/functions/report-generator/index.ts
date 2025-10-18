import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { getSupabaseClient } from "../shared/supabaseClient.ts";

interface ReportPayload {
  organizationId: string;
  courseId: string;
  month: string;
}

serve(async (req) => {
  const client = await getSupabaseClient(req.headers);
  const payload: ReportPayload = await req.json();

  const { data, error } = await client
    .from("usage_logs")
    .insert({
      organization_id: payload.organizationId,
      module: "reports",
      action: "edge_function_invoked",
      payload,
    });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  // TODO: fetch organization scoped data, generate PDF, upload to storage, and email recipients.

  return new Response(JSON.stringify({ success: true, data }), {
    headers: { "content-type": "application/json" },
  });
});
