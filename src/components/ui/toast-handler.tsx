"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export const ToastHandler = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const getCookie = (name: string): string | null => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                const cookieValue = parts.pop()?.split(";").shift();
                return cookieValue ? decodeURIComponent(cookieValue) : null;
            }
            return null;
        };

        const deleteCookie = (name: string) => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        };

        let toastMessage = sessionStorage.getItem("toast-message");
        let toastType = sessionStorage.getItem("toast-type");

        // Check sessionStorage first
        if (toastMessage && toastType) {
            sessionStorage.removeItem("toast-message");
            sessionStorage.removeItem("toast-type");
        }
        // Then check URL search parameters (for server component redirects)
        else if (
            searchParams.get("toast-message") &&
            searchParams.get("toast-type")
        ) {
            toastMessage = searchParams.get("toast-message");
            toastType = searchParams.get("toast-type");

            // Clean up URL parameters
            const url = new URL(window.location.href);
            url.searchParams.delete("toast-message");
            url.searchParams.delete("toast-type");
            router.replace(url.pathname + (url.search ? url.search : ""), {
                scroll: false,
            });
        }
        // Finally check cookies (for API route redirects)
        else {
            toastMessage = getCookie("toast-message");
            toastType = getCookie("toast-type");

            if (toastMessage && toastType) {
                deleteCookie("toast-message");
                deleteCookie("toast-type");
            }
        }

        if (toastMessage && toastType) {
            if (toastType === "success") {
                toast.success("Success", {
                    description: toastMessage,
                });
            } else if (toastType === "error") {
                toast.error("Error", {
                    description: toastMessage,
                });
            } else if (toastType === "info") {
                toast.info("Info", {
                    description: toastMessage,
                });
            } else if (toastType === "warning") {
                toast.warning("Warning", {
                    description: toastMessage,
                });
            }
        }
    }, [searchParams, router]);

    return null;
};
