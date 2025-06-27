import { TUserWithGarages } from "@/models/user/types/user-with-garages.type";
import { preloadChecks } from "@/utils/preload-checks";

const DashboardPage = async () => {
    const user = await preloadChecks<TUserWithGarages>({ Garages: true });
    return <div></div>;
};

export default DashboardPage;
