import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
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

          const response = await axios.post("http://localhost:3000/api/user", {
            email: user.email,
            name: user.name,
          }, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          console.log("response", response);

          if (response.status === 201) {
            return true;
          }
          
          return false;
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
