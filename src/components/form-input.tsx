import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
    control: Control<TFieldValues>;
    name: TName;
    label?: string;
    description?: string;
    required?: boolean;
    action?: React.ReactNode;
}

const FormInput = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    label,
    description,
    required,
    className,
    action,
    ...props
}: FormInputProps<TFieldValues, TName>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem>
                    {label && (
                        <FormLabel>
                            {label}
                            {required && (
                                <span className="text-destructive ml-1">*</span>
                            )}
                        </FormLabel>
                    )}
                    <FormControl>
                        <div className="relative">
                            <Input
                                className={cn(
                                    "h-11",
                                    fieldState.error &&
                                        "border-destructive focus-visible:ring-destructive",
                                    className
                                )}
                                {...field}
                                {...props}
                            />
                            {action && action}
                        </div>
                    </FormControl>
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

FormInput.displayName = "FormInput";

export { FormInput };
