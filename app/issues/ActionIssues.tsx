import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const ActionIssues = () => {
  return (
    <div className='text-black mb-3'>
    <Button variant='soft'> <Link href={"/issues/new"}>New Issue</Link> </Button>
    </div>
  )
}

export default ActionIssues