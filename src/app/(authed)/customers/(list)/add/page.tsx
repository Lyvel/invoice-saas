import { Modal } from "@/components/modal";
import { AddCustomerForm } from "@/models/customer/components/add-customer.form";
import { urls } from "@/utils/urls";

const CustomersAddPage = () => {
    return (
        <Modal
            title="Add Customer"
            closeRedirect={urls.app.authed.customers.index}
        >
            <AddCustomerForm />
        </Modal>
    );
};

export default CustomersAddPage;
