import { getServerSession } from "next-auth";
import Login from "./components/auth/login";
import { authOptions } from "./lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    < main className="flex min-h-screen flex-col items-center justify-between p-24" >
      <Login />
    </main >
  )
}
