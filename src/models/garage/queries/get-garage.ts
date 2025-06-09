import { db } from "@/utils/db";
import { Prisma } from "@prisma/client";

export const getGarage = async (
    where: Prisma.GarageWhereUniqueInput,
    include?: Prisma.GarageInclude
) => {
    return db.garage.findUnique({
        where,
        include,
    });
};
