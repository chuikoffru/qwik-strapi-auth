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
