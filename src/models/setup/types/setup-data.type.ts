export type SetupData = {
    garageName: string;
    address: {
        street: string;
        city: string;
        county: string;
        postCode: string;
        country: string;
    };
    logo: File | null;
};
