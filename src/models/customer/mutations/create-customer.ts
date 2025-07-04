import { db } from "@/utils/db";
import { Customer, Prisma } from "@prisma/client";

export const createCustomer = async <T = Customer>(
    data: Prisma.CustomerCreateInput,
    include?: Prisma.CustomerInclude
) => {
    return (await db.customer.create({
        data,
        include,
    })) as T;
};
