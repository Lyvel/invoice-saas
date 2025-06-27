import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { SignInForm } from "@/models/user/components/signin.form";
import { urls } from "@/utils/urls";
import Image from "next/image";
import Link from "next/link";

const SignInPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="Garage Suite"
                            width={64}
                            height={64}
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Welcome back
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Sign in to your Garage Suite account
                        </p>
                    </div>
                </div>

                {/* Signin Card */}
                <Card className="border-0 shadow-xl">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-2xl font-semibold">
                            Sign in
                        </CardTitle>
                        <CardDescription>
                            Enter your credentials to access your dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <SignInForm />
                    </CardContent>
                </Card>

                {/* Sign Up Link */}
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link
                            href={urls.app.auth.register}
                            className="font-medium text-primary hover:underline"
                        >
                            Sign up for free
                        </Link>
                    </p>
                </div>

                {/* Footer */}
                <div className="text-center text-xs text-muted-foreground">
                    <p>
                        By signing in, you agree to our{" "}
                        <Link href="/terms" className="hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
