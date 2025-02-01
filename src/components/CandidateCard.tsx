"use client"
import React, { useEffect, useState } from 'react'
import Button from './Button'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast';

const CandidateCard = ({ name, roll }: { name: string, roll: string, }) => {

    const { toast } = useToast();
    const [present, setPresent] = useState(false);
    const [absent, setAbsent] = useState(true);

    // We are here usnig the concept of nextjs is that, call the function or fetch the data in a component where it is used.

    //Present API call not logic logic will be there inside the route.ts where you are calling to or where the API is redirecting you to.

    const handlePresent = async () => {
        try {
            const response = await axios.get(`/api/attendance/present/${roll}`)
            if (response) {
                setPresent(true)
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

    //Absent API call not logic logic will be there inside the route.ts where you are calling to or where the API is redirecting you to.

    const handleAbsent = async () => {
        try {
            const response = await axios.get(`/api/attendace/absent/${roll}`)
            if (response) {
                setAbsent(false);
            }
            else {
                //Problem
            }
        } catch (error) {
            //Problem while making as present
        }
    }

    //Take an Interview API call not logic logic will be there inside the route.ts where you are calling to or where the API is redirecting you to.

    const handleToast = async () => {
        toast({
            title: "Marked as Present",
            description: "Already Present",
            variant: "destructive"
        })
    }

    const handleEachPresent= async () => {
            const response=await axios.get(`/api/searchCandidate/${roll}`)
            if(response){
                setPresent(response.data.present);
            }
    }
    useEffect(()=>{
        handleEachPresent();
    },[present])

    return (
        <div className='w-full md:flex flex-wrap  duration-200 justify-between items-center p-2 bg-transparent backdrop-blur-lg border-mywidth border-gray-600 rounded-lg drop-shadow-sm hover:shadow-md hover:shadow-blue-400 text-slate-100 text-bold text-md'>
            <div className='flex w-full md:w-1/2 md:h-10 h-12 items-center justify-between px-4'>
                <div className='w-1/2 '>{roll}</div>
                <div className='w-1/2 text-end md:text-start'>{name}</div>

            </div>
            <div className='w-full md:w-1/2 flex items-center justify-center md:justify-end gap-4 md:px-4'>
                {
                    (present) ? (<Button buttonName={"Marked as Present"} ownClass={"bg-blue-400"} func={handleToast} />) : (

                        <div className='flex items-center justify-end gap-4'>
                            <Button buttonName={"Present"} ownClass={`bg-green-500  text-white`} func={handlePresent} />
                        </div>

                    )
                }

            </div>
        </div>
    )
}

export default CandidateCard