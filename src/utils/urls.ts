export const urls = {
    app: {
        home: "/home",
        auth: {
            register: "/register",
            signin: "/signin",
        },
        authed: {
            setup: {
                garageName: "/setup/garage-name",
                address: "/setup/address",
                logo: "/setup/logo",
                summary: "/setup/summary",
            },
            dashboard: "/dashboard",
            vehicles: {
                index: "/vehicles",
                add: "/vehicles/add",
                selected: {
                    index: (id: string) => `/vehicles/${id}`,
                },
            },
        },
    },
    resources: {
        auth: {
            register: "/api/auth/register",
            signin: "/api/auth/signin",
            signout: "/api/auth/signout",
        },
        setup: "/api/setup",
    },
};
