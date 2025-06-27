"use client";

import { ChevronsUpDown, LogOut, Monitor, Moon, Sun } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { TUser } from "@/models/user/types/user.type";
import { urls } from "@/utils/urls";
import { useTheme } from "next-themes";

export function NavUser({ user }: { user: TUser }) {
    const { isMobile } = useSidebar();
    const { setTheme, theme } = useTheme();

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
                                    src={user.gravatar || ""}
                                    alt={user.name!}
                                />
                                <AvatarFallback className="rounded-lg">
                                    {user.name
                                        ?.split(" ")
                                        .map((name) => name.charAt(0))
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">
                                    {user.name}
                                </span>
                                <span className="truncate text-xs">
                                    {user.email}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuItem asChild>
                            <form
                                method="post"
                                action={urls.resources.auth.signout}
                            >
                                <button
                                    type="submit"
                                    className="w-full flex items-center gap-2 cursor-pointer"
                                >
                                    <LogOut />
                                    Log out
                                </button>
                            </form>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <button
                                type="button"
                                className="w-full flex items-center gap-2 cursor-pointer"
                                onClick={() =>
                                    setTheme(
                                        theme === "dark" ? "light" : "dark"
                                    )
                                }
                            >
                                {theme === "dark" ? (
                                    <Sun />
                                ) : theme === "system" ? (
                                    <Monitor />
                                ) : (
                                    <Moon />
                                )}
                                {theme === "dark"
                                    ? "Light"
                                    : theme === "system"
                                      ? "System"
                                      : "Dark"}
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
