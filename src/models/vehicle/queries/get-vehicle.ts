import { db } from "@/utils/db";
import { Prisma, Vehicle } from "@prisma/client";

export const getVehicle = async <T = Vehicle>(
    where: Prisma.VehicleWhereInput,
    include?: Prisma.VehicleInclude
) => {
    return (await db.vehicle.findFirst({
        where,
        include,
    })) as T;
};
