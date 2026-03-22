"use client";

import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscription";

const menuItems = [
  {
    title: "Main",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        url: "/workflows",
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials",
      },
      {
        title: "Executions",
        icon: HistoryIcon,
        url: "/executions",
      },
    ],
  }
];

export const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { hasActiveSubscription, isLoading } = useHasActiveSubscription();

  return (
    <Sidebar  collapsible="icon">
      <SidebarHeader className="bg-zinc-900 text-white">
        <SidebarMenuItem className="bg-zinc-900 text-white">
          <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
            <Link href="/" prefetch>
              <svg width="28" height="28" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.52268 63.5L7.72607 46.0593H25.8786L22.3193 63.5H4.52268Z" fill="#D97757"/>
                                <path d="M4.52268 63.5L7.72607 46.0593H25.8786L22.3193 63.5H4.52268Z" fill="#F04D26"/>
                                <path d="M26.5905 46.0593L30.5057 27.5508H48.3023L44.0312 46.0593H26.5905Z" fill="#D97757"/>
                                <path d="M26.5905 46.0593L30.5057 27.5508H48.3023L44.0312 46.0593H26.5905Z" fill="#F04D26"/>
                                <path d="M19.4718 36.8051L23.3871 18.6525H60.0481L63.6074 0.5H7.72607L0.607422 36.8051H19.4718Z" fill="#D97757"/>
                                <path d="M19.4718 36.8051L23.3871 18.6525H60.0481L63.6074 0.5H7.72607L0.607422 36.8051H19.4718Z" fill="#F04D26"/>
                                <path d="M4.52268 63.5L7.72607 46.0593H25.8786L22.3193 63.5H4.52268Z" stroke="white"/>
                                <path d="M26.5905 46.0593L30.5057 27.5508H48.3023L44.0312 46.0593H26.5905Z" stroke="white"/>
                                <path d="M19.4718 36.8051L23.3871 18.6525H60.0481L63.6074 0.5H7.72607L0.607422 36.8051H19.4718Z" stroke="white"/>
                            </svg>
              <span className="font-semibold text-sm">FlowForge</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent className="bg-zinc-900 text-white">
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={
                        item.url === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.url)
                      }
                      asChild
                      className="gap-x-4 h-10 px-4"
                    >
                      <Link href={item.url} prefetch>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="bg-zinc-900 text-white">
        <SidebarMenu>
          {!hasActiveSubscription && !isLoading && (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Upgade to Pro"
                className="gap-x-4 h-10 px-4"
                onClick={() => authClient.checkout({ slug: "pro" })}
              >
                <StarIcon className="h-4 w-4" />
                <span>Upgrade to Pro</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Billing Portal"
              className="gap-x-4 h-10 px-4"
              onClick={() => authClient.customer.portal()}
            >
              <CreditCardIcon className="h-4 w-4" />
              <span>Billing Portal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign out"
              className="gap-x-4 h-10 px-4"
              onClick={() => authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/login");
                  },
                },
              })}
            >
              <LogOutIcon className="h-4 w-4" />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};