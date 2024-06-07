"use client"
import React from 'react'
import { TextField,TextArea,Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

<SimpleMDE />;
const page = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root placeholder='Title'/>
       <SimpleMDE placeholder='Description'/>
       <Button>Submit new issue</Button>
    </div>
  )
}

export default page