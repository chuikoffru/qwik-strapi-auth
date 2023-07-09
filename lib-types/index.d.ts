import { type QRL } from "@builder.io/qwik";
import { type RequestEvent, type RequestEventCommon, RequestEventAction } from "@builder.io/qwik-city";
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
export declare function login({ identifier, password }: Credentials, { url }: StrapiAuthConfig): Promise<AuthError | StrapiAuthSession>;
export declare function register(data: RegisterProps, { url }: StrapiAuthConfig): Promise<any>;
export declare function logout(req: RequestEventAction): Promise<void>;
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
    }, false>;
    useAuthSession: import("@builder.io/qwik-city").Loader<StrapiAuthSession | null>;
    useAuthLogout: import("@builder.io/qwik-city").Action<{}, Record<string, any>, true>;
};
export declare const ensureAuthMiddleware: (req: RequestEvent) => void;
