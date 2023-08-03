import { FormInputsType, Views } from '@/app/utils/landing';
import { ChangeEvent } from 'react';

export type UserAuthFormProps = {
    view: Views;
    formInputs: FormInputsType;
    loading: boolean;
    handleSubmit: (event: React.FormEvent) => void;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function UserAuthForm({
    view,
    formInputs,
    loading,
    handleSubmit,
    handleChange
}: UserAuthFormProps) {
    return (
        <form onSubmit={handleSubmit} className=' p-10 h-fit flex flex-col justify-center bg-slate-200  rounded-2xl shadow-md border m-5 flex-1 drop-shadow-2xl text-black'>
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
                        CONFIRM PASSWORD
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
    )
}

export default UserAuthForm