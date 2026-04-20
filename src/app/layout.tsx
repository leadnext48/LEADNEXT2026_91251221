import Footer from "@/components/pages/Footer"
import "./globals.css"
import ScrollHeader from "@/components/layout/ScrollHeader"

export const metadata = {
  title: "LEAD College of Management",
  description: "Official website of LEAD College of Management",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ScrollHeader />

        {/* Page Content */}
        <main className="flex-1">{children}</main>

        {/* Sticky Footer */}
        <Footer />
      </body>
    </html>
  )
}