"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";


export default async function AddForumQuestion(formData:FormData, ){

    const userSession =  await auth()
    if(!userSession || !userSession.user){
        return {
            type:"error",
            message:"Please login to submit a question"
        }
    }

    try {
        const title = formData.get('title') as string
        const content = formData.get('question') as string
        const tags = (formData.get('tags') as string).split(',').map(tag => tag.trim())

        if (!title || !content || tags.length === 0) {
          return { error: "Title, tags and question content are required." }
        }

        console.log(title, content, tags)
        await db.forumQuestion.create({
            data:{
                title,
                content,
                tags,
                authorId:userSession.user.id as string
            }
        })

        revalidatePath("/community/forum")

        return {
            type:"success",
            message:"Question submitted successfully"
        }


    } catch (error) {
        console.error("Failed to submit question:", error)
        return { error: "Failed to submit question. Please try again." }
    }
}
