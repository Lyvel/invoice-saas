import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertTriangle,
    Calendar,
    CheckCircle,
    Clock,
    DollarSign,
    Eye,
    Plus,
    Wrench,
} from "lucide-react";

interface JobsListCardProps {
    vehicleId: string;
}

type JobStatus = "Completed" | "In Progress" | "Pending" | "Cancelled";

interface Job {
    id: string;
    jobNumber: string;
    description: string;
    status: JobStatus;
    date: string;
    total: number;
    notes?: string;
}

// Dummy jobs data generator
const getDummyJobs = (vehicleId: string): Job[] => {
    const jobTypes = [
        "Annual MOT Test",
        "Oil & Filter Change",
        "Brake Pad Replacement",
        "Tyre Replacement",
        "Battery Replacement",
        "Clutch Repair",
        "Engine Diagnostic",
        "Air Conditioning Service",
        "Exhaust System Repair",
        "Suspension Check",
        "Wheel Alignment",
        "Coolant System Flush",
    ];

    const statuses: JobStatus[] = [
        "Completed",
        "In Progress",
        "Pending",
        "Cancelled",
    ];

    const hash = vehicleId.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
    }, 0);

    const jobCount = (Math.abs(hash) % 8) + 3; // 3-10 jobs
    const jobs: Job[] = [];

    for (let i = 0; i < jobCount; i++) {
        const jobHash = hash * (i + 1);
        const statusIndex = Math.abs(jobHash) % statuses.length;
        const typeIndex = Math.abs(jobHash * 2) % jobTypes.length;
        const total = (Math.abs(jobHash * 3) % 500) + 50; // £50-£550

        // Generate dates in the past 2 years
        const daysAgo = Math.abs(jobHash * 4) % 730;
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);

        jobs.push({
            id: `job-${vehicleId}-${i}`,
            jobNumber: `INV-${String(Math.abs(jobHash)).slice(0, 6)}`,
            description: jobTypes[typeIndex],
            status: statuses[statusIndex],
            date: date.toISOString().split("T")[0],
            total: total,
            notes: i % 3 === 0 ? "Additional notes available" : undefined,
        });
    }

    // Sort by date descending (most recent first)
    return jobs.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
};

const getStatusIcon = (status: JobStatus) => {
    switch (status) {
        case "Completed":
            return <CheckCircle className="h-4 w-4 text-green-600" />;
        case "In Progress":
            return <Clock className="h-4 w-4 text-blue-600" />;
        case "Pending":
            return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
        case "Cancelled":
            return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
};

const getStatusVariant = (status: JobStatus) => {
    switch (status) {
        case "Completed":
            return "default" as const;
        case "In Progress":
            return "secondary" as const;
        case "Pending":
            return "outline" as const;
        case "Cancelled":
            return "destructive" as const;
    }
};

export const JobsListCard = ({ vehicleId }: JobsListCardProps) => {
    const jobs = getDummyJobs(vehicleId);
    const totalValue = jobs
        .filter((job) => job.status === "Completed")
        .reduce((sum, job) => sum + job.total, 0);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CardTitle className="flex items-center gap-2">
                            <Wrench className="h-5 w-5 text-primary" />
                            Service History
                        </CardTitle>
                        <Badge variant="secondary" className="ml-2">
                            {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"}
                        </Badge>
                    </div>
                    <Button size="sm">
                        <Plus className="h-4 w-4" />
                        New Job
                    </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        Total Value:{" "}
                        <span className="font-semibold text-foreground">
                            £{totalValue.toFixed(2)}
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {jobs.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <Wrench className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No service history available</p>
                        <p className="text-sm">
                            Add the first job to get started
                        </p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Job #</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Total
                                </TableHead>
                                <TableHead className="w-[100px]">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jobs.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell className="font-mono text-sm">
                                        {job.jobNumber}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium">
                                                {job.description}
                                            </span>
                                            {job.notes && (
                                                <span className="text-xs text-muted-foreground">
                                                    {job.notes}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3 text-muted-foreground" />
                                            {new Date(
                                                job.date
                                            ).toLocaleDateString("en-GB")}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={getStatusVariant(
                                                job.status
                                            )}
                                            className="flex items-center gap-1 w-fit"
                                        >
                                            {getStatusIcon(job.status)}
                                            {job.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-medium">
                                        £{job.total.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
};
