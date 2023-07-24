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
                <Link href='' className="shadow-2xl drop-shadow-2xl  font-semibold bg-blue-950/80 rounded-r-2xl flex w-full justify-end"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="max-w-6 max-h-6 m-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </Link>
                <h1 className="text-xl shadow-2xl p-5 drop-shadow-2xl  shadow-black/50 font-extralight w-full text-center rounded-br-2xl">Welcome {session?.user?.name || 'User'}</h1>
                <div className="flex flex-col w-full h-full shadow-2xl p-2 uppercase text-sm drop-shadow-2xl rounded-2xl">
                    <Link href='/dashboard' className="shadow-2xl drop-shadow-2xl font-semibold  shadow-black/50 text-start p-3">Dashboard</Link>
                    <Link href='/dashboard' className="shadow-2xl drop-shadow-2xl font-semibold  text-start p-3">Projects</Link>
                    <Link href='/dashboard' className="shadow-2xl drop-shadow-2xl  font-semibold text-start p-3">Archive</Link>
                </div>
            </aside>
        </>
    )
}

export default Sidebar