import { SetupData } from "@/models/setup/types/setup-data.type";
import { useEffect, useState } from "react";

const INITIAL_DATA: SetupData = {
    garageName: "",
    address: {
        street: "",
        city: "",
        county: "",
        postCode: "",
        country: "",
    },
    logo: null,
};

const STORAGE_KEY = "garage-setup-data";

export function useSetupData() {
    const [data, setData] = useState<SetupData>(INITIAL_DATA);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load data from localStorage on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    const parsedData = JSON.parse(stored);
                    // Note: File objects can't be stored in localStorage, so logo will be null
                    setData({ ...parsedData, logo: null });
                } catch (error) {
                    console.warn("Failed to parse stored setup data:", error);
                }
            }
            setIsLoaded(true);
        }
    }, []);

    // Save data to localStorage whenever it changes
    useEffect(() => {
        if (isLoaded && typeof window !== "undefined") {
            // Don't store the logo file in localStorage
            const dataToStore = { ...data, logo: null };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
        }
    }, [data, isLoaded]);

    const updateData = (updates: Partial<SetupData>) => {
        setData((prev) => ({
            ...prev,
            ...updates,
            address: {
                ...prev.address,
                ...(updates.address || {}),
            },
        }));
    };

    const clearData = () => {
        setData(INITIAL_DATA);
        if (typeof window !== "undefined") {
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    return {
        data,
        updateData,
        clearData,
        isLoaded,
    };
}
