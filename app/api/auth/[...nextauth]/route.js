import Account from '@/models/account';
import User from '@/models/user';
import userMetrics from '@/models/userMetrics';
import { connectToDb } from '@/utils/database';
import { connect } from 'mongoose';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CUSTOMER_ID,
      clientSecret: process.env.GOOGLE_CUSTOMER_SECRET,
    }),
    Credentials({
      name: 'Demo Login',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'demo' },
        password: { label: 'Password', type: 'password', placeholder: 'demo' },
      },
      authorize: async (credentials) => {
        if (credentials.username == 'demo' && credentials.password == 'demo') {
          return { id: 1, name: 'Demo User', email: 'demo@example.com' };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log(session);
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser?._id.toString();
      return session;
    },

    async signIn({ account, profile }) {
      try {
        await connectToDb();
        console.log(profile, account);
        let demoEmail = '';
        let demoUserName = '';
        let demoProfilePic = '';
        if (account?.type == 'credentials') {
          demoUserName = 'Demo User';
          demoEmail = 'demo@example.com';
          demoProfilePic =
            'https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png';
        }

        const userExists = await User.find({
          email: profile?.email || demoEmail,
        });
        // console.log('sign In', profile);
        // console.log('Env Google', process.env.GOOGLE_CUSTOMER_ID);
        // console.log('Check user', userExists);

        if (!userExists || userExists.length === 0) {
          console.log('Create user in db');
          await User.create({
            email: profile?.email || demoEmail,
            username: profile?.name || demoUserName,
            image: profile?.picture || demoProfilePic,
          });

          await userMetrics.create({
            spending: 0,
            income: 0,
            balance: 0,
            user: {
              email: profile?.email || demoEmail,
              username: profile?.name || demoUserName,
            },
          });
          await Account.create([
            {
              accountName: 'Demo Account',
              accountType: 'bank',
              amount: 0,
              user: profile?.email || demoEmail,
              createdOn: new Date(),
            },
            {
              accountName: 'cash',
              accountType: 'cash',
              amount: 0,
              user: profile?.email || demoEmail,
              createdOn: new Date(),
            },
          ]);
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
