"use client";

import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { registerAction } from "../actions/register.action";
import { registerSchema } from "../schemas/register";

export const RegisterForm = () => {
    const [pending, setPending] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        setPending(true);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("confirmPassword", data.confirmPassword);
        try {
            await registerAction(formData);
        } catch (error) {
            console.error(error);
        } finally {
            setPending(false);
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Name Field */}
                <FormInput
                    control={form.control}
                    label="Name"
                    name="name"
                    required
                    disabled={pending}
                    type="text"
                    placeholder="John Doe"
                />

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

                {/* Confirm Password Field */}
                <FormInput
                    control={form.control}
                    label="Confirm Password"
                    name="confirmPassword"
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

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full h-11"
                    disabled={pending}
                >
                    Create account
                </Button>
            </form>
        </Form>
    );
};
