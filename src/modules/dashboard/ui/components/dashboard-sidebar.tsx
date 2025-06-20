"use client";

import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
 } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, HomeIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";

 const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href:"/meetings"
    },{
        icon: BotIcon,
        label: 'Agents',
        href:"/agents"
    }
 ]
 const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href:"/upgrade"
    },
    {
        icon: HomeIcon,
        label: "Go Back to Home",
        href:"/"
    },
 ]


export const DashboardSidebar= () => {

    const pathname = usePathname()
    return  (
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground"> 
                <Link href={'/'} className="flex items-center gap-2 px-2 pt-2">
                <Image src={'/logo.svg'} alt="Logo" width={36} height={36} />
                <p className="text-2xl font-semibold">Gather.AI</p>
                </Link>
            </SidebarHeader>

            <div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5D686B]"/>

            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn("h-10  hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30%  via-sidebar/50 to-sidebar/50" , pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]")} isActive={pathname === item.href}>
                                        <Link href={item.href}>
                                        <item.icon className="size-5" />
                                        <span className="text-sm font-medium tracking-tight">
                                            {item.label}
                                            </span></Link>
                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                 <Separator className="opacity-10 text-[#5D686B]"/>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn("h-10  hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30%  via-sidebar/50 to-sidebar/50" , pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]")} isActive={pathname === item.href}>
                                        <Link href={item.href}>
                                        <item.icon className="size-5" />
                                        <span className="text-sm font-medium tracking-tight">
                                            {item.label}
                                            </span></Link>
                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="text-white">
                <DashboardUserButton/>

            </SidebarFooter>
        </Sidebar>
    )

}