import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  try {
    // Handle locale detection based on cookie or Accept-Language header
    const locale =
      request.cookies.get("NEXT_LOCALE")?.value ||
      request.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ||
      "zh-Hans";

    // Continue with the request and set locale in headers
    const response = NextResponse.next();
    response.headers.set(
      "x-middleware-request-locale",
      locale === "en" ? "en" : "zh-Hans"
    );

    return response;
  } catch (error) {
    // If there's an error, just continue with the request
    return NextResponse.next();
  }
}

export const config = {
  // Only apply to page routes, exclude all static assets and API routes
  matcher: ["/", "/((?!api|_next|.*\\.).*)"],
};
