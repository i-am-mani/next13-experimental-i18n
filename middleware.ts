import { NextRequest, NextResponse } from "next/server";
import { I18nConfigurations as LocaleConfig } from "./i18n";

export function middleware(request: NextRequest) {
//   if (
//     request.nextUrl.pathname.startsWith("/_next") ||
//     request.nextUrl.pathname.includes("/api/") ||
//     /\.(.*)$/.test(request.nextUrl.pathname)
//   ) {
//     return;
//   }
//   const locale = request.nextUrl.locale || LocaleConfig.defaultLocale;
//   request.nextUrl.searchParams.set("lang", locale);
//   request.nextUrl.href = request.nextUrl.href.replace(`/${locale}`, "");
//   console.log(request.nextUrl.href);

  //   return NextResponse.rewrite(request.nextUrl);
  //   return NextResponse.rewrite(new URL("/", request.url));
  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
