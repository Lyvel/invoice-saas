"use client";

import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSetupData } from "@/models/setup/hooks/use-setup-data";
import { urls } from "@/utils/urls";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddressPage = () => {
    const router = useRouter();
    const { data, updateData, isLoaded } = useSetupData();
    const [address, setAddress] = useState({
        street: "",
        city: "",
        county: "",
        postCode: "",
        country: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Set initial values when data is loaded
    useEffect(() => {
        if (isLoaded && data.address) {
            setAddress({
                street: data.address.street || "",
                city: data.address.city || "",
                county: data.address.county || "",
                postCode: data.address.postCode || "",
                country: data.address.country || "",
            });
        }
    }, [isLoaded, data.address]);

    const validateAndContinue = () => {
        const newErrors: Record<string, string> = {};

        if (!address.street.trim()) {
            newErrors.street = "Street address is required";
        }
        if (!address.city.trim()) {
            newErrors.city = "City is required";
        }
        if (!address.county.trim()) {
            newErrors.county = "County is required";
        }
        if (!address.postCode.trim()) {
            newErrors.postCode = "Post code is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            updateData({ address });
            router.push(urls.app.authed.setup.logo);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setAddress((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
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
                            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                                <MapPin className="w-8 h-8 text-primary-foreground" />
                            </div>
                            <h2 className="text-2xl font-semibold">
                                Where is your garage located?
                            </h2>
                            <p className="text-muted-foreground">
                                We&apos;ll use this address for invoices and
                                customer communications.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <FormInput
                                label="Street Address"
                                placeholder="123 Main Street"
                                value={address.street}
                                onChange={(e) =>
                                    handleInputChange("street", e.target.value)
                                }
                                error={errors.street}
                                required
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormInput
                                    label="City"
                                    placeholder="Your City"
                                    value={address.city}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "city",
                                            e.target.value
                                        )
                                    }
                                    error={errors.city}
                                    required
                                />
                                <FormInput
                                    label="County"
                                    placeholder="County"
                                    value={address.county}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "county",
                                            e.target.value
                                        )
                                    }
                                    error={errors.county}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormInput
                                    label="Post Code"
                                    placeholder="12345"
                                    value={address.postCode}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "postCode",
                                            e.target.value
                                        )
                                    }
                                    error={errors.postCode}
                                    required
                                />
                                <FormInput
                                    label="Country"
                                    placeholder="United Kingdom"
                                    value={address.country}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "country",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>
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

export default AddressPage;
