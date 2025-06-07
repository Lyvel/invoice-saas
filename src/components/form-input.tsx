import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    required?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, error, helperText, required, className, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="space-y-2">
                {label && (
                    <Label htmlFor={inputId} className="text-sm font-medium">
                        {label}
                        {required && (
                            <span className="text-destructive ml-1">*</span>
                        )}
                    </Label>
                )}
                <Input
                    id={inputId}
                    ref={ref}
                    className={cn(
                        "h-11",
                        error &&
                            "border-destructive focus-visible:ring-destructive",
                        className
                    )}
                    {...props}
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                {helperText && !error && (
                    <p className="text-sm text-muted-foreground">
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

FormInput.displayName = "FormInput";

export { FormInput };
