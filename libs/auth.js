import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import config from "@/config"
import connectMongo from "./mongo"

export const { handlers, auth, signIn, signOut } = NextAuth({
  
  // Configure with any randomly generated key in your .env.local file
  secret: process.env.NEXTAUTH_SECRET,

  // Include EmailProvider exclusively for server-side operations (edge runtime not supported)
  providers: [
    // Refer to the "Login with Email" guide for email server configuration
    // A MongoDB database is necessary. Configure the MONGODB_URI environment variable.
    ...(connectMongo
      ? [
          EmailProvider({
            server: {
              host: "smtp.resend.com",
              port: 465,
              auth: {
                user: "resend",
                pass: process.env.RESEND_API_KEY,
              },
            },
            from: config.resend.fromNoReply,
          }),
          GoogleProvider({
            // Refer to the "Login with Google" guide to obtain your authentication credentials
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            async profile(profile) {
              return {
                id: profile.sub,
                name: profile.given_name ? profile.given_name : profile.name,
                email: profile.email,
                image: profile.picture,
                createdAt: new Date(),
              };
            },
          }),
        ]
      : []),
  ],

  // Newly registered users will be persisted in the Database (MongoDB Atlas). User models include attributes such as name, email, image, and more.
  // A MongoDB database connection is necessary. Define the MONGODB_URI environment variable.
  // For additional details on model structure, visit: https://authjs.dev/concepts/database-models
  ...(connectMongo && { adapter: MongoDBAdapter(connectMongo) }),

  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  theme: {
    brandColor: config.colors.main,
    // Insert your custom logo below. Suggested dimensions are rectangular (e.g., 200x50px) displaying both your logo and name.
    // This logo will appear during the authentication process. Omitting it will result in a faded appearance.
    logo: `https://${config.domainName}/logoAndName.png`,
  },
}); 