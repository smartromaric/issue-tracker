import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props{
    params:{id:string}
}

const  page = async ({params}:Props) => {
    if(!parseInt(params.id))
        notFound()
    const issue = await prisma.issue.findUnique({where:{id:parseInt(params.id)}})
    if(!issue)
        notFound()
  return (
    <div>
        <h1>{issue.title}</h1>
        <p>{issue.status}</p>
        <p>{issue.status}</p>
        <p>{issue.createdAt.toDateString()}</p>

    </div>
  )
}

export default page