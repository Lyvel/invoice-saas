import { Button, buttonVariants } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

interface LoadingButtonProps
    extends React.ComponentProps<"button">,
        VariantProps<typeof buttonVariants> {
    loading?: boolean;
    loadingText?: string;
    asChild?: boolean;
}

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
    (
        {
            loading,
            loadingText,
            children,
            disabled,
            variant,
            size,
            asChild,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <Button
                ref={ref}
                disabled={loading || disabled}
                variant={variant}
                size={size}
                asChild={asChild}
                className={className}
                {...props}
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {loadingText || "Loading..."}
                    </>
                ) : (
                    children
                )}
            </Button>
        );
    }
);

LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
