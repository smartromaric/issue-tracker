import {IssuesStatusBadge} from "@/app/components"
import prisma from '@/prisma/client'
import { Card, Flex, Heading } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import delay from 'delay'



interface Props{
    params:{id:string}
}

const  page = async ({params}:Props) => {
    await delay(2000)
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
        <Card className='prose' mt={"4"}>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
    </div>
  )
}

export default page