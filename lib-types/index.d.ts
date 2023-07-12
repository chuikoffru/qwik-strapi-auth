import { type QRL } from "@builder.io/qwik";
import { type RequestEvent, type RequestEventCommon } from "@builder.io/qwik-city";
export type AuthError = {
    data: null;
    error: {
        status: number;
        message: string;
        name: string;
    };
};
export type StrapiAuthConfig = {
    url: string;
    callbackUrl?: string;
};
export type Credentials = {
    identifier: string;
    password: string;
};
export type RegisterProps = {
    username: string;
    email: string;
    password: string;
};
export interface StrapiAuthSession {
    jwt: string;
    user: {
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
    };
}
export declare function me({ url }: StrapiAuthConfig, jwt: string): Promise<any>;
export declare function login({ identifier, password }: Credentials, { url }: StrapiAuthConfig): Promise<string | AuthError | StrapiAuthSession>;
export declare function register({ username, email, password }: RegisterProps, { url }: StrapiAuthConfig): Promise<string | AuthError | StrapiAuthSession>;
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
    useAuthSession: import("@builder.io/qwik-city").Loader<StrapiAuthSession | null>;
    useAuthLogout: import("@builder.io/qwik-city").Action<{}, Record<string, any>, true>;
};
export declare const ensureAuthMiddleware: (req: RequestEvent) => void;
