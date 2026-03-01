import type { Metadata } from 'next'
import { Outfit, Cormorant_Infant } from 'next/font/google'
import { ThemeProvider } from '@/components/shared/theme-provider'
import { Navbar } from '@/components/shared/navbar'
import { Footer } from '@/components/shared/footer'
import '@/styles/globals.css'

// Configuração da Outfit (Sans-serif principal)
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

// Cormorant Infant (Serif para títulos itálicos)
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${outfit.variable} ${cormorant.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
