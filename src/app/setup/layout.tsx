import { ProgressSteps } from "@/models/setup/components/progress-steps";
import { TUserWithGarages } from "@/models/user/types/user-with-garages.type";
import { preloadChecks } from "@/utils/preload-checks";
import { serverRedirectWithError } from "@/utils/redirect-with-toast";
import { urls } from "@/utils/urls";
import Image from "next/image";

export default async function SetupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await preloadChecks<TUserWithGarages>({ Garages: true });
    if (user?.Garages?.length && user.Garages.length > 0) {
        return serverRedirectWithError(
            urls.app.authed.dashboard,
            "You already have a garage setup"
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl space-y-6">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="Garage Suite Logo"
                            width={32}
                            height={32}
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Welcome to Garage Suite
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Let&apos;s get your garage set up in just a few
                            steps
                        </p>
                    </div>
                </div>

                {/* Progress */}
                <ProgressSteps />

                {/* Step Content */}
                {children}

                {/* Footer */}
                <div className="text-center text-sm text-muted-foreground">
                    <p>
                        Need help? Contact our support team at{" "}
                        <span className="text-primary">
                            support@garagesuite.com
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
