"use client"
import Button from '@/components/Button'
import React, { Suspense, useEffect } from 'react'
import Card from '@/components/Card'
import { Domains } from '@/constants/domains'
import CandidateCard from '@/components/CandidateCard'
import { signOut, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import DBConnection from '@/lib/database'
import Search from '@/components/SearchAttendance'
import { User } from 'next-auth'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

const page = () => {
    const session = useSession();
   
    const currentUser: User = session?.data?.user as User;
    const username: string = currentUser?.name as string;
    //const session=useSession();
    

    const handleFormLink = () => {
        //Use origin of the deployed one once it is deployed.
        let clip = "http://localhost:3000/home/formLink"
        window.navigator.clipboard.writeText(clip);
        toast({
            title: "Copied",
            description: "Link is Copied to the Clipboard"
        })
    }


    const router = useRouter();
    const { toast } = useToast();

    //no need as we are using link for redirecting to this route.
    // const handleAttendance = () => {
    //     router.push("/home/attendance")
    // }

    const handleLogOut = async () => {
        await signOut({ callbackUrl: '/signin' })
    }


    const user = {
        user: {
            username: "Md Asif Nawaz"
        }
    }
    return (
        <div className='w-full min-h-screen text-white flex flex-col text-sm gap-4 items-center justify-start py-2'>
            <div className='md:px-0 w-full flex-col'>
                <h1 className='text-md py-4 sm:text-center mx-8 tracking-widest border-b-mywidth rounded-lg border-gray-600'>Welcome, {(username) || "Md Asif Nawaz"} to Recruitesy.</h1>
                <div className='flex py-1'></div>
                <div className='md:flex gap-4 max-[767px]:px-8 max-md:px-8 w-full flex-wrap items-center justify-between '>
                    <div className='flex items-center mt-2 max-sm:mb-2 justify-between md:pl-8 md:justify-center'>
                        <h1 className='text-lg text-bold text-center'>ALL DOMAINS</h1>
                    </div>
                    <div className='flex justify-center items-center gap-8'>
                    </div>
                    <div className='max-sm:flex-col md:flex md:gap-4 max-sm:gap-2 items-center justify-center md:mr-11'>
                        <div className='flex items-center justify-center max-md:mb-3'>
                            <Button buttonName={"Copy Form Link"} ownClass={'bg-green-500 hover:shadow-black'} func={handleFormLink} />
                        </div>
                        {/*
                        Previously there was a button and inside that button a handleattendance funtion were there calling which redirect to a particular page but in order to optimize the code we have added a link component to the button so that it will reload the page in advanced insted of waiting to the request coming after clicking the button and then by using router.push redircting to the new page.
                        */}
                        <div className='flex items-center justify-center  max-md:mb-3'>


                            <Link href={"/home/attendance"}><button className={`bg-slate-50 scale-110 text-[#000] py-1 px-3 rounded-md flex items-center justify-center hover:drop-shadow-lg hover:opacity-90 `}>Attendance</button></Link>
                        </div>
                        <div className='flex items-center justify-center'>
                            <button className={`bg-red-500 scale-110 text-slate-50 py-1 px-3 rounded-md flex items-center justify-center hover:drop-shadow-lg hover:opacity-90 `} onClick={handleLogOut}>Log out</button>
                        </div>
                    </div>

                </div>
            </div>
            <div className='flex items-center justify-center gap-4 flex-wrap mt-4 w-full max-sm:gap-2'>

                {
                    Domains.map((el: domainObject, index: number) => (<Card key={index} domainName={el.domain} logo={el.logo} dbDomainName={el.dbDomainName} />))
                }

            </div>

        </div>
    )
}

export default page