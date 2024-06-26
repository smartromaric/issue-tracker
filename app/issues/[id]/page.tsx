import {IssuesStatusBadge} from "@/app/components"
import prisma from '@/prisma/client'
import { Card, Flex, Grid, Heading,Box, Button } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import delay from 'delay' 
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from "next/link"



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
    <Grid columns={{initial:"1",md:"2"}} gap={"5"} >
    <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap={"3"} my={"2"} >
        <IssuesStatusBadge status={issue.status}/>
        <p>{issue.createdAt.toDateString()}</p>
        </Flex>
        <Card className='prose' mt={"4"}>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
    </Box>
    <Box>
        <Button>
        <Pencil2Icon/>
        <Link href={`issues/${issue.id}/edit`}>Edit</Link>
        </Button>
    </Box>
    </Grid>
  )
}

export default page