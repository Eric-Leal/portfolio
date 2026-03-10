import type { Metadata } from 'next'
import { Outfit, Cormorant_Infant } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { LenisProvider } from '@/components/providers/lenis-provider'
import { Navbar } from '@/components/shared/navbar'
import { Footer } from '@/components/shared/footer'
import '@/styles/globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { QueryProvider } from '@/components/providers/query-provider'
import { Toaster } from '@/components/ui/sonner'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

const cormorant = Cormorant_Infant({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['italic'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'Seu Nome | Portfolio',
  description: 'Software Engineer',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${cormorant.variable} font-sans antialiased`}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <LenisProvider>
              <Navbar />
              <main className="grow">{children}</main> <Footer />
              <Toaster position="bottom-right" richColors />
              <SpeedInsights />
            </LenisProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
