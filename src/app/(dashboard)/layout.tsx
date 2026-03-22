import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const Layout = ({ children }: { children: React.ReactNode; }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-zinc-900">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;