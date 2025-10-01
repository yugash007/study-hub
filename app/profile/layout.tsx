import type React from "react"
import { AppHeader } from "@/components/app-header"
import { AppFooter } from "@/components/app-footer"

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
      <AppFooter />
    </>
  )
}
