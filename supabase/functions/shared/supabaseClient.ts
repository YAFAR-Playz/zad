import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.1";

export async function getSupabaseClient(headers: Headers) {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables");
  }

  const supabase = createClient(url, serviceRoleKey, {
    global: {
      headers: {
        Authorization: headers.get("Authorization") ?? `Bearer ${serviceRoleKey}`,
      },
    },
  });

  return supabase;
}
