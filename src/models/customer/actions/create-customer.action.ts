"use server";

import { getTimeInEpoch } from "@/utils/epoch";
import { preloadChecks } from "@/utils/preload-checks";
import {
    serverRedirectWithError,
    serverRedirectWithSuccess,
} from "@/utils/redirect-with-toast";
import { urls } from "@/utils/urls";
import { revalidatePath } from "next/cache";
import z from "zod";
import { createCustomer } from "../mutations/create-customer";
import { getCustomer } from "../queries/get-customer";
import { addCustomerSchema } from "../schemas/add-customer";

export const createCustomerAction = async (
    data: z.infer<typeof addCustomerSchema>
) => {
    const user = await preloadChecks({ Garages: true });

    // Check if vehicle already exists
    const existingCustomer = await getCustomer({
        name: data.name,
        garageId: user.activeGarageId!,
    });

    if (existingCustomer) {
        return serverRedirectWithError(
            urls.app.authed.customers.add,
            "Customer already exists"
        );
    }

    // Create the customer
    await createCustomer({
        name: data.name,
        email: data.email,
        phone: data.phone,
        ...(data.street &&
            data.city &&
            data.county &&
            data.postcode &&
            data.country && {
                address: {
                    create: {
                        street: data.street,
                        city: data.city,
                        county: data.county,
                        postCode: data.postcode,
                        country: data.country,
                        createdAt: getTimeInEpoch(),
                    },
                },
            }),
        Garage: {
            connect: {
                id: user.activeGarageId!,
            },
        },
        createdAt: getTimeInEpoch(),
        createdBy: {
            connect: {
                id: user.id,
            },
        },
    });

    // Revalidate and redirect
    revalidatePath(urls.app.authed.customers.index);
    return serverRedirectWithSuccess(
        urls.app.authed.customers.index,
        "Customer created"
    );
};
