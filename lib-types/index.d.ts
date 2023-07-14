import { type QRL } from "@builder.io/qwik";
import { type RequestEvent, type RequestEventCommon } from "@builder.io/qwik-city";
import { StrapiAuthConfig, StrapiAuthSession } from "./types";
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
        error?: undefined;
        formErrors?: undefined;
        fieldErrors?: undefined;
        failed?: undefined;
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
        error?: undefined;
        formErrors?: undefined;
        fieldErrors?: undefined;
        failed?: undefined;
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
        [x: string]: undefined;
    } | {
        [x: string]: any;
    } | {
        [x: string]: undefined;
        formErrors?: string[] | undefined;
        fieldErrors?: {
            callbackUrl?: string[] | undefined;
            provider?: string[] | undefined;
            cb?: string[] | undefined;
        } | undefined;
        failed?: true | undefined;
    }, {
        provider: "github" | "google" | "facebook";
        callbackUrl?: string | undefined;
        cb?: ((...args: unknown[]) => unknown) | undefined;
    }, false>;
    useAuthSession: import("@builder.io/qwik-city").Loader<StrapiAuthSession | null>;
    useAuthLogout: import("@builder.io/qwik-city").Action<{}, Record<string, any>, true>;
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
        error?: undefined;
        formErrors?: undefined;
        fieldErrors?: undefined;
        failed?: undefined;
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
        error?: undefined;
        formErrors?: undefined;
        fieldErrors?: undefined;
        failed?: undefined;
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
        [x: string]: undefined;
    } | {
        [x: string]: any;
    } | {
        [x: string]: undefined;
        formErrors?: string[] | undefined;
        fieldErrors?: {
            callbackUrl?: string[] | undefined;
            provider?: string[] | undefined;
            cb?: string[] | undefined;
        } | undefined;
        failed?: true | undefined;
    }, {
        provider: "github" | "google" | "facebook";
        callbackUrl?: string | undefined;
        cb?: ((...args: unknown[]) => unknown) | undefined;
    }, false>;
    useAuthSession: import("@builder.io/qwik-city").Loader<StrapiAuthSession | null>;
    useAuthLogout: import("@builder.io/qwik-city").Action<{}, Record<string, any>, true>;
};
export declare const ensureAuthMiddleware: (req: RequestEvent) => void;
