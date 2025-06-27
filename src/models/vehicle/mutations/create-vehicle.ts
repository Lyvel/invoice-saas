import { db } from "@/utils/db";
import { Prisma } from "@prisma/client";

export const createVehicle = async (data: Prisma.VehicleCreateInput) => {
    const vehicle = await db.vehicle.create({
        data,
    });

    return vehicle;
};
