import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "../components/buttons/buttons";
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
        <main>
            <LogoutButton />
            <section>
                {children}
            </section>
        </main>
    )
}

export default DashboardLayout