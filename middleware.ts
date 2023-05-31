import { NextRequest, NextResponse } from "next/server";
import { I18nConfigurations as LocaleConfig } from "./i18n";

function isInvalidValidLocale(pathaneLocale: string) {
  return !LocaleConfig.locales.includes(pathaneLocale);
}

/**
 * Default locale handling logic:
 * - objectives:
 *  - normalize url with default locale into without locale
 *  - redirect incorrect locale to default locale
 *
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = request.nextUrl.pathname.split("/")[1];

  if (pathnameLocale === LocaleConfig.defaultLocale) {
    const origin = request.nextUrl.origin;
    const path = pathname.replace(`/${pathnameLocale}`, "");
    const url = new URL(path, origin);
    return NextResponse.redirect(url);
  }

  if (isInvalidValidLocale(pathnameLocale)) {
    request.nextUrl.pathname = `/${LocaleConfig.defaultLocale}${pathname}`;
    return NextResponse.rewrite(request.nextUrl);
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
