"use client";

import { z } from "zod";

export const addVehicleSchema = z.object({
    registration: z
        .string()
        .min(1, { message: "Registration is required" })
        .regex(/^[A-Za-z0-9-]+$/, {
            message: "Registration must be alphanumeric",
        })
        .transform((val) => val.toUpperCase()),
    make: z.string().min(1, { message: "Make is required" }),
    model: z.string().min(1, { message: "Model is required" }),
    year: z.string().min(1, { message: "Year is required" }),
    vin: z.string(),
});
