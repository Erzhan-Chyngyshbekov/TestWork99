import { Metadata } from "next"

import { Navbar } from "@/components/common/Navbar/Navbar"

import "@/styles/globals.scss"

export const metadata: Metadata = {
  title: "Погода онлайн | TestWork99",
  description: "Узнайте актуальную погоду и прогноз на 5 дней в любом городе.",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Погода онлайн | TestWork99",
    description:
      "Узнайте актуальную погоду и прогноз на 5 дней в любом городе.",
    siteName: "TestWork99",
  },
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
