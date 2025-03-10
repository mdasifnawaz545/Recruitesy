"use client"
import CandidateCardWithOneButton from '@/components/CandidateCardWithOneButton'
import LoadingSpinner from '@/components/LoadingSpinner'
import Search from '@/components/SearchAttendance'
import axios from 'axios'
import { Divide } from 'lucide-react'
import { redirect } from 'next/navigation'
import React, { use, useState } from 'react'
import { useEffect } from 'react'
interface params {
    domain: string
}

const page = ({ params }: { params: Promise<params> }) => {

    const [allCandidate, setAllCandidate] = useState<candidate[]>([]);
    const resolvedParams = use(params)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fetchSelectedCandidate = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/api/getSelected/${resolvedParams.domain}`)
            if (response) {
                setAllCandidate(response.data as candidate[])
                setIsLoading(false);

            }
            else {
                //Message
            }
        } catch (error) {
            //Error Message
        }

    }

    useEffect(() => {
        fetchSelectedCandidate();
    }, []);

    const handleInterviewPage = (roll: string) => {
        redirect(`/home/view/${roll}`)
    }


    return (
        <div className='min-h-screen  text-white flex flex-col gap-8 items-center justify-start mx-8 mt-8'>
            <div className='w-full flex flex-col items-center justify-center'>
                <div className='w-full flex flex-wrap items-center justify-start'>
                    <h1 className='text-lg text-bold'>ALL {resolvedParams.domain.toUpperCase()} {"Selected Candidates".toUpperCase()}</h1>
                    {/* <div className='mt-4'>
                    <Search />
                    </div> */}
                </div>

            </div>
            <div className='w-full flex flex-col flex-wrap gap-2 min-h-screen'>


                {
                    (isLoading) ? (<div className='w-full min-h-screen flex items-start justify-center'><LoadingSpinner /></div>) : (
                        <>

                            {
                                allCandidate.map((el: candidate, index: number) => (<CandidateCardWithOneButton buttonName={"View"} name={el.name} roll={el.roll as unknown as number} func={() => { handleInterviewPage(el.roll) }} ownClass={''} />))
                            }
                        </>)

                }
            </div>

        </div>
    )
}

export default page