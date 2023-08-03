'use client'

import { signOut } from "next-auth/react";
import Link from "next/link";
import { ButtonHTMLAttributes, forwardRef } from "react";

export const LogoutButton = () => {
    return (
        <Button onClick={() => signOut()} className="text-white bg-blue-900 button">
            Logout
        </Button>
    );
};

export const SettingsButton = () => {
    return (
        <Button className='button'>
            <Link href='/dashboard/settings'>
                Settings
            </Link>
        </Button>
    );
};


// Export to storybook.
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {

    return (
        <button ref={ref} type="button" {...props}>
            {children}
        </button>
    );
}));

Button.displayName = 'Button'