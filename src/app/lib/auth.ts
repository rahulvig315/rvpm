import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { OAuthUserConfig } from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

const prisma = new PrismaClient();
export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        } as OAuthUserConfig<GithubProfile>),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        } as OAuthUserConfig<GoogleProfile>),
        CredentialsProvider({
            name: "Login",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: {
                    label: "Password",
                    type: "password"
                },
            },
            async authorize() {
                const user = { id: "1", name: "Admin", email: "admin@admin.com" };
                return user;
            },
        })
    ]
}