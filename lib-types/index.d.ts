import { type QRL } from "@builder.io/qwik";
import { type RequestEvent, type RequestEventCommon, z } from "@builder.io/qwik-city";
import { StrapiAuthConfig, StrapiAuthSession } from "./types";
declare const providers: z.ZodEnum<["github", "google", "facebook"]>;
export type StrapiProviders = z.infer<typeof providers>;
export declare function strapiAuthQrl(authOptions: QRL<(ev: RequestEventCommon) => StrapiAuthConfig>): {
    useAuthSignin: import("@builder.io/qwik-city").Action<{
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
        formErrors?: undefined;
        fieldErrors?: undefined;
        failed?: undefined;
        error?: undefined;
    } | {
        error?: string | undefined;
        formErrors?: undefined;
        fieldErrors?: undefined;
        failed?: undefined;
        jwt?: undefined;
        user?: undefined;
    } | {
        formErrors?: string[] | undefined;
        fieldErrors?: {
            callbackUrl?: string[] | undefined;
        } | undefined;
        failed?: true | undefined;
        error?: undefined;
        jwt?: undefined;
        user?: undefined;
    }, {
        callbackUrl?: string | undefined;
    }, false>;
    useAuthSignup: import("@builder.io/qwik-city").Action<{
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
        formErrors?: undefined;
        fieldErrors?: undefined;
        failed?: undefined;
        error?: undefined;
    } | {
        error?: string | undefined;
        formErrors?: undefined;
        fieldErrors?: undefined;
        failed?: undefined;
        jwt?: undefined;
        user?: undefined;
    } | {
        formErrors?: string[] | undefined;
        fieldErrors?: {
            callbackUrl?: string[] | undefined;
        } | undefined;
        failed?: true | undefined;
        error?: undefined;
        jwt?: undefined;
        user?: undefined;
    }, {
        callbackUrl?: string | undefined;
    }, false>;
    useAuthConnect: import("@builder.io/qwik-city").Action<{
        error?: any;
        url?: undefined;
        formErrors?: undefined;
        fieldErrors?: undefined;
        failed?: undefined;
    } | {
        url?: string | undefined;
        error?: undefined;
        formErrors?: undefined;
        fieldErrors?: undefined;
        failed?: undefined;
    } | {
        formErrors?: string[] | undefined;
        fieldErrors?: {
            provider?: string[] | undefined;
        } | undefined;
        failed?: true | undefined;
        error?: undefined;
        url?: undefined;
    }, {
        provider: "github" | "google" | "facebook";
    }, false>;
    useAuthSession: import("@builder.io/qwik-city").Loader<StrapiAuthSession | null>;
    useAuthLogout: import("@builder.io/qwik-city").Action<{}, Record<string, any>, true>;
    callbackAuthMiddleware: (req: RequestEvent) => Promise<StrapiAuthSession | {
        error: any;
    }>;
};
export declare const strapiAuth$: (first: (ev: RequestEventCommon) => StrapiAuthConfig) => {
    useAuthSignin: import("@builder.io/qwik-city").Action<{
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
        formErrors?: undefined;
        fieldErrors?: undefined;
        failed?: undefined;
        error?: undefined;
    } | {
        error?: string | undefined;
        formErrors?: undefined;
        fieldErrors?: undefined;
        failed?: undefined;
        jwt?: undefined;
        user?: undefined;
    } | {
        formErrors?: string[] | undefined;
        fieldErrors?: {
            callbackUrl?: string[] | undefined;
        } | undefined;
        failed?: true | undefined;
        error?: undefined;
        jwt?: undefined;
        user?: undefined;
    }, {
        callbackUrl?: string | undefined;
    }, false>;
    useAuthSignup: import("@builder.io/qwik-city").Action<{
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
        formErrors?: undefined;
        fieldErrors?: undefined;
        failed?: undefined;
        error?: undefined;
    } | {
        error?: string | undefined;
        formErrors?: undefined;
        fieldErrors?: undefined;
        failed?: undefined;
        jwt?: undefined;
        user?: undefined;
    } | {
        formErrors?: string[] | undefined;
        fieldErrors?: {
            callbackUrl?: string[] | undefined;
        } | undefined;
        failed?: true | undefined;
        error?: undefined;
        jwt?: undefined;
        user?: undefined;
    }, {
        callbackUrl?: string | undefined;
    }, false>;
    useAuthConnect: import("@builder.io/qwik-city").Action<{
        error?: any;
        url?: undefined;
        formErrors?: undefined;
        fieldErrors?: undefined;
        failed?: undefined;
    } | {
        url?: string | undefined;
        error?: undefined;
        formErrors?: undefined;
        fieldErrors?: undefined;
        failed?: undefined;
    } | {
        formErrors?: string[] | undefined;
        fieldErrors?: {
            provider?: string[] | undefined;
        } | undefined;
        failed?: true | undefined;
        error?: undefined;
        url?: undefined;
    }, {
        provider: "github" | "google" | "facebook";
    }, false>;
    useAuthSession: import("@builder.io/qwik-city").Loader<StrapiAuthSession | null>;
    useAuthLogout: import("@builder.io/qwik-city").Action<{}, Record<string, any>, true>;
    callbackAuthMiddleware: (req: RequestEvent) => Promise<StrapiAuthSession | {
        error: any;
    }>;
};
export declare const ensureAuthMiddleware: (req: RequestEvent) => void;
export {};
