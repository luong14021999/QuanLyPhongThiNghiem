import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isLoginPage = request.nextUrl.pathname === "/login";

  // Nếu chưa cấu hình Supabase → không bật auth, mọi route đều mở.
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return response;

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match tất cả routes trừ:
     * - /api (routes tự bảo vệ nếu cần)
     * - /_next/static (Next.js internals)
     * - /_next/image (image optimization)
     * - assets: favicon, logo, icon, manifest, svg, png
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logo-vnnth.png|icon-leaf.svg|manifest.json|.*\\.(?:png|jpg|jpeg|svg|ico|webp)).*)",
  ],
};
