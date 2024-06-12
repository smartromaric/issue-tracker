import IssuesStatusBadge from '@/app/components/IssuesStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading } from '@radix-ui/themes'
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
        <Heading>{issue.title}</Heading>
        <Flex gap={"3"} my={"2"} >
        <IssuesStatusBadge status={issue.status}/>
        <p>{issue.createdAt.toDateString()}</p>
        </Flex>
        <Card>
        <p>{issue.description}</p>
        </Card>
    </div>
  )
}

export default page