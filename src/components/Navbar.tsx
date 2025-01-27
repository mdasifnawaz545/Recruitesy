"use client"
import { Router } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import Button from './Button'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth'

const Navbar = () => {
    const session = useSession();
    const user = session?.data?.user as User;
    const homeRoute = (user) ? "/home" : "/"
    const router = useRouter();
    return (
        <nav className='bg-transparent border-mywidth border-gray-600 mx-8 mt-2 px-4 text-center text-bold text-2xl rounded-2xl flex items-center justify-between'>

            <div>
                <a href={homeRoute}>
                    <Image src="https://res.cloudinary.com/dpqdgcipi/image/upload/v1737533670/image-removebg-preview_1_gl5lis.png" alt="Recruitesy." width={150} height={20} />
                </a>
            </div>
            <div>
                {

                    (user) ? (
                        <div className='border-mywidth border-gray-600 w-9 h-9 rounded-full flex items-center justify-center relative'>
                            <img className='absolute rounded-full w-8 h-8' src={user.image as string} alt="" />
                        </div>
                    ) : (
                        null
                    )


                }
            </div >

        </nav >
    )
}

export default Navbar