import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TUserWithGarages } from "@/models/user/types/user-with-garages.type";
import { preloadChecks } from "@/utils/preload-checks";
import { serverRedirectWithError } from "@/utils/redirect-with-toast";
import { urls } from "@/utils/urls";

const AuthedLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await preloadChecks<TUserWithGarages>({ garages: true });
    if (!user?.garages?.length || user.garages.length === 0) {
        return serverRedirectWithError(
            urls.app.authed.setup.garageName,
            "Please setup your garage"
        );
    }
    return (
        <div className="">
            <SidebarProvider>
                <AppSidebar user={user} />
                <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
        </div>
    );
};

export default AuthedLayout;
