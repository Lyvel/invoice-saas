"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSetupData } from "@/models/setup/hooks/use-setup-data";
import { urls } from "@/utils/urls";
import { Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GarageNamePage = () => {
    const router = useRouter();
    const { data, updateData, isLoaded } = useSetupData();
    const [garageName, setGarageName] = useState("");
    const [error, setError] = useState("");

    // Set initial value when data is loaded
    useEffect(() => {
        if (isLoaded && data.garageName) {
            setGarageName(data.garageName);
        }
    }, [isLoaded, data.garageName]);

    const validateAndContinue = () => {
        if (!garageName.trim()) {
            setError("Garage name is required");
            return;
        }

        updateData({ garageName: garageName.trim() });
        router.push(urls.app.authed.setup.address);
    };

    const handleInputChange = (value: string) => {
        setGarageName(value);
        if (error) setError("");
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* Main Card */}
            <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                                <Building2 className="w-8 h-8 text-primary-foreground" />
                            </div>
                            <h2 className="text-2xl font-semibold">
                                What&apos;s your garage called?
                            </h2>
                            <p className="text-muted-foreground">
                                This will appear on your invoices and throughout
                                the app.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={() =>
                        router.push(urls.app.authed.setup.garageName)
                    }
                >
                    Back
                </Button>

                <Button onClick={validateAndContinue}>Continue</Button>
            </div>
        </>
    );
};

export default GarageNamePage;
