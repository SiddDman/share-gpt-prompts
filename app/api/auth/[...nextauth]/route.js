import NextAuth from "next-auth/next";
import GoogleProviders from "next-auth/providers/google"
import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProviders({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            try {
                const sessionUser = await User.findOne({ email: session.user.email })
                session.user.id = sessionUser._id.toString();
                return session;

            } catch (error) {
                console.log(error)
            }
        },

        async signIn({ account, profile, user, credentials }) {
            try {
                await connectToDB()
                //check if a user already exists
                const userExists = await User.findOne({ email: profile.email })
                //if not create user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    });
                }

                return true;

            } catch (error) {
                console.log(error)
                return false;
            }
        }
    }

})

export { handler as GET, handler as POST };