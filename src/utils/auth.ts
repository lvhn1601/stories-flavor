import { prisma } from '@/utils/prisma'
import GoogleProvider from 'next-auth/providers/google'
import { ROLE } from './constant'

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async signIn({ user }: { user: { email?: string | null } }) {
            if (!user.email) return false

            let existingUser = await prisma.user.findUnique({
                where: { email: user.email, isActivated: true },
            })

            if (!existingUser) {
                existingUser = await prisma.user.create({
                    data: {
                        email: user.email,
                        phone: null,
                        password: null,
                        isActivated: false,
                        role: ROLE.USER,
                    },
                })
            }

            return !!existingUser
        },
        async session({ session, token }: { session: any; token: any }) {
            // Add custom fields to session.user
            if (token.email) {
                const user = await prisma.user.findUnique({
                    where: { email: token.email },
                })

                if (user) {
                    session.user.id = user.id
                    session.user.phone = user.phone
                    session.user.role = user.role ?? ROLE.USER
                    session.user.isActivated = user.isActivated ?? false
                }
            }

            return session
        },
    },
    pages: {
        signIn: '/login',
        error: '/login?error=AccessDenied',
    },
    secret: process.env.NEXTAUTH_SECRET || 'beecrzmai',
}