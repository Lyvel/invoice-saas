import { Button } from "@/components/ui/button";
import { urls } from "@/utils/urls";
import { Plus } from "lucide-react";
import Link from "next/link";

const CustomersLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Customers</h1>
                <Button asChild>
                    <Link
                        href={urls.app.authed.customers.add}
                        className="cursor-pointer"
                    >
                        <Plus />
                        Add Customer
                    </Link>
                </Button>
            </div>

            {children}
        </div>
    );
};

export default CustomersLayout;
