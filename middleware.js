import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Edge runtime-compatible configuration for middleware (excludes EmailProvider and MongoDB adapter)
// NextAuth.js middleware requires an edge-compatible setup
// Middleware operates in an edge environment where EmailProvider is incompatible
// MongoDB adapter likewise lacks edge environment support, necessitating this alternative configuration
const { auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
})

export default auth(async function middleware(req) {
  // Custom middleware logic can be inserted here as required
})

// Optional: Exclude specific paths from middleware execution
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
} 