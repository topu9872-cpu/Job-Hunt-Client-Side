'use server'
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export const getUsers=async()=>{
    const session=await auth.api.getSession({
        headers: await headers()
    })
    console.log(session.user)
    return session.user
}