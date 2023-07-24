import { getServerSession } from "next-auth"
import Link from "next/link"

type Props = {
    session: any
}

async function Sidebar() {
    const session = await getServerSession()

    return (
        <>
            <aside className="hidden md:visible w-fit md:flex flex-col justify-start items-start shadow-2xl drop-shadow-2xl rounded-r-xl shadow-blue-800/50 bg-blue-900 text-white my-auto h-full min-w-[200px]">
                <Link href='' className="flex justify-end w-full font-semibold shadow-2xl drop-shadow-2xl bg-blue-950/80 rounded-r-2xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-3 max-w-6 max-h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </Link>
                <h1 className="w-full p-5 text-xl text-center shadow-2xl drop-shadow-2xl shadow-black/50 font-extralight rounded-br-2xl">Welcome {session?.user?.name || 'User'}</h1>
                <div className="flex flex-col w-full h-full p-2 text-sm uppercase shadow-2xl drop-shadow-2xl rounded-2xl">
                    <Link href='/dashboard' className="p-3 font-semibold shadow-2xl drop-shadow-2xl shadow-black/50 text-start">Dashboard</Link>
                    <Link href='/dashboard/projects' className="p-3 font-semibold shadow-2xl drop-shadow-2xl text-start">Projects</Link>
                    <Link href='/dashboard/archive' className="p-3 font-semibold shadow-2xl drop-shadow-2xl text-start">Archive</Link>
                </div>
            </aside>
        </>
    )
}

export default Sidebar