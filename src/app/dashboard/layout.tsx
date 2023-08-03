import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Navigation from "../components/navigation/DashboardNavigation";
import Sidebar from "../components/sidebar/Sidebar";
import { Routes } from "../constants";
import { authOptions } from "../lib/auth";

type Props = {
    children: React.ReactNode
}

async function DashboardLayout({ children }: Props) {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect(Routes.Landing)
    }
    return (
        <main className="flex flex-col w-screen h-screen text-black pb-[1rem] overflow-hidden bg-slate-300">
            <Navigation />
            <div className="flex w-full h-screen">
                <Sidebar />
                <section className="flex items-center justify-center w-full h-screen shadow-2xl m-7 rounded-xl bg-neutral-100 drop-shadow-2xl max-h-[85vh]">
                    {children}
                </section>
            </div>
        </main>
    )
}

export default DashboardLayout