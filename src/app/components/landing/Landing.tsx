'use client';
import { useNotification } from '@/app/hooks/notification';
import { useRouter, useSearchParams } from 'next/navigation';
import { NextResponse } from 'next/server';
import { ChangeEvent, useState } from "react";
import { FormInputsType, Notifications, Routes, Views, nextCredentialsSignIn } from "./helper";


function Landing() {
    const addNotification = useNotification();
    const router = useRouter()
    const [view, setView] = useState<Views.Login | Views.Register>(Views.Login);
    const [formInputs, setFormInputs] = useState<FormInputsType>({
        email: '',
        password: '',
        passwordConfirm: ''
    })
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    const callbackUrl = useSearchParams().get('callbackUrl') || Routes.Dashboard;


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setLoading(true);
        setFormInputs({ email: '', password: '', passwordConfirm: '' })
        let res: NextResponse;
        try {
            switch (view) {
                case Views.Register:
                    if (formInputs.password === formInputs.passwordConfirm) {
                        res = await fetch(Routes.Registration, {
                            method: 'POST',
                            body: JSON.stringify(formInputs),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }) as NextResponse
                        setLoading(false);
                        if (res.ok) {
                            addNotification(Notifications.Success)
                            await nextCredentialsSignIn(formInputs, callbackUrl)
                        } else {
                            setError((await res.json()).message)
                        }
                        return;
                    }
                    addNotification(Notifications.NoMatch, 'error')
                    setError({ message: Notifications.NoMatch })
                    break;
                case Views.Login:
                    addNotification(Notifications.Success)
                    await nextCredentialsSignIn(formInputs, callbackUrl)
                    setLoading(false);
                    break;
            }
        } catch (error) {
            addNotification(Notifications.Error, 'error')
            setLoading(false)
            setError(error)
        }
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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

    if (error) {
        router.push(Routes.Landing)
    }

    return (
        <main className="h-screen w-screen flex flex-col bg-slate-100 overflow-y-auto">
            <nav className="text-zinc-100 flex w-full justify-between bg-slate-600 items-center shadow-2xl drop-shadow-2xl">
                <h1 className="font-semibold text-2xl p-2">
                    RVPM
                </h1>
                <div className="flex gap-3 text-sm">
                    <button onClick={handleViewChange} className="border-x p-3 font-semibold">
                        {view === Views.Login ? Views.Register : Views.Login}
                    </button>
                </div>
            </nav>
            <header className='flex flex-col md:flex-row justify-start h-full items-center gap-5'>
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
                <div className="justify-center p-10  flex w-full flex-1">
                    <form onSubmit={handleSubmit} className=' p-10 h-fit flex flex-col justify-center bg-slate-200  rounded-2xl shadow-md border m-5 flex-1 drop-shadow-2xl'>
                        <h1 className='font-extralight text-center mb-5 text-2xl border-b border-slate-500 p-2'>
                            {view.toUpperCase()}
                        </h1>
                        <div className="flex-col flex font-thin gap-5 text-sm">
                            <div className='flex flex-col'>
                                <label htmlFor="email" typeof="email">
                                    EMAIL
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    className="border border-slate-400 my-1 p-1"
                                    name="email"
                                    value={formInputs.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="password" typeof="password">
                                    PASSWORD
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formInputs.password}
                                    className="border border-slate-400 my-1 p-1"
                                    onChange={handleChange} />
                            </div>
                            {view === Views.Register && <div className='flex flex-col'>
                                <label htmlFor="passwordConfirm" typeof="password">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="passwordConfirm"
                                    name="passwordConfirm"
                                    value={formInputs.passwordConfirm}
                                    className="border border-slate-400 my-1 p-1"
                                    onChange={handleChange} />
                            </div>}
                        </div>
                        <div className='w-full flex justify-center'>
                            <button type="submit" className='bg-zinc-800 disabled:bg-gray-500 text-zinc-100 px-3 py-2 m-5 rounded' disabled={loading}>
                                {view.toUpperCase()}
                            </button>
                        </div>
                    </form>
                </div>
            </header>

        </main >
    )
}

export default Landing