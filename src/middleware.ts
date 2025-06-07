import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./utils/auth-middleware";

/**
 * Main middleware function to handle routing logic and delegate authentication
 * @param request - The incoming Next.js request object
 * @returns NextResponse object with appropriate redirect or next() action
 */
export async function middleware(request: NextRequest) {
    // Get the current pathname from the request URL
    const { pathname } = request.nextUrl;

    // Allow direct access to Next.js internal routes and static files
    if (
        pathname.startsWith("/_next/") ||
        pathname.startsWith("/api/") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // Handle authentication logic
    const authResponse = await authMiddleware(request);
    if (authResponse) {
        return authResponse;
    }

    // Continue with the request if no authentication action was needed
    return NextResponse.next();
}

/**
 * Configuration object for the middleware
 * Specifies which routes should be processed by the middleware
 * Excludes Next.js internal routes and static files
 */
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
