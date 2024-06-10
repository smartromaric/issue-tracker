"use client"
import React,{useState} from 'react'
import { TextField,TextArea,Button,Callout,Text } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm,Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateIssueSchema } from '@/app/validationSchema';


type IssueForm = Zod.infer<typeof CreateIssueSchema>


const page = () => {
  const router = useRouter();
  const [error,setError] = useState("")
  const { register, handleSubmit, control,formState:{errors} } = useForm<IssueForm>({resolver:zodResolver(CreateIssueSchema)});
  return (
    <div className='max-w-xl'>
    {error && <Callout.Root color='red' className='mb-5'>
      <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
    <form className='space-y-3' 
    onSubmit={handleSubmit(async (data)=>{
      try {
        await axios.post("/api/issues/",data)
        router.push('/issues')
      } catch (error) {
        setError("An unexcepted error occurred.")
        console.log(error)
      }
    })}>
      {errors.title?.message && <Text as='p' color='red'>{errors.title.message} </Text>}
        <TextField.Root placeholder='Title' {...register('title')}/>
        {errors.description?.message && <Text as='p' color='red'>{errors.description.message} </Text>}
        <Controller
        name="description"
        control={control}
        render={({ field }) => 
          <SimpleMDE placeholder='Description' {...field}/>
        } />
       <Button>Submit new issue</Button>

    </form>
</div>
  )
}

export default page