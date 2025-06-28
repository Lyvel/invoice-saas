"use client";

import { z } from "zod";

export const registerSchema = z
    .object({
        name: z
            .string({ message: "Name is required" })
            .min(3, { message: "Name must be at least 3 characters" }),
        email: z
            .string({ message: "Email is required" })
            .email({ message: "Invalid email address" }),
        password: z
            .string({ message: "Password is required" })
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                {
                    message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                }
            ),
        confirmPassword: z.string({ message: "Confirm password is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
