"use client";

import { z } from "zod";

export const addCustomerSchema = z
    .object({
        name: z.string().min(1, { message: "Name is required" }),
        email: z
            .string()
            .email({ message: "Invalid email address" })
            .optional()
            .or(z.literal("")),
        phone: z
            .string()
            .min(1, { message: "Phone is required" })
            .optional()
            .or(z.literal("")),
        street: z
            .string()
            .min(1, { message: "Street is required" })
            .optional()
            .or(z.literal("")),
        city: z
            .string()
            .min(1, { message: "City is required" })
            .optional()
            .or(z.literal("")),
        county: z
            .string()
            .min(1, { message: "County is required" })
            .optional()
            .or(z.literal("")),
        postcode: z
            .string()
            .min(1, { message: "Postcode is required" })
            .optional()
            .or(z.literal("")),
        country: z
            .string()
            .min(1, { message: "Country is required" })
            .optional()
            .or(z.literal("")),
    })
    .refine(
        (data) => {
            const addressFields = [
                data.street,
                data.city,
                data.county,
                data.postcode,
                data.country,
            ];
            const hasAnyAddressField = addressFields.some(
                (field) => field && field.trim() !== ""
            );

            if (hasAnyAddressField) {
                return addressFields.every(
                    (field) => field && field.trim() !== ""
                );
            }

            return true;
        },
        {
            message:
                "If any address field is provided, all address fields are required",
            path: ["street"],
        }
    )
    .refine(
        (data) => {
            const hasEmail = data.email && data.email.trim() !== "";
            const hasPhone = data.phone && data.phone.trim() !== "";
            return hasEmail || hasPhone;
        },
        {
            message: "At least email or phone number must be provided",
            path: ["email"],
        }
    );
