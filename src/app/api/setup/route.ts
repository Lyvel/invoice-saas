import { createGarage } from "@/models/garage/mutations/create-garage";
import { getGarage } from "@/models/garage/queries/get-garage";
import { SetupData } from "@/models/setup/types/setup-data.type";
import { getTimeInEpoch } from "@/utils/epoch";
import { preloadChecks } from "@/utils/preload-checks";
import {
    redirectWithError,
    redirectWithSuccess,
} from "@/utils/redirect-with-toast";
import { urls } from "@/utils/urls";
import { User } from "@prisma/client";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    const user = await preloadChecks<User>();
    const formData = await request.formData();
    const data = JSON.parse(formData.get("data") as string) as SetupData;
    if (
        !data.garageName ||
        !data.address.street ||
        !data.address.city ||
        !data.address.county ||
        !data.address.postCode ||
        !data.address.country
    ) {
        return redirectWithError(
            urls.app.authed.setup.summary,
            "Please fill in all fields",
            request
        );
    }
    const existingGarage = await getGarage({ name: data.garageName });
    if (existingGarage) {
        return redirectWithError(
            urls.app.authed.setup.summary,
            "Garage already exists",
            request
        );
    }
    const garage = await createGarage({
        name: data.garageName,
        address: {
            create: {
                street: data.address.street,
                city: data.address.city,
                county: data.address.county,
                postCode: data.address.postCode,
                country: data.address.country,
                createdAt: getTimeInEpoch(),
            },
        },
        createdAt: getTimeInEpoch(),
        User: {
            connect: {
                id: user.id,
            },
        },
    });

    return redirectWithSuccess(
        urls.app.authed.dashboard,
        "Setup complete",
        request
    );
};
