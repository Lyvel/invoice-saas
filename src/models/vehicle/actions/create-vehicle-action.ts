"use server";

import { getTimeInEpoch } from "@/utils/epoch";
import { preloadChecks } from "@/utils/preload-checks";
import {
    serverRedirectWithError,
    serverRedirectWithSuccess,
} from "@/utils/redirect-with-toast";
import { urls } from "@/utils/urls";
import { revalidatePath } from "next/cache";
import { createVehicle } from "../mutations/create-vehicle";
import { getVehicle } from "../queries/get-vehicle";

export const createVehicleAction = async (formData: FormData) => {
    const user = await preloadChecks({ Garages: true });

    const registration = formData.get("registration") as string;
    const make = formData.get("make") as string;
    const model = formData.get("model") as string;
    const year = formData.get("year") as string;
    const vin = formData.get("vin") as string;

    if (!registration || !make || !model || !year) {
        return serverRedirectWithError(
            urls.app.authed.vehicles.add,
            "Please fill in all fields"
        );
    }

    // Check if vehicle already exists
    const existingVehicle = await getVehicle({
        registration: registration.toUpperCase(),
        garageId: user.activeGarageId!,
    });

    if (existingVehicle) {
        return serverRedirectWithError(
            urls.app.authed.vehicles.add,
            "Vehicle already exists"
        );
    }

    // Create the vehicle
    await createVehicle({
        registration: registration.toUpperCase(),
        make,
        model,
        year: parseInt(year),
        vin: vin || undefined,
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
    revalidatePath(urls.app.authed.vehicles.index);
    return serverRedirectWithSuccess(
        urls.app.authed.vehicles.index,
        "Vehicle created"
    );
};
