import {Table } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import IssuesStatusBadge from '../components/IssuesStatusBadge'
import ActionIssues from './ActionIssues'
import delay from 'delay';

const IssuesPages = async () => {
  const issues = await prisma.issue.findMany()
  await delay(2000)
  return (
    <>
    <ActionIssues/>
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
        <div className='block md:hidden'><IssuesStatusBadge status={issue.status}/></div>
      </Table.Cell>
      <Table.Cell  className='hidden md:table-cell'><IssuesStatusBadge status={issue.status}/></Table.Cell>
      <Table.Cell  className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
   </Table.Row>
   ))}
   </Table.Body>
   </Table.Root>
   </>
  )
}

export default IssuesPages