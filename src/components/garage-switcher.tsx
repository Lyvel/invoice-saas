"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { Garage } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function GarageSwitcher({ garages }: { garages: Garage[] }) {
    const { isMobile } = useSidebar();
    const [activeGarage, setActiveGarage] = React.useState(garages[0]);

    if (!activeGarage) {
        return null;
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src={""}
                                    alt={activeGarage.name!}
                                />
                                <AvatarFallback className="rounded-lg">
                                    {activeGarage.name
                                        ?.split(" ")
                                        .map((name) => name.charAt(0))
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>

                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">
                                    {activeGarage.name}
                                </span>
                                {/* <span className="truncate text-xs">
                                    {activeGarage.plan}
                                </span> */}
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-muted-foreground text-xs">
                            Garages
                        </DropdownMenuLabel>
                        {garages.map((garage, index) => (
                            <DropdownMenuItem
                                key={garage.name}
                                onClick={() => setActiveGarage(garage)}
                                className="gap-2 p-2"
                            >
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={""} alt={garage.name!} />
                                    <AvatarFallback className="rounded-lg">
                                        {garage.name
                                            ?.split(" ")
                                            .map((name) => name.charAt(0))
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>

                                {garage.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
