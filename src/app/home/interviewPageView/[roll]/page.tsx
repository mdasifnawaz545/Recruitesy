"use client"
import Button from '@/components/Button';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { boolean } from 'zod'
import { useParams } from 'next/navigation';

type params = {
    roll: string
}

const Page = ({ params }: { params: Promise<params> }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [nextLoading, setnextLoading] = useState<boolean>(true);
    const [selectedLoading, setselectedLoading] = useState<boolean>(true);
    const [oneCandidate, setOneCandidate] = useState<candidate>()
    const routers = useRouter();
    //@ts-ignore
    const { roll } = React.use(params);
    const fetchView = async () => {
        const response = await axios.get(`/api/searchCandidate/${roll}`)
        if (response) {
            setOneCandidate(response.data as candidate)
            setIsLoading(false);
        }
    }
    const [message, setMessage] = useState<string>("");
    const router = useRouter();


    const handleSelected = async () => {

        //call to interview[roll] of current candidate
        try {
            const response = await axios.get(`/api/selected/${oneCandidate?.roll}`)
            if (response) {
                //Only Success Message will be shown, not redirecting to any other pages as Next Button functionality is going to do the same.
            }

        } catch (error) {
            // Error Message
        }
    }

    const handleNext = async () => {

        // Handle Next button with a total of two funcitonalities.
        const url = `/api/getInterviewdOneCandidate/${oneCandidate?.domain}/${oneCandidate?.roll}`;
        try {
            const response = await axios.get(url);
            if (response) {
                setOneCandidate(response.data as candidate);
            }
            else {
                console.log("Error")

            }

        } catch (error) {
            console.log("Error")
        }


    }


    useEffect(() => {
        fetchView();
    }, [])

    return (
        <div className='w-full px-10 text-sm min-h-screen md:flex flex-wrap-reverse items-center justify-between p-0'>
            <div className='md:w-1/2 w-full flex flex-col items-center justify-between gap-4'>
                <div className='w-full text-slate-100 h-full bg-transparent backdrop-blur-lg border-mywidth border-gray-600 rounded-lg p-4 leading-10 drop-shadow-lg text-sm'>

                    <>
                        <h1>Candidate Name - <span className="block w-48 h-5 bg-gray-600 rounded animate-pulse"></span></h1>
                        <h1>Candidate Roll - <span className="block w-24 h-5 bg-gray-600 rounded animate-pulse"></span></h1>
                        <h1>Candidate Branch - <span className="block w-36 h-5 bg-gray-600 rounded animate-pulse"></span></h1>
                        <h1>Studying Year - <span className="block w-12 h-5 bg-gray-600 rounded animate-pulse"></span></h1>
                        <h1>Domain Applied - <span className="block w-36 h-5 bg-gray-600 rounded animate-pulse"></span></h1>
                        <h1>Resume Link - <span className="block w-48 h-5 bg-gray-600 rounded animate-pulse"></span></h1>
                        <h1>LinkedIn Link - <span className="block w-48 h-5 bg-gray-600 rounded animate-pulse"></span></h1>
                        <h1>GitHub Link - <span className="block w-48 h-5 bg-gray-600 rounded animate-pulse"></span></h1>
                    </>

                </div>
                <div className='w-full p-2 flex items-center justify-evenly'>
                    <Button buttonName={"Selected"} ownClass={`bg-green-500 text-slate-50 `} func={handleSelected} />
                    <Button buttonName={"Next"} ownClass={"bg-blue-500 text-white px-8"} func={handleNext} />
                </div>
            </div>
            <div className='md:w-1/2 w-full md:m-0 my-2 p-0'>

                <textarea className='w-full rounded-lg outline-none h-full md:scale-90  duration-300 p-4 text-slate-100  bg-transparent border-mywidth  shadow-blue-200 shadow-md hover:shadow-lg hover:shadow-blue-300 border-gray-600' value={oneCandidate?.message} placeholder='1. Write Something about the Candidate' name="message" id="message" cols={20} rows={20}></textarea>


            </div>

        </div>
    )
}



export default Page;