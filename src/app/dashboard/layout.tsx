import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Navigation from "../components/navigation/DashboardNavigation";
import Sidebar from "../components/sidebar/Sidebar";
import { authOptions } from "../lib/auth";

type Props = {
    children: React.ReactNode
}

async function DashboardLayout({ children }: Props) {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/')
    }
    return (
        <main className="h-screen w-screen flex flex-col">
            <Navigation />
            <div className="grid grid-cols-2 grid-rows-1 w-full h-full">
                <Sidebar />
                <section>
                    {children}
                </section>
            </div>
        </main>
    )
}

export default DashboardLayout