import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "@/firebase";
import GoogleProvider from 'next-auth/providers/google'
const auth = getAuth(app)
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        console.log(credentials)
        if(!credentials.email || !credentials.password){
          return null;
        }
        try {
          const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  
          // If no error is thrown, userCredential.user should exist, indicating a successful authentication.
          if (userCredential.user) {
              return userCredential.user; // Authentication successful
          } else {
              throw new Error("Authentication failed."); 
          }
      } catch (error) {
          // Here, the error could be due to an incorrect email/password, or other Firebase authentication issues.
          throw new Error(error.message); // This provides feedback about why authentication failed.
      }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "online",
          response_type: "code"
        }
      }
    })
  ],
};
const handler = NextAuth(authOptions)
export {handler as GET,handler as POST} 
