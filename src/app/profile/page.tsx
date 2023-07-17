import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

async function Profile() {
    const session = await getServerSession(authOptions);
    

    return <h1>Hello World</h1>
}

export default Profile