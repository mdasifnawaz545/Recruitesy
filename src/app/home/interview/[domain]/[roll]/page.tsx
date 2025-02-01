"use client"
import Button from '@/components/Button';
import axios, { Axios, AxiosError } from 'axios';
import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import { title } from 'process';
import { useToast } from '@/hooks/use-toast';

interface myParams {
    domain: string,
    roll: string
}

const page = ({ params }: { params: Promise<myParams> }) => {
    const router = useRouter();
    const resolvedParams = use(params);
    const [message, setMessage] = useState("");
    const [oneCandidate, setOneCandidate] = useState<candidate>()
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { toast } = useToast()

    //The initial value of the message should be first fethed from the backend in order to view if already it is present.

    const handleSelected = async () => {

        //call to interview[roll] of current candidate
        try {
       
            const response = await axios.get(`/api/selected/${resolvedParams.roll}`)
            if (response) {
                //Only Success Message will be shown, not redirecting to any other pages as Next Button functionality is going to do the same.
                toast({
                    title: response.data.message,
                    description: `${oneCandidate?.name} is Selected Successfully`
                })
            }

        } catch (error) {
            // Error Message
            //Only Success Message will be shown, not redirecting to any other pages as Next Button functionality is going to do the same.
            toast({
                title: "Not Selected",
                description: "Intenal Server Error",
                variant: "destructive"
            })
        }
    }

    // No need to changing the state it is already handled by the backend that is if user fetches the data of the user, then when backend is going to send the data, along with sending the data it is also changing the state and when we are clicking on the next, next backend will then make the interview running false automatically we do not have to do this form this in frontend part.

    // const changeRunningState = async () => {
    //     await axios.get(`/api/stateChange/${resolvedParams.roll}`)
    // }


    const handleNext = async () => {

        // Handle Next button with a total of two funcitonalities.
        setIsLoading(true);
        const response = await axios.post(`/api/interviewDone/${oneCandidate?.roll}`, {
            message: message
        })

        if (response) {
            // Here we are going to apply a condition is that the second mechanism will only work iff the response of the first funtionality returns successfullt.
            const response = await axios.get(`/api/randomCandidate/${resolvedParams.domain}`)
            if (response.data.status == false) {
                router.push("/home/completed")

            }
            // Success Message with next candidate whose roll is randomly generated but we have called him with its roll number.
            setMessage("");
            setOneCandidate(response.data as candidate)

            setIsLoading(false);

        }

    }

    const fetchCandidate = async () => {
        try {
            const response = await axios.get(`/api/callInterview/${resolvedParams.roll}`)
            setOneCandidate(response.data as candidate)
            
            setIsLoading(false);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCandidate();

    }, [])

    
    return (
        <div className='w-full px-10 text-sm min-h-screen md:flex flex-wrap-reverse max-sm:items-end max-md:mt-4 md:-mt-10 items-center justify-between p-0'>
            <div className='md:w-1/2 w-full flex flex-col items-center justify-between gap-4'>
                <div className='w-full text-slate-100 h-full bg-transparent backdrop-blur-lg border-mywidth border-gray-600 rounded-lg p-4 leading-10 drop-shadow-lg text-sm'>
                    {isLoading ? (
                        <>
                            <h1 className='sm:flex items-center'>Candidate Name - <span className="block w-48  sm:ml-4 h-5 bg-gray-600 rounded animate-pulse"></span></h1>
                            <h1 className='sm:flex items-center' >Candidate Roll - <span className="block w-24 h-5 bg-gray-600 rounded animate-pulse  sm:ml-4 "></span></h1>
                            <h1 className='sm:flex items-center' >Candidate Branch - <span className="block w-36 h-5 bg-gray-600 rounded animate-pulse  sm:ml-4 "></span></h1>
                            <h1 className='sm:flex items-center' >Studying Year - <span className="block w-12 h-5 bg-gray-600 rounded animate-pulse  sm:ml-4 "></span></h1>
                            <h1 className='sm:flex items-center' >Domain Applied - <span className="block w-36 h-5 bg-gray-600 rounded animate-pulse  sm:ml-4 "></span></h1>
                            <h1 className='sm:flex items-center' >Resume Link - <span className="block w-48 h-5 bg-gray-600 rounded animate-pulse  sm:ml-4 "></span></h1>
                            <h1 className='sm:flex items-center' >LinkedIn Link - <span className="block w-48 h-5 bg-gray-600 rounded animate-pulse  sm:ml-4 "></span></h1>
                            <h1 className='sm:flex items-center' >GitHub Link - <span className="block w-48 h-5 bg-gray-600 rounded animate-pulse  sm:ml-4 "></span></h1>
                        </>
                    ) : (
                        <>
                            <h1>Candidate Name - <b>{oneCandidate?.name}</b></h1>
                            <h1>Candidate Roll - <b>{oneCandidate?.roll}</b></h1>
                            <h1>Candidate Branch - <b>{oneCandidate?.branch}</b></h1>
                            <h1>Studying Year - <b>{oneCandidate?.yearOfStudy}</b></h1>
                            <h1>Domain Applied - <b>{oneCandidate?.domain}</b></h1>
                            <h1>Resume Link - <Link target='_blank' className='text-blue-500' href={`${oneCandidate?.links?.resume}`}>Resume Link</Link></h1>
                            <h1>Linkedin Link - <Link target='_blank' className="text-blue-500" href={`${oneCandidate?.links?.linkedin}`}>Linkedin Link</Link></h1>
                            <h1>Github Link - <Link target='_blank' className="text-blue-500" href={`${oneCandidate?.links?.github}`}>Github Link</Link></h1>
                        </>
                    )}
                </div>
                <div className='w-full p-2 flex items-center justify-evenly'>
                    <Button buttonName={"Selected"} ownClass={"bg-green-500  text-[#000]"} func={handleSelected} />
                    <Button buttonName={"Next"} ownClass={"bg-blue-500 text-[#000] px-8"} func={handleNext} />
                </div>
            </div>
            <div className='md:w-1/2 w-full md:m-0 my-2 p-0'>

                <textarea onChange={(e) => { setMessage(e.target.value) }} className='w-full rounded-lg outline-none h-full md:scale-90  duration-300 p-4 text-slate-100  bg-transparent border-mywidth  shadow-blue-200 shadow-md hover:shadow-lg hover:shadow-blue-300 border-gray-600' value={message} placeholder='1. Write Something about the Candidate' name="message" id="message" cols={20} rows={20}></textarea>


            </div>

        </div>
    )
}

export default page