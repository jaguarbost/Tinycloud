"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LayoutGrid,
  ShieldCheck,
  Gauge,
  MoonStar,
  Plug,
  ExternalLink,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { approvals, currentUser, workspace } from "@/lib/mock-data";

const NAV_ITEMS = [
  { title: "Create", href: "/app", icon: Sparkles },
  { title: "Your tools", href: "/app/tools", icon: LayoutGrid },
  { title: "Approvals", href: "/app/approvals", icon: ShieldCheck },
  { title: "Governance", href: "/app/governance", icon: Gauge },
  { title: "Lifecycle", href: "/app/lifecycle", icon: MoonStar },
  { title: "Connectors", href: "/app/connectors", icon: Plug },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="gap-3 px-3 py-4">
        <Link
          href="/app"
          className="flex items-center gap-2 rounded-md px-1 py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Logo className="shrink-0" />
          <div className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold tracking-tight">
              TinyCloud
            </span>
            <span className="text-[11px] text-muted-foreground">
              {workspace.name}
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/app"
                    ? pathname === "/app"
                    : pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.title === "Approvals" && approvals.length > 0 ? (
                      <SidebarMenuBadge>{approvals.length}</SidebarMenuBadge>
                    ) : null}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="gap-3 px-3 pb-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden"
        >
          <ExternalLink className="size-3.5" />
          Back to site
        </Link>
        <div className="flex items-center gap-2 rounded-md px-2 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <Avatar className="size-8 shrink-0">
            <AvatarFallback className="bg-accent text-xs font-medium text-accent-foreground">
              {currentUser.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-medium">
              {currentUser.name}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {currentUser.role}
            </span>
          </div>
          <Badge
            variant="secondary"
            className="ml-auto shrink-0 group-data-[collapsible=icon]:hidden"
          >
            {workspace.plan}
          </Badge>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
