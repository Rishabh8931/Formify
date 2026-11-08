import React from 'react'
import { UserButton } from '@clerk/nextjs'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import Logo from  "@/components/Logo"

function Layout({children}: {children: React.ReactNode}) {
  return (
    <div
    className = "flex flex-col min-h-screen min-w-full bg-background max-h-screen"
    >
      <nav className = "flex items-center justify-between broder-b border-border h-[60px] px-4 py-2">
        <Logo/>
        <div className = "flex gap-4 items-center">
           <ThemeSwitcher/>
        <UserButton />
          </div>
       

      </nav>
      <main
      className = "flex flex-grow w-full"
      >
        {children}
      </main>
      
      </div>
  )
}
 
export default Layout