import React from 'react'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex w-full grow mx-auto">
      {children}
    </div>
  )
}

export default Layout