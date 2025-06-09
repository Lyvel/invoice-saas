"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SetupPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace("/setup/garage-name");
    }, [router]);

    return <div>Redirecting...</div>;
};

export default SetupPage;
