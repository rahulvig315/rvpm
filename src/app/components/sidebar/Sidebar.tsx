import { getServerSession } from "next-auth"
import Link from "next/link"

type Props = {
    session: any
}

async function Sidebar() {
    const session = await getServerSession()
    console.log('session', session)
    return (
        <>
            <aside className="bg-slate-400 max-w-[250px] items-center flex flex-col justify-center shadow-2xl drop-shadow-2xl rounded-r">
                <h1>Welcome {session?.user?.name || ''}</h1>
                <Link href='/dashboard'>Dashboard</Link>
                <Link href='/dashboard'>Projects</Link>
                <Link href='/dashboard'>Profile</Link>
            </aside>
        </>
    )
}

export default Sidebar