import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { OAuthUserConfig } from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

const prisma = new PrismaClient();

type Cred = {
    email: string,
    password: string;
}
export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
    },
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
            async authorize(credentials, req) {
                const { email, password }: Cred = credentials as Cred;
                if (!email || !password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: email
                    }
                })

                if (!user || !(await compare(password, user?.password || ''))) {
                    return null;
                }

                return user;
            },
        })
    ],
    callbacks: {
        session: ({ session, token }) => {

            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                }
            }
        },
        jwt: ({ token, user }) => {

            if (user) {
                return {
                    ...token,
                    id: user.id,

                }
            }
            return token;
        }
    }
}