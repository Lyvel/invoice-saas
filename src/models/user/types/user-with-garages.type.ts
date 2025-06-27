import { Garage } from "@prisma/client";
import { TUser } from "./user.type";

export type TUserWithGarages = TUser & {
    Garages: Garage[];
};
