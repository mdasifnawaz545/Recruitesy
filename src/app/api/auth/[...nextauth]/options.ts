import { NextAuthOptions, User } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import DBConnection from "@/lib/database";
import { recruitUserModel } from "@/models/user";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_SECRET
        // })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {

                try {
                    await DBConnection();

                    const { name: username, sub: password, email } = (profile) ? (profile) : ({ name: "", sub: "password", email: "" });

                    const response: recruitUser | null = await recruitUserModel.findOne({ email: email });

                    if (response) {
                        const user: recruitUser = response as recruitUser;
                        return true;
                    }
                    else {
                        const newUser = new recruitUserModel({ username: username, password: password, email: email });
                        const response = await newUser.save();
                        if (response) return true;
                        else return false;
                    }

                } catch (error) {
                    console.log(error)
                    return false
                }

            }
            // if (account?.provider === "github") {

            // }
            return false;
        },
        async jwt({ token, user }: { token: JWT, user: any }) {
            if (user) {

                token.username = user.username
                token.email = user.email
            }
            return token

        },
        async session({ session, token }: { session: any, token: any }) {
            if (token) {
                session.user.username = token.username,
                session.user.email = token.email
            }
            return session;
        }
    },
    pages: {

        // In the pages object, we've defined signIn as /auth/login. This tells NextAuth.js to use the LoginPage component (located at pages/auth/ login.js) as the custom sign-in page.

        // Similarly, signout is set to /auth/ logout, directing users to the LogoutPage component for the sign-out process.

        signIn: "/signin",
        signOut: "/signout",

    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.AUTH_SECRET_KEY

}