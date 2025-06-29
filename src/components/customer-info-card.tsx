import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Edit, Mail, MapPin, Phone, User } from "lucide-react";

interface CustomerInfoCardProps {
    vehicleId: string;
}

// Dummy customer data generator
const getDummyCustomerInfo = (vehicleId: string) => {
    const customers = [
        {
            name: "John Smith",
            email: "john.smith@email.com",
            phone: "+44 7123 456789",
            address: "123 High Street, Manchester, M1 1AA",
            joinDate: "2022-03-15",
            status: "Active",
        },
        {
            name: "Sarah Johnson",
            email: "sarah.johnson@email.com",
            phone: "+44 7234 567890",
            address: "456 Oak Avenue, Birmingham, B2 2BB",
            joinDate: "2021-11-28",
            status: "Active",
        },
        {
            name: "Mike Davis",
            email: "mike.davis@email.com",
            phone: "+44 7345 678901",
            address: "789 Elm Road, Leeds, LS3 3CC",
            joinDate: "2023-01-10",
            status: "Active",
        },
        {
            name: "Emma Wilson",
            email: "emma.wilson@email.com",
            phone: "+44 7456 789012",
            address: "321 Pine Close, Bristol, BS4 4DD",
            joinDate: "2022-08-22",
            status: "Premium",
        },
        {
            name: "David Brown",
            email: "david.brown@email.com",
            phone: "+44 7567 890123",
            address: "654 Cedar Lane, Liverpool, L5 5EE",
            joinDate: "2021-05-14",
            status: "Active",
        },
        {
            name: "Lisa Miller",
            email: "lisa.miller@email.com",
            phone: "+44 7678 901234",
            address: "987 Birch Way, Newcastle, NE6 6FF",
            joinDate: "2023-04-03",
            status: "Premium",
        },
    ];

    const hash = vehicleId.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
    }, 0);

    return customers[Math.abs(hash) % customers.length];
};

export const CustomerInfoCard = ({ vehicleId }: CustomerInfoCardProps) => {
    const customer = getDummyCustomerInfo(vehicleId);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        Customer Information
                    </CardTitle>
                    <Button variant="outline" size="sm" disabled>
                        <Edit className="h-4 w-4" />
                        Edit
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3">
                    {/* Customer Name */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                            Name
                        </span>
                        <span className="font-semibold">{customer.name}</span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            Email
                        </span>
                        <a
                            href={`mailto:${customer.email}`}
                            className="text-primary hover:underline font-medium"
                        >
                            {customer.email}
                        </a>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            Phone
                        </span>
                        <a
                            href={`tel:${customer.phone}`}
                            className="text-primary hover:underline font-medium"
                        >
                            {customer.phone}
                        </a>
                    </div>

                    {/* Address */}
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            Address
                        </span>
                        <span className="font-medium text-sm pl-5">
                            {customer.address}
                        </span>
                    </div>

                    {/* Customer Since */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Customer Since
                        </span>
                        <span className="font-medium">
                            {new Date(customer.joinDate).toLocaleDateString(
                                "en-GB",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )}
                        </span>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                            Status
                        </span>
                        <Badge
                            variant={
                                customer.status === "Premium"
                                    ? "default"
                                    : "secondary"
                            }
                            className={
                                customer.status === "Premium"
                                    ? "bg-amber-500 hover:bg-amber-600"
                                    : ""
                            }
                        >
                            {customer.status}
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
