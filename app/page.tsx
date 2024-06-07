
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
export default function Home() {
  return (
    <div className='text-black'>
      lol test 1
    <Button variant='soft'> <Link href={"/issues/new"}>New Issue</Link> </Button>
    </div>
  )
}
