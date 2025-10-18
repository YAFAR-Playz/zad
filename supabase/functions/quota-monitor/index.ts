import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { getSupabaseClient } from "../shared/supabaseClient.ts";

serve(async (req) => {
  const client = await getSupabaseClient(req.headers);
  const { organizationId } = await req.json();

  const { data: counters, error } = await client
    .from("usage_logs")
    .select("created_at, module, action")
    .eq("organization_id", organizationId)
    .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  // Placeholder logic for quota resets and scheduling new report batches.
  return new Response(
    JSON.stringify({
      organizationId,
      inspectedEvents: counters?.length ?? 0,
      status: "ok",
    }),
    { headers: { "content-type": "application/json" } }
  );
});
