import { NotificationTypes } from "@/app/constants";
import { AddNotification } from "@/app/hooks/notification";
import { signIn } from "next-auth/react";

export enum Views {
    Login = 'Login',
    Register = 'Register'
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


export const validateUser = async (view: Views, formInputs: FormInputsType, addNotification: (content?: AddNotification['content'], type?: AddNotification['type']) => void, setLoading: (isLoading: boolean) => void) => {
    const authorizedUser = await nextCredentialsSignIn
        (formInputs);
    const notificationArgs = !authorizedUser?.error ? [AuthNotificationMessages?.[`${view}Success`], NotificationTypes.SUCCESS] : [view === Views.Register && AuthNotificationMessages.Error || AuthNotificationMessages.InvalidCredentials, NotificationTypes.ERROR]
    addNotification(...notificationArgs)
    setLoading(false)
}