import React, { useState } from 'react'
import Button from './Button'
import CandidateCard from './CandidateCard'
import axios from 'axios'
import { FaSearch } from "react-icons/fa";


const Search = () => {
    const [searchValue, setSearchValue] = useState("")
    const [candidate, setCandidate] = useState<candidate>();

    const handleSearch = async () => {
        try{
            const response = await axios.get(`/api/searchCandidate/${searchValue}`);
    
            if (response) {
                setCandidate(response.data as unknown as candidate);
                //Success Toast Message
            }
            else { 
                // User Not found
            }
        }catch(error){
            console.log("Request not proceed")
        }
    }
    return (
        <div className='flex text-sm w-full max-sm:flex-col items-center justify-center gap-2'>
            <div className='md:flex gap-4 w-full items-center justify-center'>
                <div className=''>
                    <input type="text" placeholder='Search by Roll No' className='  bg-transparent border-mywidth border-gray-600 text-white rounded-md px-2 py-2 drop-shadow-lg hover:shadow-md md:w-[725px] hover:shadow-blue-400 duration-200 outline-gray-600' value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} />
                </div>
                <div className=''>
                    <button className='bg-white scale-110 text-gray-950 py-[6px] px-4 rounded-md text-sm flex items-center justify-center hover:drop-shadow-lg hover:opacity-90' onClick={() => { handleSearch() }} ><FaSearch />&nbsp;&nbsp;Search
                    </button>
                </div>
            </div>
            <div className='w-full' >
                {
                    (candidate) ? (<CandidateCard name={candidate.name} roll={candidate.roll} />) : null
                }

            </div>
        </div>
    )
}

export default Search