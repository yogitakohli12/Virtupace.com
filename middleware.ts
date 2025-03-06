import { locales } from "@/locales";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
function parseAcceptLanguage(acceptLanguageHeader: string) {
  const languageTags = acceptLanguageHeader.split(",");
  let highestQuality = -1;
  let selectedLanguage = "";

  for (const tag of languageTags) {
    const [languageCode, quality] = tag.trim().split(";q=");
    const qValue = quality ? parseFloat(quality) : 1.0;

    if (qValue > highestQuality) {
      highestQuality = qValue;
      selectedLanguage = languageCode;
    }
  }

  return selectedLanguage;
}
function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }
  const selecteedLocale = req.cookies.get("NEXT_LOCALE")?.value || "";
  if (!locales.includes(selecteedLocale)) return;

  if (selecteedLocale && selecteedLocale !== req.nextUrl.locale) {
    return NextResponse.redirect(
      new URL(
        `/${selecteedLocale}${req.nextUrl.pathname}${req.nextUrl.search}`,
        req.url
      )
    );
  }
}

export default middleware;
