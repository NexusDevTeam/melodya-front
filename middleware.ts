import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let defaultLocale = "pt";
let locales = ["pt", "en", "es"];

function getLocale(request: NextRequest) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  let headers = { "accept-language": acceptedLanguage };
  let languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const langMatch = pathname.match(/^\/(pt|en|es)/);
  const lang = langMatch ? langMatch[1] : null;

  if (!lang) {
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);

    return NextResponse.redirect(newUrl);
  }
}

export const config = {
  matcher: ["/((?!api|assets|docs|.*\\..*|_next).*)"],
};
