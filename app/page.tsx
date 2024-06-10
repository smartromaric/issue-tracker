
import { Button,Table } from '@radix-ui/themes'
import Link from 'next/link'
import prisma from '@/prisma/client'
export default async function Home() {
  const issues = await prisma.issue.findMany()

  return (
    <div className='text-black space-y-3'>
    <Button variant='soft'> <Link href={"/issues/new"}>New Issue</Link> </Button>
      <Table.Root variant='surface'>
    <Table.Header>
    <Table.Row>
      <Table.ColumnHeaderCell>issues</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell  className='hidden md:table-cell'>Create at </Table.ColumnHeaderCell>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    {issues.map((issue) => (
      <Table.Row key={issue.id}>
      <Table.Cell>{issue.title}
        <div className='block md:hidden'>{issue.status}</div>
      </Table.Cell>
      <Table.Cell  className='hidden md:table-cell'>{issue.status}</Table.Cell>
      <Table.Cell  className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
   </Table.Row>
   ))}
   </Table.Body>
   </Table.Root>
    </div>
  )
}
