import { signIn } from "next-auth/react";

export enum Views {
    Login = 'Login',
    Register = 'Register'
}

export enum Routes {
    Dashboard = '/dashboard',
    Landing = '/',
    Registration = '/api/register'
}

export type FormInputsType = {
    email: string;
    password: string;
    passwordConfirm: string;
}

export enum Notifications {
    Error = 'An Error Occurred',
    NoMatch = 'Passwords do not match!',
    Success = 'Authorization Success!'
}

export const nextCredentialsSignIn = async ({ email, password }: FormInputsType, callbackUrl: string) => {
    return await signIn('credentials', {
        redirect: true,
        email: email,
        password: password,
        callbackUrl
    })
}
