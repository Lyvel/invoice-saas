import { CustomerInfoCard } from "@/components/customer-info-card";
import { JobsListCard } from "@/components/jobs-list-card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { VehicleInfoCard } from "@/models/vehicle/components/vehicle-info-card";
import { getVehicle } from "@/models/vehicle/queries/get-vehicle";
import { preloadChecks } from "@/utils/preload-checks";
import { serverRedirectWithError } from "@/utils/redirect-with-toast";
import { urls } from "@/utils/urls";

const VehicleDetailsLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ vehicleId: string }>;
}) => {
    const { vehicleId } = await params;
    const user = await preloadChecks();
    if (!user || !user.activeGarageId) {
        return serverRedirectWithError(
            urls.app.auth.signin,
            "No active garage"
        );
    }
    const vehicle = await getVehicle({
        id: vehicleId,
        garageId: user.activeGarageId,
    });
    if (!vehicle) {
        return serverRedirectWithError(
            urls.app.authed.vehicles.index,
            "Vehicle not found"
        );
    }
    return (
        <div className="flex flex-col gap-6 p-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={urls.app.authed.vehicles.index}>
                            Vehicles
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{vehicle.registration}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{vehicle.registration}</h1>
            </div>
            <div className="space-y-6">
                {/* Vehicle & Customer Info Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <VehicleInfoCard vehicle={vehicle} />
                    <CustomerInfoCard vehicleId={vehicle.id} />
                </div>

                {/* Jobs List */}
                <JobsListCard vehicleId={vehicle.id} />
            </div>
            {children}
        </div>
    );
};

export default VehicleDetailsLayout;
