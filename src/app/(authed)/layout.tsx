import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { updateUser } from "@/models/user/mutations/update-user";
import { TUserWithGarages } from "@/models/user/types/user-with-garages.type";
import { preloadChecks } from "@/utils/preload-checks";
import { serverRedirectWithError } from "@/utils/redirect-with-toast";
import { urls } from "@/utils/urls";
import { revalidatePath } from "next/cache";

const AuthedLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await preloadChecks<TUserWithGarages>({ Garages: true });
    if (!user?.Garages?.length || user.Garages.length === 0) {
        return serverRedirectWithError(
            urls.app.authed.setup.garageName,
            "Please setup your garage"
        );
    }
    if (!user.activeGarageId) {
        await updateUser(
            { id: user.id },
            { activeGarageId: user.Garages[0].id }
        );
        revalidatePath(urls.app.authed.dashboard);
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
