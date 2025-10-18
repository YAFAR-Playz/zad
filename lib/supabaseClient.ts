import { createClient } from '@supabase/supabase-js';

type SupabaseConfig = {
  accessToken?: string;
};

export function createSupabaseServerClient(config: SupabaseConfig = {}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Supabase environment variables are not configured.');
  }

  return createClient(url, anonKey, {
    global: {
      headers: config.accessToken
        ? {
            Authorization: `Bearer ${config.accessToken}`,
          }
        : undefined,
    },
  });
}
