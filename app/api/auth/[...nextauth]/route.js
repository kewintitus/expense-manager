import User from '@/models/user';
import { connectToDb } from '@/utils/database';
import { connect } from 'mongoose';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CUSTOMER_ID,
      clientSecret: process.env.GOOGLE_CUSTOMER_SECRET_CODE,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ account, profile }) {
      try {
        await connectToDb();

        const userExists = await User.find({ email: profile.email });
        console.log(profile.name);
        console.log(userExists);

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.username,
            image: profile.image,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
