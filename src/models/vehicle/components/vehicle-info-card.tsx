import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Vehicle } from "@prisma/client";
import { Calendar, Car, Hash, Tag } from "lucide-react";

interface VehicleInfoCardProps {
    vehicle: Vehicle;
}

// Dummy data generator for additional vehicle info
const getDummyVehicleInfo = (vehicleId: string) => {
    const colors = ["Black", "White", "Silver", "Blue", "Red", "Grey", "Green"];
    const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];
    const transmissions = ["Manual", "Automatic", "Semi-Automatic"];
    const mileages = [15000, 23000, 45000, 67000, 89000, 112000, 134000];

    const hash = vehicleId.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
    }, 0);

    return {
        color: colors[Math.abs(hash) % colors.length],
        fuelType: fuelTypes[Math.abs(hash * 2) % fuelTypes.length],
        transmission: transmissions[Math.abs(hash * 3) % transmissions.length],
        mileage: mileages[Math.abs(hash * 4) % mileages.length],
        engineSize: ((Math.abs(hash * 5) % 30) + 10) / 10, // 1.0 to 4.0L
    };
};

export const VehicleInfoCard = ({ vehicle }: VehicleInfoCardProps) => {
    const dummyInfo = getDummyVehicleInfo(vehicle.id);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-primary" />
                    Vehicle Information
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Registration */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                            Registration
                        </span>
                        <span className="font-semibold">
                            {vehicle.registration || "Not provided"}
                        </span>
                    </div>

                    {/* Year */}
                    {vehicle.year && (
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Year
                            </span>
                            <Badge variant="secondary">{vehicle.year}</Badge>
                        </div>
                    )}

                    {/* Make & Model */}
                    {(vehicle.make || vehicle.model) && (
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                <Tag className="h-4 w-4" />
                                Make & Model
                            </span>
                            <span className="font-medium">
                                {[vehicle.make, vehicle.model]
                                    .filter(Boolean)
                                    .join(" ")}
                            </span>
                        </div>
                    )}

                    {/* Color */}
                    {/* <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                            <Palette className="h-4 w-4" />
                            Color
                        </span>
                        <span className="font-medium">{dummyInfo.color}</span>
                    </div>

                    {/* Fuel Type */}
                    {/* <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                            <Fuel className="h-4 w-4" />
                            Fuel Type
                        </span>
                        <Badge variant="outline">{dummyInfo.fuelType}</Badge>
                    </div> */}

                    {/* Engine Size */}
                    {/* <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                            <Gauge className="h-4 w-4" />
                            Engine Size
                        </span>
                        <span className="font-medium">
                            {dummyInfo.engineSize.toFixed(1)}L
                        </span>
                    </div> */}

                    {/* Transmission */}
                    {/* <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                            Transmission
                        </span>
                        <span className="font-medium">
                            {dummyInfo.transmission}
                        </span>
                    </div> */}

                    {/* Last Service Mileage */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                            Last Service Mileage
                        </span>
                        <span className="font-medium">
                            {dummyInfo.mileage.toLocaleString()} miles
                        </span>
                    </div>
                </div>

                {/* VIN */}
                {vehicle.vin && (
                    <>
                        <Separator />
                        <div className="flex items-center gap-2">
                            <Hash className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">
                                VIN:
                            </span>
                            <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                                {vehicle.vin}
                            </span>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
};
