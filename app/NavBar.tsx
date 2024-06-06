'use client'

import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const NavBar = () => {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
    const links = [
        {label:"Dashboard",href:"/"},
        {label:"Issues",href:"/issues"}
    ]
    const currentPath = usePathname();
  return (
    <>
    {isClient?<nav className='flex border space-x-6  px-3 h-14 items-center'>
        <Link href={"/"}> <AiFillBug color='black'/> </Link>
        <ul className='flex space-x-6'>
        {links.map(link=><Link key={link.label} className={
          classNames({
            'text-zinc-900': currentPath === link.href,
            'text-zinc-500': currentPath !== link.href,
            'hover:text-zinc-800 transition-colors':true,
          })
        } 
        href={link.href}>{link.label}</Link>)}
        </ul>
    </nav>:""}
    </>
    
    
  )
}

export default NavBar