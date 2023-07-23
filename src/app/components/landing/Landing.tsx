'use client';
import { NotificationTypes, REQUEST_HEADERS, RequestMethods } from '@/app/constants';
import { useNotification } from '@/app/hooks/notification';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';
import { ChangeEvent, useState } from "react";
import { AuthNotificationMessages, FormInputsType, Routes, Views, nextCredentialsSignIn } from "../../utils/landing";
import UserAuthForm from '../forms/UserAuthForm';
import LandingNavigation from '../navigation/LandingNavigation';



function Landing() {
    const addNotification = useNotification();
    const router = useRouter()
    const [view, setView] = useState<Views>(Views.Login);
    const [formInputs, setFormInputs] = useState<FormInputsType>({
        email: '',
        password: '',
        passwordConfirm: ''
    })
    const [loading, setLoading] = useState<boolean>(false);


    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setLoading(true);
        switch (view) {
            case Views.Register:
                if (formInputs.password === formInputs.passwordConfirm) {
                    const res: NextResponse = await fetch(Routes.Registration, {
                        method: RequestMethods.POST,
                        body: JSON.stringify(formInputs),
                        headers: {
                            ...REQUEST_HEADERS.CONTENT_TYPE
                        }
                    }) as NextResponse
                    if (res.ok) {
                        const registeredUser = await nextCredentialsSignIn
                            (formInputs);
                        const notificationArgs = !registeredUser?.error ? [AuthNotificationMessages.RegisterSuccess, NotificationTypes.SUCCESS] : [AuthNotificationMessages.Error, NotificationTypes.ERROR]
                        addNotification(...notificationArgs)
                    }
                    break;
                }
                addNotification(AuthNotificationMessages.NoMatch, NotificationTypes.ERROR)
                break;
            case Views.Login:
                const loggedInUser = await nextCredentialsSignIn(formInputs);
                const notificationArgs = !loggedInUser?.error ? [AuthNotificationMessages.LoginSuccess, NotificationTypes.SUCCESS] : [AuthNotificationMessages.InvalidCredentials, NotificationTypes.ERROR]
                addNotification(...notificationArgs)
                break;
        }
        setLoading(false);
    }
    const handleFormInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormInputs((prevFormInputs) =>
            ({ ...prevFormInputs, [name]: value }));
    };

    const handleViewChange = () => setView((prevView) => {
        if (prevView === Views.Login) {
            return Views.Register
        } else {
            return Views.Login
        }
    })

    return (
        <main className="h-screen w-screen flex flex-col bg-slate-100 overflow-y-auto">
            <LandingNavigation onViewChange={handleViewChange} view={view} />
            <div className='flex flex-col md:flex-row justify-start h-full items-center gap-5'>
                <div className='bg-slate-800 h-full flex flex-col items-center text-zinc-100  p-10 justify-center gap-7 t flex-1 max-w-[600px] shadow-2xl drop-shadow-2xl'>
                    <h1 className='text-2xl text-center font-bold'>Welcome to R.V. Project Manager.</h1>
                    <div className='p-5 text-center'>
                        <p className='font-light text-lg'>
                            I developed this app to free myself of third-party Project Managers tools .
                            <br />
                            Feel free to clone my git repo to free yourself as well!
                            <br />
                            This app is pre-configured with Next Auth and Prisma (PostgreSQL).
                        </p>
                    </div>
                </div>
                <div className="justify-center p-10 flex w-full flex-1">
                    <UserAuthForm
                        view={view}
                        formInputs={formInputs}
                        loading={loading}
                        handleChange={handleFormInputChange}
                        handleSubmit={handleFormSubmit}
                    />
                </div>
            </div>

        </main >
    )
}

export default Landing