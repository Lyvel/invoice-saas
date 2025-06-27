import { Modal } from "@/components/modal";
import { AddVehicleForm } from "@/models/vehicle/components/add-vehicle.form";
import { urls } from "@/utils/urls";

const VehiclesAddPage = () => {
    return (
        <Modal
            title="Add Vehicle"
            closeRedirect={urls.app.authed.vehicles.index}
        >
            <AddVehicleForm />
        </Modal>
    );
};

export default VehiclesAddPage;
