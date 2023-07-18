'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { NextResponse } from 'next/server';
import { ChangeEvent, useState } from "react";
import { FormInputsType, Routes, Views, nextCredentialsSignIn } from "./helper";

//Todo: Add Alerts for Bad States
//Todo: Add Loading Spinner

function Landing() {
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
        let res: NextResponse & any;
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
                        })
                        setLoading(false);
                        if (res.ok) {
                            await nextCredentialsSignIn(formInputs, callbackUrl)
                        } else {
                            setError((await res.json()).message)
                        }
                        return;
                    }
                    setError({ message: "Passwords do not match" })
                    break;
                case Views.Login:
                    res = await nextCredentialsSignIn(formInputs, callbackUrl)
                    setLoading(false);
                    break;
            }
        } catch (error) {
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
        <main className="h-screen w-screen flex flex-col bg-slate-300 overflow-hidden">
            <nav className="text-zinc-100 flex w-full justify-between bg-slate-600 items-center">
                <h1 className="font-semibold text-xl p-2">
                    RVPM
                </h1>
                <div className="flex gap-3 text-sm">
                    <button onClick={handleViewChange} className="border-x p-3 font-semibold">
                        {view === Views.Login ? Views.Register : Views.Login}
                    </button>
                </div>
            </nav>
            <header className='flex flex-col md:flex-row justify-start h-full items-center gap-5'>
                <div className='bg-slate-500 h-full flex flex-col items-center text-zinc-100  p-10 justify-center gap-3 text-center flex-1 max-w-[600px]'>
                    <h1 className='text-3xl font-extralight'>Welcome to R.V. Project Manager.</h1>
                    <div className='text-center'>
                        <p className='font-thin text-sm'>
                            I developed this app to free myself of third-party Project Managers tools like Trello.
                            <br />
                            Feel free to clone my git repo to free yourself as well!
                            <br />
                            This app is pre-configured with Next Auth and Prisma (PostgreSQL).
                        </p>
                    </div>
                </div>
                <div className="justify-center p-10 overflow-y-auto overflow-x-hidden flex w-full flex-1">
                    <form onSubmit={handleSubmit} className=' p-10 h-fit flex flex-col justify-center bg-slate-200  rounded-2xl shadow-md border m-5 flex-1'>
                        <h1 className='font-extralight text-center mb-5 text-2xl border-b border-slate-500 p-2'>
                            {view.toUpperCase()}
                        </h1>
                        <div className="flex-col flex font-light gap-5 text-sm">
                            <div className='flex flex-col'>
                                <label htmlFor="email" typeof="email">
                                    Email
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
                                    Password
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
                            <button type="submit" className='bg-zinc-800 text-zinc-100 px-3 py-2 m-5 rounded'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </header>

        </main >
    )
}

export default Landing