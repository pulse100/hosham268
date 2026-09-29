import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** حماية لوحة الإدارة + تحديث جلسة Supabase. الموقع العام لا يمر من هنا. */
export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isLogin = request.nextUrl.pathname === "/admin/login";
  if (!url || !key) return NextResponse.next(); // الصفحات تعرض رسالة "غير مهيأ"

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user && !isLogin) {
    const to = request.nextUrl.clone();
    to.pathname = "/admin/login";
    to.search = "";
    return NextResponse.redirect(to);
  }
  if (user && isLogin) {
    const to = request.nextUrl.clone();
    to.pathname = "/admin";
    return NextResponse.redirect(to);
  }
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
