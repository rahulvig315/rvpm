'use client'

import { signOut } from "next-auth/react";
import Link from "next/link";

export const LogoutButton = () => {
    return (
        <Link type="button" typeof='button' onClick={() => signOut()} className="bg-zinc-800 font-semibold p-3 text-white rounded-br-lg" href={""}>
            Logout
        </Link>
    );
};

export const SettingsButton = () => {
    return (
        <Link type="button" href='/dashboard/settings' className="bg-zinc-700 font-semibold text-white p-3">
            Settings
        </Link>
    );
};