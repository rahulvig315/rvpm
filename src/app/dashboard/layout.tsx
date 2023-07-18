import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";

type Props = {}

async function DashboardLayout({ }: Props) {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/')
    }
    return (
        <div>DashboardLayout</div>
    )
}

export default DashboardLayout