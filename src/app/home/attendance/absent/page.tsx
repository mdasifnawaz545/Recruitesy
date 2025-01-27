"use client"
import Button from '@/components/Button'
import CandidateCard from '@/components/CandidateCard'
import CandidateCardWithOneButton from '@/components/CandidateCardWithOneButton'
import LoadingSpinner from '@/components/LoadingSpinner'
import Search from '@/components/Search'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import Link from 'next/link'
import React, { Suspense, useCallback, useEffect, useState } from 'react'

const page = () => {

    const [allCandidate, setAllCandidate] = useState<candidate[]>([]);
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const fetchAllCandidate = useCallback(async (): Promise<any> => {
        setIsLoading(true);
        try {

            const response = await axios.get("/api/getCandidate");
            console.log("My Response")
            console.log("Frontend Response - ", response)
            if (response) {
                setAllCandidate(response.data as unknown as candidate[])
                setIsLoading(false);

            }
        } catch (error) {
            //Flash messages are there
        }

        //useCallback concept here

    }, [])



    const handlePresent = async () => {
        try {
            const response = await axios.get(`/api/attendance/present/roll`)
            if (response) {
                // setPresent(true)
                toast({
                    title: "Success",
                    description: "Marked as Present"
                })
            }
            else {
                //Problem
            }
        } catch (error) {
            //Problem while making as present
        }

    }



    useEffect(() => {
        fetchAllCandidate();

    }, [])

    console.log(allCandidate)

    // Candidate card with one button impletation not two because there are two button inside that card and an inbuilt function is also attached with them.

    return (
        <div className='min-h-screen  text-sm flex text-white flex-col gap-8 items-center justify-start mx-8 m-8'>
            <div className='w-full flex flex-col items-center justify-start'>
                <div className='w-full md:flex flex-wrap items-center flex-col justify-evenly gap-4'>
                    <div className='md:flex items-center md:w-full md:justify-between mx-4'>
                        <div>
                            <h1 className='text-lg text-bold'>ALL ABSENT CANDIDATES</h1>
                        </div>

                    </div>
                    <div className='my-4 md:my-0 flex items-center justify-center'></div>
                    <div>
                        <Search />
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-col flex-wrap gap-2'>
                {
                    (isLoading) ? (<LoadingSpinner />) : (
                        <div className='flex flex-col gap-2 w-full h-full'>
                            {

                                allCandidate.map((el: candidate, index: number) => (<CandidateCardWithOneButton
                                    name={el.name} roll={el.roll as unknown as number} buttonName={'Mark as Present'} func={handlePresent} ownClass={''} />))
                            }
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default page