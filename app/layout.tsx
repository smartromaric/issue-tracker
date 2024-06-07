import './globals.css';
import '@radix-ui/themes/styles.css';
import NavBar from './NavBar';
import { Theme } from '@radix-ui/themes';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
// const NavBar = dynamic(() => import('./NavBar'), { ssr: false })
  return (
    <html lang="en">
      <body >
        <Theme>
      <NavBar />
      <main className='p-5'>{children}</main>
        </Theme>
        </body>
    </html>
  )
}
