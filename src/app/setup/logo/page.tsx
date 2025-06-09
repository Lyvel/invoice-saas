"use client";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSetupData } from "@/models/setup/hooks/use-setup-data";
import { urls } from "@/utils/urls";
import { Upload, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LogoPage = () => {
    const router = useRouter();
    const { data, updateData, isLoaded } = useSetupData();
    const [logo, setLogo] = useState<File | null>(null);

    // Set initial value when data is loaded
    useEffect(() => {
        if (isLoaded && data.logo) {
            setLogo(data.logo);
        }
    }, [isLoaded, data.logo]);

    const handleContinue = () => {
        updateData({ logo });
        router.push(urls.app.authed.setup.summary);
    };

    const handleSkip = () => {
        updateData({ logo: null });
        router.push(urls.app.authed.setup.summary);
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
                                <Upload className="w-8 h-8 text-primary-foreground" />
                            </div>
                            <h2 className="text-2xl font-semibold">
                                Add your garage logo
                            </h2>
                            <p className="text-muted-foreground">
                                Upload your logo to personalize invoices and
                                estimates. This is optional and can be added
                                later.
                            </p>
                        </div>

                        <FileUpload
                            label="Garage Logo"
                            accept="image/*"
                            maxSize={5}
                            onFileSelect={setLogo}
                            helperText="This will appear on your invoices and estimates. PNG, JPG, or JPEG files up to 5MB."
                        />

                        {/* Preview */}
                        <div className="bg-muted/50 rounded-lg p-4">
                            <h3 className="font-medium mb-2">
                                Preview on Invoice
                            </h3>
                            <div className="bg-white rounded border p-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        {logo ? (
                                            <img
                                                src={URL.createObjectURL(logo)}
                                                alt="Logo preview"
                                                className="w-10 h-10 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                                                <Wrench className="w-5 h-5 text-gray-400" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-semibold text-sm">
                                                {data.garageName ||
                                                    "Your Garage Name"}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                {data.address.street
                                                    ? `${data.address.street}, ${data.address.city}`
                                                    : "Your Address"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-600">
                                            Invoice #001
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
                    onClick={() => router.push(urls.app.authed.setup.address)}
                >
                    Back
                </Button>

                <div className="flex space-x-3">
                    <Button variant="ghost" onClick={handleSkip}>
                        Skip for now
                    </Button>
                    <Button onClick={handleContinue}>Continue</Button>
                </div>
            </div>
        </>
    );
};

export default LogoPage;
