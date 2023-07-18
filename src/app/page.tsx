import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Landing from "./components/landing/Landing";
import { authOptions } from "./lib/auth";

async function Home() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect('/dashboard')
    }
    
    return (
        <>
            <Landing />
        </>)
}

export default Home