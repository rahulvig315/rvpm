'use client'

import { signOut } from "next-auth/react";
import Link from "next/link";

export const LogoutButton = () => {
    return (
        <button onClick={() => signOut()}>
            Logout
        </button>
    );
};

export const SettingsButton = () => {
    return (
        <Link href='/dashboard/settings'>
            Settings
        </Link>
    );
};