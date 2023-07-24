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
        <main className="h-screen w-screen flex flex-col bg-slate-300 text-black">
            <Navigation />
            <div className="flex w-full h-full">
                <Sidebar />
                <section className="m-7 rounded-xl bg-neutral-100 shadow-2xl drop-shadow-2xl flex w-full justify-center items-center">
                    {children}
                </section>
            </div>
        </main>
    )
}

export default DashboardLayout