"use client";

import { FormInput } from "@/components/form-input";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createVehicleAction } from "@/models/vehicle/actions/create-vehicle-action";
import { addVehicleSchema } from "@/models/vehicle/schemas/add-vehicle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const VehiclesAddPage = () => {
    const [pending, setPending] = useState(false);
    const form = useForm<z.infer<typeof addVehicleSchema>>({
        resolver: zodResolver(addVehicleSchema),
        defaultValues: {
            registration: "",
            make: "",
            model: "",
            year: "",
            vin: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof addVehicleSchema>) => {
        setPending(true);
        const formData = new FormData();
        formData.append("registration", data.registration);
        formData.append("make", data.make);
        formData.append("model", data.model);
        formData.append("year", data.year);
        formData.append("vin", data.vin);
        try {
            await createVehicleAction(formData);
        } catch (error) {
            console.error(error);
        } finally {
            setPending(false);
        }
    };

    return (
        <Modal title="Add Vehicle">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <FormInput
                            control={form.control}
                            label="Registration"
                            name="registration"
                            required
                            disabled={pending}
                        />
                        <FormInput
                            control={form.control}
                            label="Make"
                            name="make"
                            required
                            disabled={pending}
                        />
                        <FormInput
                            control={form.control}
                            label="Model"
                            name="model"
                            required
                            disabled={pending}
                        />
                        <FormInput
                            control={form.control}
                            label="Year"
                            name="year"
                            required
                            disabled={pending}
                        />
                        <FormInput
                            control={form.control}
                            label="VIN"
                            name="vin"
                            disabled={pending}
                        />
                        <Button type="submit" disabled={pending}>
                            {pending ? "Adding Vehicle..." : "Add Vehicle"}
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    );
};

export default VehiclesAddPage;
