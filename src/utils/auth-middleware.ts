import { NextRequest, NextResponse } from "next/server";

/**
 * List of routes that are publicly accessible without authentication
 */
const PUBLIC_ROUTES = ["/home", "/signin", "/register"];

/**
 * Authentication middleware function to handle user authentication and routing
 * @param request - The incoming Next.js request object
 * @returns NextResponse object with appropriate redirect or next() action, or null if no action needed
 */
export async function authMiddleware(
    request: NextRequest
): Promise<NextResponse | null> {
    const { pathname } = request.nextUrl;

    // Check if the current path matches any public route
    const isPublicRoute = PUBLIC_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(route + "/")
    );

    // Get session token from cookies
    const sessionToken = request.cookies.get("session")?.value;

    // Handle unauthenticated users
    if (!sessionToken) {
        if (!isPublicRoute) {
            // Redirect to signin page if trying to access protected route
            const signinUrl = new URL("/signin", request.url);
            signinUrl.searchParams.set("returnUrl", pathname);
            return NextResponse.redirect(signinUrl);
        }
        return null; // Let the request continue
    }

    // Redirect authenticated users away from auth pages to dashboard
    if (isPublicRoute && pathname !== "/" && sessionToken) {
        const dashboardUrl = new URL("/dashboard", request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return null; // Let the request continue
}
