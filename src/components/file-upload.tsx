import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";

interface FileUploadProps {
    label?: string;
    accept?: string;
    maxSize?: number; // in MB
    onFileSelect?: (file: File | null) => void;
    error?: string;
    helperText?: string;
    required?: boolean;
    className?: string;
}

const FileUpload = ({
    label,
    accept = "image/*",
    maxSize = 5,
    onFileSelect,
    error,
    helperText,
    required,
    className,
}: FileUploadProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (selectedFile: File | null) => {
        setFile(selectedFile);
        onFileSelect?.(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.size <= maxSize * 1024 * 1024) {
            handleFileSelect(droppedFile);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        handleFileSelect(selectedFile);
    };

    const removeFile = () => {
        handleFileSelect(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className={cn("space-y-2", className)}>
            {label && (
                <Label className="text-sm font-medium">
                    {label}
                    {required && (
                        <span className="text-destructive ml-1">*</span>
                    )}
                </Label>
            )}

            <div
                className={cn(
                    "border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer",
                    isDragOver && "border-primary bg-primary/5",
                    error && "border-destructive",
                    !error &&
                        !isDragOver &&
                        "border-border hover:border-primary/50"
                )}
                onDrop={handleDrop}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileInputChange}
                    className="hidden"
                />

                {preview ? (
                    <div className="flex flex-col items-center space-y-3">
                        <div className="relative">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-lg"
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile();
                                }}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium">{file?.name}</p>
                            <p className="text-xs text-muted-foreground">
                                {(file?.size
                                    ? file.size / 1024 / 1024
                                    : 0
                                ).toFixed(2)}{" "}
                                MB
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-3 text-center">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                            <Upload className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">
                                Drop your logo here, or{" "}
                                <span className="text-primary">browse</span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                                PNG, JPG, JPEG up to {maxSize}MB
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
            {helperText && !error && (
                <p className="text-sm text-muted-foreground">{helperText}</p>
            )}
        </div>
    );
};

export { FileUpload };
