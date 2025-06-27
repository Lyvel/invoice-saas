"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "@/models/user/components/register.form";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = () => {
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
                            Create an account
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Sign up for free to get started
                        </p>
                    </div>
                </div>

                {/* Signin Card */}
                <Card className="border-0 shadow-xl">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-2xl font-semibold">
                            Create an account
                        </CardTitle>
                        <CardDescription>
                            Enter your details to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <RegisterForm />
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center text-xs text-muted-foreground">
                    <p>
                        By creating an account, you agree to our{" "}
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

export default RegisterPage;
