"use client";

import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { signinAction } from "../actions/signin-action";
import { loginSchema } from "../schemas/login";

export const SignInForm = () => {
    const [pending, setPending] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        setPending(true);
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);
        try {
            await signinAction(formData);
        } catch (error) {
            console.error(error);
        } finally {
            setPending(false);
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
                <FormInput
                    control={form.control}
                    label="Email"
                    name="email"
                    required
                    disabled={pending}
                    type="email"
                    placeholder="mechanic@garagesuite.com"
                />

                {/* Password Field */}
                <FormInput
                    control={form.control}
                    label="Password"
                    name="password"
                    required
                    disabled={pending}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    action={
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                        </Button>
                    }
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="remember" defaultChecked={false} />
                        <Label
                            htmlFor="remember"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Remember me
                        </Label>
                    </div>
                    <Link
                        href="/forgot-password"
                        className="text-sm text-primary hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full h-11"
                    disabled={pending}
                >
                    Sign in
                </Button>
            </form>
        </Form>
    );
};
