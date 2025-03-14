import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()
  const authPaths = ["/auth/sign-up", "/auth/login"];

  const user = await supabase.auth.getUser();
  const url = new URL(request.url);
  const next = url.searchParams.get("next");

  if (url.pathname === "/") {
    if (user.data.user?.id) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (url.pathname === "/auth") {
    return NextResponse.redirect(new URL("/auth/sign-up", request.url));
  }

  if (url.pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard/main", request.url));
  }

  if (user.data.user?.id) {
    if (authPaths.includes(url.pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    if (url.pathname.replace(/^\/([^\/]*).*$/, "$1") === "dashboard") {
      return NextResponse.redirect(
        new URL("/auth/sign-up?next=" + (next || url.pathname), request.url),
      );
    }
  }

  // const {
  // data: { user },
  // } = await supabase.auth.getUser();

  // const url = request.nextUrl.clone();

  // const requestUrl = (url: string) => {
  //   return request.nextUrl.pathname.startsWith(`/${url}`);
  // };

  // console.log(user);

  // if ((!user && requestUrl("user")) || requestUrl("verify-otp")) {
  //   // no user & in user page, potentially respond by redirecting the user to the sign-in page
  //   console.log(user);
  //   url.pathname = "/sign-in";
  //   return NextResponse.redirect(url);
  // } else if ((user && requestUrl("sign-in")) || requestUrl("verify-otp")) {
  //   // user is signed in & in sign-in, redirect to user page
  //   url.pathname = "/user";
  //   return NextResponse.redirect(url);
  // }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
