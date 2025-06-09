"use client";

import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSetupData } from "@/models/setup/hooks/use-setup-data";
import { urls } from "@/utils/urls";
import {
    Building2,
    CheckCircle,
    Edit,
    MapPin,
    Upload,
    Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SummaryPage = () => {
    const router = useRouter();
    const { data, clearData, isLoaded } = useSetupData();
    const [isLoading, setIsLoading] = useState(false);

    const handleCompleteSetup = async () => {
        setIsLoading(true);
        try {
            // TODO: Implement actual setup completion logic
            console.log("Setup completed with data:", data);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

            // Clear setup data and redirect to dashboard
            clearData();
            router.push("/dashboard"); // or wherever you want to redirect
        } catch (error) {
            console.error("Setup completion error:", error);
        } finally {
            setIsLoading(false);
        }
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
                            <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-semibold">
                                Review your information
                            </h2>
                            <p className="text-muted-foreground">
                                Please confirm the details below are correct
                                before completing your setup.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Garage Name Section */}
                            <div className="bg-muted/30 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <Building2 className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-sm text-muted-foreground">
                                                Garage Name
                                            </h3>
                                            <p className="font-semibold">
                                                {data.garageName ||
                                                    "Not provided"}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            router.push(
                                                urls.app.authed.setup.garageName
                                            )
                                        }
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Address Section */}
                            <div className="bg-muted/30 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <MapPin className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-sm text-muted-foreground">
                                                Address
                                            </h3>
                                            <div className="space-y-1">
                                                <p className="font-semibold">
                                                    {data.address.street ||
                                                        "Not provided"}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {data.address.city &&
                                                    data.address.county &&
                                                    data.address.postCode
                                                        ? `${data.address.city}, ${data.address.county} ${data.address.postCode}`
                                                        : "City, County, Post Code not provided"}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {data.address.country}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            router.push(
                                                urls.app.authed.setup.address
                                            )
                                        }
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Logo Section */}
                            <div className="bg-muted/30 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <Upload className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <h3 className="font-medium text-sm text-muted-foreground">
                                                    Logo
                                                </h3>
                                                <p className="font-semibold">
                                                    {data.logo
                                                        ? data.logo.name
                                                        : "No logo uploaded"}
                                                </p>
                                            </div>
                                            {data.logo && (
                                                <img
                                                    src={URL.createObjectURL(
                                                        data.logo
                                                    )}
                                                    alt="Logo preview"
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            router.push(
                                                urls.app.authed.setup.logo
                                            )
                                        }
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Final Preview */}
                        <div className="bg-muted/50 rounded-lg p-4">
                            <h3 className="font-medium mb-3">
                                How this will appear on your invoices
                            </h3>
                            <div className="bg-white rounded border p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        {data.logo ? (
                                            <img
                                                src={URL.createObjectURL(
                                                    data.logo
                                                )}
                                                alt="Logo preview"
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                                                <Wrench className="w-6 h-6 text-gray-400" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-bold text-lg">
                                                {data.garageName ||
                                                    "Your Garage Name"}
                                            </p>
                                            <div className="text-sm text-gray-600">
                                                <p>
                                                    {data.address.street ||
                                                        "Street Address"}
                                                </p>
                                                <p>
                                                    {data.address.city &&
                                                    data.address.county &&
                                                    data.address.postCode
                                                        ? `${data.address.city}, ${data.address.county} ${data.address.postCode}`
                                                        : "City, County, Post Code"}
                                                </p>
                                                <p>{data.address.country}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold">
                                            Invoice #001
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Date:{" "}
                                            {new Date().toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={() => router.push(urls.app.authed.setup.logo)}
                >
                    Back
                </Button>

                <form method="post" action={urls.resources.setup}>
                    <input
                        type="hidden"
                        name="data"
                        value={JSON.stringify(data)}
                    />
                    <LoadingButton
                        type="submit"
                        loading={isLoading}
                        loadingText="Setting up your garage..."
                        size="lg"
                        className="px-8"
                    >
                        Complete Setup
                    </LoadingButton>
                </form>
            </div>
        </>
    );
};

export default SummaryPage;
