import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { clientPromise } from '../../../lib/mongodb'
import { getServerSession } from 'next-auth'
import dbConnect from '../../../lib/db'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  // @ts-ignore - Known issue: MongoDB adapter type incompatibility
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('请提供邮箱和密码')
        }

        await dbConnect()
        const user = await User.findOne({ email: credentials.email }).select('+password')
        
        if (!user) {
          throw new Error('用户不存在')
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)
        
        if (!isValid) {
          throw new Error('密码错误')
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30天
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        // 确保 token.sub 存在
        if (token.sub) {
          session.user.id = token.sub
        }
        // 确保 role 存在并且是字符串类型
        if (token.role) {
          session.user.role = token.role as string
        }
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }