"use client"
import { ErrorMessage,Spinner } from '@/app/components';
import { CreateIssueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import delay from 'delay';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const SimpleMDE = dynamic(()=>import("react-simplemde-editor"),{ssr:false})

type IssueForm = Zod.infer<typeof CreateIssueSchema>


const page = async () => {
  const router = useRouter();
  const [error,setError] = useState("")
  const [isSubmitting,setSubmitting] = useState(false)
  const { register, handleSubmit, control,formState:{errors} } = useForm<IssueForm>({resolver:zodResolver(CreateIssueSchema)});
    
  const submit = handleSubmit(async (data)=>{
      try {
        setSubmitting(true)
        await axios.post("/api/issues/",data)
        router.push('/issues')
      } catch (error) {
        setSubmitting(false)
        setError("An unexcepted error occurred.")
        console.log(error)
      }
    })
    await delay(2000);
  return (
    <div className='max-w-xl'>
    {error && <Callout.Root color='red' className='mb-5'>
      <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
    <form className='space-y-3' 
    onSubmit={submit}>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root placeholder='Title' {...register('title')}/>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller
        name="description"
        control={control}
        render={({ field }) => 
          <SimpleMDE placeholder='Description' {...field}/>
        } />
       <Button disabled={isSubmitting}>Submit new issue {isSubmitting && <Spinner/>}  </Button>
       

    </form>
</div>
  )
}

export default page