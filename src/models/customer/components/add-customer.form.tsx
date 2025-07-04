"use client";

import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { addCustomerSchema } from "@/models/customer/schemas/add-customer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { createCustomerAction } from "../actions/create-customer.action";
export const AddCustomerForm = () => {
    const [pending, setPending] = useState(false);
    const form = useForm<z.infer<typeof addCustomerSchema>>({
        resolver: zodResolver(addCustomerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            street: "",
            city: "",
            county: "",
            postcode: "",
            country: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof addCustomerSchema>) => {
        setPending(true);
        try {
            await createCustomerAction(data);
        } catch (error) {
            console.error(error);
        } finally {
            setPending(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <FormInput
                        control={form.control}
                        label="Name"
                        name="name"
                        required
                        disabled={pending}
                    />
                    <FormInput
                        control={form.control}
                        label="Email"
                        name="email"
                        disabled={pending}
                    />
                    <FormInput
                        control={form.control}
                        label="Phone"
                        name="phone"
                        disabled={pending}
                    />
                    <FormInput
                        control={form.control}
                        label="Street"
                        name="street"
                        disabled={pending}
                    />
                    <FormInput
                        control={form.control}
                        label="City"
                        name="city"
                        disabled={pending}
                    />
                    <FormInput
                        control={form.control}
                        label="County"
                        name="county"
                        disabled={pending}
                    />
                    <FormInput
                        control={form.control}
                        label="Postcode"
                        name="postcode"
                        disabled={pending}
                    />
                    <FormInput
                        control={form.control}
                        label="Country"
                        name="country"
                        disabled={pending}
                    />
                    <Button type="submit" disabled={pending}>
                        {pending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            "Add Customer"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
