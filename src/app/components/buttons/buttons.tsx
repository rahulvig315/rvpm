'use client'

import { signOut } from "next-auth/react";

export const LogoutButton = () => {
    return (
        <button style={{ marginRight: 10 }} onClick={() => signOut()}>
            Sign Out
        </button>
    );
};