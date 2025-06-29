import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { urls } from "@/utils/urls";
import { Vehicle } from "@prisma/client";
import {
    Calendar,
    Car,
    CheckCircle,
    Clock,
    Hash,
    Tag,
    User,
    Wrench,
} from "lucide-react";
import Link from "next/link";

interface VehicleCardProps {
    vehicle: Vehicle;
}

// Dummy data generator based on vehicle ID for consistency
const getDummyData = (vehicleId: string) => {
    const customers = [
        "John Smith",
        "Sarah Johnson",
        "Mike Davis",
        "Emma Wilson",
        "David Brown",
        "Lisa Miller",
    ];
    const jobCounts = [0, 1, 2, 3, 5, 8, 12];
    const hasOutstandingJob = [true, false];

    // Use vehicle ID to generate consistent dummy data
    const hash = vehicleId.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
    }, 0);

    return {
        customerName: customers[Math.abs(hash) % customers.length],
        jobCount: jobCounts[Math.abs(hash * 2) % jobCounts.length],
        hasOutstanding:
            hasOutstandingJob[Math.abs(hash * 3) % hasOutstandingJob.length],
    };
};

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
    const dummyData = getDummyData(vehicle.id);

    return (
        <Link href={urls.app.authed.vehicles.selected.index(vehicle.id)}>
            <Card className="hover:shadow-lg hover:shadow-black/10 hover:scale-105 transition-all duration-200 cursor-pointer group">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg group-hover:text-primary transition-colors duration-200">
                            <Car className="h-5 w-5 text-primary" />
                            {vehicle.registration || "No Registration"}
                        </CardTitle>
                        {vehicle.year && (
                            <Badge
                                variant="secondary"
                                className="flex items-center gap-1"
                            >
                                <Calendar className="h-3 w-3" />
                                {vehicle.year}
                            </Badge>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="space-y-3">
                    {/* Customer Information */}
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground group-hover:text-primary/80 transition-colors duration-200" />
                        <span className="text-sm font-medium">
                            {dummyData.customerName}
                        </span>
                    </div>

                    <Separator />

                    {/* Job Information */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Wrench className="h-4 w-4 text-muted-foreground group-hover:text-primary/80 transition-colors duration-200" />
                            <span className="text-sm">
                                {dummyData.jobCount}{" "}
                                {dummyData.jobCount === 1 ? "job" : "jobs"}{" "}
                                completed
                            </span>
                        </div>

                        {/* Job Status Badge */}
                        {dummyData.hasOutstanding ? (
                            <Badge
                                variant="destructive"
                                className="flex items-center gap-1"
                            >
                                <Clock className="h-3 w-3" />
                                Outstanding
                            </Badge>
                        ) : (
                            <Badge
                                variant="default"
                                className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                            >
                                <CheckCircle className="h-3 w-3" />
                                Complete
                            </Badge>
                        )}
                    </div>

                    {(vehicle.make || vehicle.model) && (
                        <>
                            <Separator />
                            <div className="flex items-center gap-2">
                                <Tag className="h-4 w-4 text-muted-foreground group-hover:text-primary/80 transition-colors duration-200" />
                                <span className="text-sm">
                                    {[vehicle.make, vehicle.model]
                                        .filter(Boolean)
                                        .join(" ")}
                                </span>
                            </div>
                        </>
                    )}

                    {vehicle.vin && (
                        <>
                            <Separator />
                            <div className="flex items-center gap-2">
                                <Hash className="h-4 w-4 text-muted-foreground group-hover:text-primary/80 transition-colors duration-200" />
                                <span className="text-xs text-muted-foreground font-mono">
                                    VIN: {vehicle.vin}
                                </span>
                            </div>
                        </>
                    )}

                    {!vehicle.make && !vehicle.model && !vehicle.vin && (
                        <div className="text-sm text-muted-foreground italic">
                            No additional vehicle details available
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
};
