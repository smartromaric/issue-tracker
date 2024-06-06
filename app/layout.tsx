import './globals.css'
import NavBar from './NavBar'
import dynamic from 'next/dynamic'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
// const NavBar = dynamic(() => import('./NavBar'), { ssr: false })
  return (
    <html lang="en">
      <body >
      <NavBar />
        {children}
        </body>
    </html>
  )
}
