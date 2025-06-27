import { Button } from "@/components/ui/button";
import { urls } from "@/utils/urls";
import { Plus } from "lucide-react";
import Link from "next/link";

const VehiclesLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Vehicles</h1>
                <Button asChild>
                    <Link href={urls.app.authed.vehicles.add}>
                        <Plus />
                        Add Vehicle
                    </Link>
                </Button>
            </div>
            <div className="flex flex-col gap-4">{children}</div>
        </div>
    );
};

export default VehiclesLayout;
