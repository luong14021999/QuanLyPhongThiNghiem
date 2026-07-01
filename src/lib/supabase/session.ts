import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Server-side Supabase client dùng cookies để đọc session của user.
 * Dùng cho middleware hoặc server components cần biết user hiện tại.
 */
export async function createSupabaseSessionClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // ignore in server components – middleware handles refresh
          }
        },
      },
    },
  );
}

export async function getSessionUser() {
  const supabase = await createSupabaseSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
