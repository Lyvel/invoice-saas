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
            cars: {
                index: "/cars",
                add: "/cars/add",
                selected: {
                    index: (id: string) => `/cars/${id}`,
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
