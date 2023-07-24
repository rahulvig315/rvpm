'use client';
import { APP_NAME, NotificationTypes, REQUEST_HEADERS, RequestMethods, Routes } from '@/app/constants';
import { useNotification } from '@/app/hooks/notification';
import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation";
import { NextResponse } from 'next/server';
import { ChangeEvent, useEffect, useState } from "react";
import { AuthNotificationMessages, FormInputsType, Views, validateUser } from "../../utils/landing";
import UserAuthForm from '../forms/UserAuthForm';
import LandingNavigation from '../navigation/LandingNavigation';



function Landing() {
    const { addNotification, notifications } = useNotification();
    const [view, setView] = useState<Views>(Views.Login);
    const [formInputs, setFormInputs] = useState<FormInputsType>({
        email: '',
        password: '',
        passwordConfirm: ''
    })
    const [loading, setLoading] = useState<boolean>(false);
    const { status } = useSession();

    useEffect(() => {
        if (status === 'authenticated' && !loading && !notifications.length) {
            redirect(Routes.Dashboard)
        }
    }, [status, loading, notifications.length])
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
                        await validateUser(view, formInputs, addNotification, setLoading)
                    }
                    break;
                }
                addNotification(AuthNotificationMessages.NoMatch, NotificationTypes.ERROR)
                break;
            case Views.Login:
                await validateUser(view, formInputs, addNotification, setLoading)
                break;
        }
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
    });

    return (
        <main className="flex flex-col w-screen h-screen overflow-y-auto bg-slate-100">
            <LandingNavigation onViewChange={handleViewChange} view={view} />
            <div className='flex flex-col items-center justify-start h-full gap-5 md:flex-row'>
                <div className='w-fit flex flex-col justify-center items-center shadow-2xl drop-shadow-2xl rounded-r-xl shadow-blue-800/50 bg-blue-900 text-white my-auto h-full
                min-w-[200px] max-w-[500px]'>
                    <h1 className='text-2xl font-thin text-center'>Welcome to {APP_NAME}.</h1>
                    <div className='p-5 text-center'>
                        <p className='text-lg font-extralight'>
                            I developed this app to free myself of third-party Project Managers tools .
                            <br />
                            Feel free to clone my git repo to free yourself as well!
                            <br />
                            This app is pre-configured with Next Auth and Prisma (PostgreSQL).
                        </p>
                    </div>
                </div>
                <div className="flex justify-center flex-1 w-full p-10">
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