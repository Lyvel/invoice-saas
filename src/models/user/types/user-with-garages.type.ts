import { Garage, User } from "@prisma/client";

export type TUserWithGarages = User & {
    garages: Garage[];
};
