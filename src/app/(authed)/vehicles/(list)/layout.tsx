import { Button } from "@/components/ui/button";
import { TUserWithGarages } from "@/models/user/types/user-with-garages.type";
import { VehicleCard } from "@/models/vehicle/components/vehicle-card";
import { getVehicles } from "@/models/vehicle/queries/get-vehicles";
import { preloadChecks } from "@/utils/preload-checks";
import { serverRedirectWithError } from "@/utils/redirect-with-toast";
import { urls } from "@/utils/urls";
import { Plus } from "lucide-react";
import Link from "next/link";

const VehiclesLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await preloadChecks<TUserWithGarages>({ Garages: true });
    if (!user?.Garages?.length) {
        return serverRedirectWithError(
            urls.app.authed.setup.garageName,
            "You don't have a garage setup"
        );
    }
    const vehicles = await getVehicles({
        garageId: user.activeGarageId || user.Garages[0].id,
    });
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Vehicles</h1>
                <Button asChild>
                    <Link href={urls.app.authed.vehicles.add}>
                        <Plus />
                        Add Vehicle
                    </Link>
                </Button>
            </div>

            {vehicles.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 p-6 bg-muted rounded-full">
                        <Plus className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                        No vehicles yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                        Get started by adding your first vehicle to the garage.
                    </p>
                    <Button asChild>
                        <Link href={urls.app.authed.vehicles.add}>
                            Add Vehicle
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {vehicles.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                </div>
            )}

            {children}
        </div>
    );
};

export default VehiclesLayout;
