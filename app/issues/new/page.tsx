"use client"
import React,{useState} from 'react'
import { TextField,TextArea,Button,Callout,Text } from '@radix-ui/themes'
import "easymde/dist/easymde.min.css";
import { useForm,Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateIssueSchema } from '@/app/validationSchema';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import dynamic from 'next/dynamic';
import delay from 'delay';

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