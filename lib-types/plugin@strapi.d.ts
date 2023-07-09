export declare const useAuthSignin: import("@builder.io/qwik-city").Action<{
    jwt?: string | undefined;
    user?: {
        id: string;
        username: string;
        email: string;
        provider: string;
        confirmed: boolean;
        blocked: boolean;
        role: {
            id: number;
            name: string;
        };
    } | undefined;
    error?: undefined;
    formErrors?: undefined;
    fieldErrors?: undefined;
    failed?: undefined;
} | {
    error?: string | undefined;
    jwt?: undefined;
    formErrors?: undefined;
    fieldErrors?: undefined;
    failed?: undefined;
    user?: undefined;
} | {
    formErrors?: string[] | undefined;
    fieldErrors?: {
        provider?: string[] | undefined;
        callbackUrl?: string[] | undefined;
        authorizationParams?: string[] | undefined;
    } | undefined;
    failed?: true | undefined;
    jwt?: undefined;
    error?: undefined;
    user?: undefined;
}, {
    provider: "local" | "github";
    callbackUrl?: string | undefined;
    authorizationParams?: URLSearchParams | undefined;
}, false>, useAuthSession: import("@builder.io/qwik-city").Loader<import("./").StrapiAuthSession | null>;
