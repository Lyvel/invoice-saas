"use client";
import { Progress } from "@radix-ui/react-progress";
import { usePathname } from "next/navigation";

const SETUP_STEPS = [
    { path: "/setup/garage-name", step: 1, title: "Garage Name" },
    { path: "/setup/address", step: 2, title: "Address" },
    { path: "/setup/logo", step: 3, title: "Logo" },
    { path: "/setup/summary", step: 4, title: "Summary" },
];

export const ProgressSteps = () => {
    const pathname = usePathname();
    const currentStep = SETUP_STEPS.find((step) => step.path === pathname);
    const stepNumber = currentStep?.step || 1;
    const totalSteps = SETUP_STEPS.length;
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                    Step {stepNumber} of {totalSteps}
                </span>
                <span>
                    {Math.round((stepNumber / totalSteps) * 100)}% complete
                </span>
            </div>
            <Progress value={(stepNumber / totalSteps) * 100} className="h-2" />
        </div>
    );
};
