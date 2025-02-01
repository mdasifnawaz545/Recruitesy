import React, { useState } from 'react'
import Button from './Button'
import CandidateCard from './CandidateCard'
import axios from 'axios'
import { FaSearch } from "react-icons/fa";
import { Tilt_Neon } from 'next/font/google';
import { Description } from '@radix-ui/react-toast';
import { useToast } from '@/hooks/use-toast';
import { RxCross2 } from "react-icons/rx";

const Search = () => {
    const [searchValue, setSearchValue] = useState("")
    const [candidate, setCandidate] = useState<candidate>();
    const { toast } = useToast()
    const obj = {
        message: "Not found",
        status: false
    }
    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/searchCandidate/${searchValue}`);
      
            if (response.data.status === false) {
                toast({
                    title: `Candidate not found`,
                    description: "Candidate Not Found Successfully",
                    variant: "destructive"
                })
            }
            else {
                setCandidate(response.data as unknown as candidate);
                toast({
                    title: `Candidate found`,
                    description: "Candidate Found Successfully"
                })

            }
        } catch (error) {
            console.error("Request not proceed")
        }

    }
    const handleRemove = () => {
        setCandidate(undefined);
    }
    return (
        <div className='flex-col text-sm w-full max-sm:flex-col items-center justify-center gap-2'>
            <div className='md:flex max-sm:flex-col gap-4 w-full items-center justify-center'>
                <div className='flex items-center justify-center'>
                    <input type="text" placeholder='Search by Roll No' className='bg-transparent border-mywidth border-gray-600 text-white rounded-md px-2 py-2 drop-shadow-lg hover:shadow-md lg:w-[725px] md:w-[570px] sm:w-[350px] w-[300px] hover:shadow-blue-400 duration-200 outline-gray-600' value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} />
                </div>
                <div className='flex max-sm:flex-col items-center justify-center max-sm:mt-2'>
                    <button className='bg-white scale-110 text-gray-950 py-[6px] px-4 rounded-md text-sm flex items-center justify-center hover:drop-shadow-lg hover:opacity-90' onClick={() => { handleSearch() }} ><FaSearch />&nbsp;&nbsp;Search
                    </button>
                </div>
            </div>
            <div className='w-full my-6' >
                {
                    (candidate) ?
                        (
                            <div className='w-full my-2 flex items-center justify-between'>
                                <CandidateCard name={candidate.name} roll={candidate.roll} />
                                <button onClick={() => { handleRemove() }} className='hover:shadow-md hover:shadow-blue-400 border-mywidth border-gray-600 hover:duration-200 ml-2 rounded-lg p-1'><RxCross2 /></button>
                            </div>

                        ) : null


                }
            </div>
        </div >
    )
}

export default Search