import { NextResponse } from "next/server";
import {z} from "zod";
import prisma from "@/prisma/client";
import { CreateIssueSchema } from "@/app/validationSchema";



export async function POST (request:NextResponse){
    const body = await request.json()
    const validation = CreateIssueSchema.safeParse(body)
    if (!validation.success) {
        return NextResponse.json(validation.error.format(),{status:400})
    }
    const newIssue = await prisma.issue.create({
        data:{title:body.title,description:body.description}
    })
    return NextResponse.json(newIssue,{status:201})
    
}