import { db } from "@/utils/db";
import { Prisma } from "@prisma/client";

export const createGarage = async (data: Prisma.GarageCreateInput) => {
    return db.garage.create({
        data,
    });
};
