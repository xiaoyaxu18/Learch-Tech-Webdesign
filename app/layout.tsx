import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SVAI Platform',
  description: 'Learn AI and Machine Learning through hands-on practice',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-[#1C1D24]">
          <AuthProvider>
            <Header />
            <main className="pt-24">
              {children}
            </main>
          </AuthProvider>
        </div>
      </body>
    </html>
  )
} 