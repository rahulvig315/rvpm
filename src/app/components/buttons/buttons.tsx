'use client'

import { signOut } from "next-auth/react";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from "react";

export const LogoutButton = () => {
    return (
        <Button onClick={() => signOut()} className="h-full p-3.5 text-sm font-semibold text-white rounded-br-lg bg-zinc-800">
            Logout
        </Button>
    );
};

export const SettingsButton = () => {
    return (
        <Button href='/dashboard/settings' className="h-full p-3.5 text-sm font-semibold text-white bg-zinc-700">
            Settings
        </Button>
    );
};


// Export to storybook.
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>

export const Button = (forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {

    if (props?.href) {
        return <a href={props?.href} {...props}>{children}</a>
    }

    return (
        <button ref={ref} type="button" {...props}>
            {children}
        </button>
    );
}));

Button.displayName = 'Button'