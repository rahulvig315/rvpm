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

export enum AuthNotificationMessages {
    Error = 'An Error Occurred',
    NoMatch = 'Passwords do not match!',
    RegisterSuccess = 'Registered Successfully!',
    LoginSuccess = 'Logged In Successfully',
    InvalidCredentials = 'Unauthorized. Either Invalid Email or Password Entered!',
}

export const nextCredentialsSignIn = async ({ email, password }: FormInputsType) => {
    return await (await signIn('credentials', {
        redirect: false,
        email: email,
        password: password
    }));
}
