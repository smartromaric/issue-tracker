"use client"
import React,{useEffect} from 'react'
import { TextField,TextArea,Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm,Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm{
  title:string,
  description:string
};



const page = () => {
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<IssueForm>();
  return (
    <form className='max-w-xl space-y-3' 
    onSubmit={handleSubmit(async (data)=>{
     await axios.post("/api/issues/",data)
     router.push('/issues')
    })}>
        <TextField.Root placeholder='Title' {...register('title')}/>
        <Controller
        name="description"
        control={control}
        render={({ field }) => 
          <SimpleMDE placeholder='Description' {...field}/>
        } />
       <Button>Submit new issue</Button>
    </form>
  )
}

export default page