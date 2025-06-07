import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

/**
 * Redirects to a URL with a success toast message using cookies
 * @param url - The URL to redirect to
 * @param message - The success message to display in the toast
 * @param request - The Next.js request object used to construct the redirect URL
 * @returns NextResponse with redirect and toast cookies set
 */
export const redirectWithSuccess = (
    url: string,
    message: string,
    request: NextRequest
) => {
    const response = NextResponse.redirect(new URL(url, request.url));
    response.cookies.set("toast-message", message);
    response.cookies.set("toast-type", "success");
    return response;
};

/**
 * Redirects to a URL with an error toast message using cookies
 * @param url - The URL to redirect to
 * @param message - The error message to display in the toast
 * @param request - The Next.js request object used to construct the redirect URL
 * @returns NextResponse with redirect and toast cookies set
 */
export const redirectWithError = (
    url: string,
    message: string,
    request: NextRequest
) => {
    const response = NextResponse.redirect(new URL(url, request.url));
    response.cookies.set("toast-message", message);
    response.cookies.set("toast-type", "error");
    return response;
};

/**
 * Redirects to a URL with an info toast message using cookies
 * @param url - The URL to redirect to
 * @param message - The info message to display in the toast
 * @param request - The Next.js request object used to construct the redirect URL
 * @returns NextResponse with redirect and toast cookies set
 */
export const redirectWithInfo = (
    url: string,
    message: string,
    request: NextRequest
) => {
    const response = NextResponse.redirect(new URL(url, request.url));
    response.cookies.set("toast-message", message);
    response.cookies.set("toast-type", "info");
    return response;
};

/**
 * Redirects to a URL with a warning toast message using cookies
 * @param url - The URL to redirect to
 * @param message - The warning message to display in the toast
 * @param request - The Next.js request object used to construct the redirect URL
 * @returns NextResponse with redirect and toast cookies set
 */
export const redirectWithWarning = (
    url: string,
    message: string,
    request: NextRequest
) => {
    const response = NextResponse.redirect(new URL(url, request.url));
    response.cookies.set("toast-message", message);
    response.cookies.set("toast-type", "warning");
    return response;
};

/**
 * Performs a server-side redirect with a success toast message using URL parameters
 * @param url - The URL to redirect to
 * @param message - The success message to display in the toast
 * @returns Never - Function throws a redirect
 */
export const serverRedirectWithSuccess = async (
    url: string,
    message: string
): Promise<never> => {
    const redirectUrl = new URL(
        url,
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    );
    redirectUrl.searchParams.set("toast-message", message);
    redirectUrl.searchParams.set("toast-type", "success");
    redirect(redirectUrl.toString());
};

/**
 * Performs a server-side redirect with an error toast message using URL parameters
 * @param url - The URL to redirect to
 * @param message - The error message to display in the toast
 * @returns Never - Function throws a redirect
 */
export const serverRedirectWithError = async (
    url: string,
    message: string
): Promise<never> => {
    const redirectUrl = new URL(
        url,
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    );
    redirectUrl.searchParams.set("toast-message", message);
    redirectUrl.searchParams.set("toast-type", "error");
    redirect(redirectUrl.toString());
};

/**
 * Performs a server-side redirect with an info toast message using URL parameters
 * @param url - The URL to redirect to
 * @param message - The info message to display in the toast
 * @returns Never - Function throws a redirect
 */
export const serverRedirectWithInfo = async (
    url: string,
    message: string
): Promise<never> => {
    const redirectUrl = new URL(
        url,
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    );
    redirectUrl.searchParams.set("toast-message", message);
    redirectUrl.searchParams.set("toast-type", "info");
    redirect(redirectUrl.toString());
};

/**
 * Performs a server-side redirect with a warning toast message using URL parameters
 * @param url - The URL to redirect to
 * @param message - The warning message to display in the toast
 * @returns Never - Function throws a redirect
 */
export const serverRedirectWithWarning = async (
    url: string,
    message: string
): Promise<never> => {
    const redirectUrl = new URL(
        url,
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    );
    redirectUrl.searchParams.set("toast-message", message);
    redirectUrl.searchParams.set("toast-type", "warning");
    redirect(redirectUrl.toString());
};
