"use client"
import Button from '@/components/Button'
import CandidateCard from '@/components/CandidateCard'
import CandidateCardWithOneButton from '@/components/CandidateCardWithOneButton'
import LoadingSpinner from '@/components/LoadingSpinner'
import Search from '@/components/SearchAttendance'
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

      const response = await axios.get("/api/attendies/presenties");
   
      if (response) {
        setAllCandidate(response.data as unknown as candidate[])
        setIsLoading(false);

      }
    } catch (error) {
      //Flash messages are there
    }

    //useCallback concept here

  }, [])
  const [random, setRandom] = useState<boolean>(false); // it is only used to re-render the page whenever the handlePresent function is being called.


  const handleAbsent = async (roll: string) => {
    try {
      const response = await axios.get(`/api/attendance/absent/${roll}`)
      if (response) {
        toast({
          title: "Marked as Present",
          description: `${roll} is now marked as present`
        })
        setRandom(true);
      }
      else {
        toast({
          title: "Not Marked as Formed",
          description: `${roll} is not marked as present`
        })
      }
    } catch (error) {
      //Problem while making as present
    }
  }

  useEffect(() => {
    fetchAllCandidate();

  }, [random])



  return (
    <div className='min-h-screen  text-sm flex text-white flex-col gap-8 items-center justify-start mx-8 m-4 mb-2'>
      <div className='w-full flex flex-col items-center justify-start'>
        <div className='w-full md:flex flex-wrap items-center flex-col justify-evenly gap-4'>
          <div className='md:flex items-center md:w-full md:justify-between mx-4'>
            <div>
              <h1 className='text-lg text-bold'>ALL PRESENT CANDIDATES</h1>
            </div>

          </div>
          {/* <div className='my-4 md:my-0 flex items-center justify-center'></div>
          <div>
            <Search />
          </div> */}
        </div>
      </div>
      <div className='w-full flex flex-col flex-wrap gap-2'>
        {
          (isLoading) ? (<LoadingSpinner />) : (
            <div className='flex flex-col gap-2 w-full h-full'>
              {

                allCandidate.map((el: candidate, index: number) => (<CandidateCardWithOneButton
                  name={el.name} roll={el.roll as unknown as number} buttonName={'Mark as Absent'} func={() => { handleAbsent(el.roll) }} ownClass={'bg-red-500'} />))
              }
            </div>
          )
        }
      </div>

    </div>
  )
}

export default page