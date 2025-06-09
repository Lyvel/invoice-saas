"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { urls } from "@/utils/urls";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
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
                        <form
                            className="space-y-4"
                            action={urls.resources.auth.register}
                            method="POST"
                        >
                            {/* Name Field */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    name="name"
                                    type="text"
                                    className={`h-11`}
                                />
                            </div>
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="mechanic@garagesuite.com"
                                    name="email"
                                    type="email"
                                    className={`h-11`}
                                />
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        placeholder="••••••••"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        className={`h-11 pr-10`}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                            {/* Confirm Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        className={`h-11 pr-10`}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" className="w-full h-11">
                                Create account
                            </Button>
                        </form>
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
