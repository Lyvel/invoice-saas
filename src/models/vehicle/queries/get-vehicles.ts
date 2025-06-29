import { db } from "@/utils/db";
import { Prisma, Vehicle } from "@prisma/client";

export const getVehicles = async <T = Vehicle[]>(
    where: Prisma.VehicleWhereInput,
    include?: Prisma.VehicleInclude
) => {
    return (await db.vehicle.findMany({
        where,
        include,
    })) as T;
};
