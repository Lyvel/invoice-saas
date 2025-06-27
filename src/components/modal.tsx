"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

type ComponentProps = {
    title: string;
    description?: string;
    children: React.ReactNode;
    open?: boolean;
    onClose?: () => void;
    closeRedirect: string;
};

export const Modal = ({
    title,
    description,
    children,
    open = true,
    onClose,
    closeRedirect,
}: ComponentProps) => {
    const router = useRouter();

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            router.push(closeRedirect);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};
