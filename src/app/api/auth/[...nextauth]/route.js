import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from '@/lib/mongodb';
import User from '@/modals/user';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log("user", user);
      console.log("account", account);

      if (user) {
        try {
          await connectDB();
          const userExists = await User.findOne({ email: user.email });
          if (userExists) {
            return true;
          }

          // Create a new user if they don't exist
          const newUser = new User({
            email: user.email,
            name: user.name,
          });

          await newUser.save(); // Save the new user to the database

          return true; // Allow sign-in after user is created
        } catch (error) {
          console.error("Error creating user:", error);
          return false;
        }
      }
      return false;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
