"use client"
import CandidateCardWithOneButton from '@/components/CandidateCardWithOneButton'
import LoadingSpinner from '@/components/LoadingSpinner'
import Search from '@/components/Search'
import axios from 'axios'
import Link from 'next/link'
import React, { use, useState } from 'react'
import { useEffect } from 'react'
interface params {
    domain: string
}

const page = ({ params }: { params: Promise<params> }) => {

    const [allCandidate, setAllCandidate] = useState<candidate[]>([]);
    const resolvedParams = use(params)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");

    const fetchSelectedCandidate = async () => {
        try {
            const response = await axios.get(`/api/interviewed/${resolvedParams.domain}`)
            if (response) {
                setAllCandidate(response.data as candidate[]);
                setIsLoading(false);

            }
            else {
                setMessage("Data Not Found");
                setIsLoading(false);
            }
        } catch (error) {
            //Error Message
        }

    }

    const handleView = async () => {

    }

    useEffect(() => {
        fetchSelectedCandidate();
    }, [])


    // With one button we have used here link was used.

    return (
        <div className='min-h-screen  text-white flex flex-col gap-8 items-center justify-start mx-8 mt-8'>
            <div className='w-full flex flex-col items-center justify-center'>
                <div className='w-full flex items-center md:justify-center justify-evenly'>
                    <h1 className='text-2xl text-bold'>ALL {resolvedParams.domain.toUpperCase()} {"Interviewed Candidates".toUpperCase()}</h1>
                    <div className='w-full flex items-center p-0 m-0 text-center justify-center'>
                        <Search />
                    </div>
                </div>

            </div>

            <div className='w-full flex flex-col flex-wrap gap-2'>
                {
                    (isLoading) ? (<div className='w-full h-1/2 flex items-center justify-center'><LoadingSpinner /></div>) : ((allCandidate) ? (allCandidate.map((el: candidate, index: number) => (<Link href={`/home/interviewPageView/${el.roll}`} key={index} ><CandidateCardWithOneButton buttonName={"View"} func={handleView()} name={el.name} roll={el.roll as unknown as number} ownClass={''} /></Link>))) : (message))


                }
            </div>

        </div>
    )
}

export default page