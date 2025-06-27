"use client";

import { Car, LayoutDashboard, List, Users } from "lucide-react";
import * as React from "react";

import { GarageSwitcher } from "@/components/garage-switcher";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { TUserWithGarages } from "@/models/user/types/user-with-garages.type";
import { urls } from "@/utils/urls";

const data = {
    navMain: [
        {
            title: "Dashboard",
            url: urls.app.authed.dashboard,
            icon: LayoutDashboard,
        },
        {
            title: "Vehicles",
            url: urls.app.authed.vehicles.index,
            icon: Car,
        },
        {
            title: "Customers",
            url: "#",
            icon: Users,
        },
        {
            title: "Inventory",
            url: "#",
            icon: List,
            items: [
                {
                    title: "Parts",
                    url: "#",
                },
                {
                    title: "Services",
                    url: "#",
                },
            ],
        },
    ],
};

export function AppSidebar({
    user,
    ...props
}: React.ComponentProps<typeof Sidebar> & { user: TUserWithGarages }) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <GarageSwitcher garages={user.garages} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
