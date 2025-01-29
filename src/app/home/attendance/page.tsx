"use client"
import Button from '@/components/Button'
import CandidateCard from '@/components/CandidateCard'
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


  // const handlePresenties = async () => {

  // }


  // const handleAbsenties = async () => {

  // }

  useEffect(() => {
    fetchAllCandidate();

  }, [])

  console.log(allCandidate)

  return (
    <div className='min-h-screen text-sm text-white flex-col md:gap-8 items-center  justify-start gap-2 mx-8 m-8'>
      <div className='w-full flex flex-col items-center justify-start'>
        <div className='w-full md:flex flex-wrap max-md:items-center flex-col md:justify-evenly justify-center gap-4'>
          <div className='md:flex items-center md:w-full md:justify-between mx-4'>
            <div>
              <h1 className='text-lg text-bold'>ALL CANDIDATES</h1>
            </div>
            <div className='flex md:w-72 items-center justify-around mt-2'>
              <Link href={"/home/attendance/absent"}><Button buttonName={"Absenties"} ownClass={"bg-red-500 text-white"} func={() => { }} /></Link>
              <Link href={"/home/attendance/present"}> <Button buttonName={"Presenties"} ownClass={"bg-green-500 text-white"} func={() => { }} /></Link>
            </div>
          </div>
          <div className='my-2 max-sm:my-0 md:my-0 flex items-center justify-center'></div>
          <div className='my-2 md:my-0 flex items-center justify-center'></div>
          <div>
            <Search />
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col flex-wrap gap-2 pt-4'>
        {
          (isLoading) ? (<LoadingSpinner />) : (
            <div className='flex flex-col gap-2 w-full h-full'>
              {

                allCandidate.map((el: candidate, index: number) => (<CandidateCard
                  name={el.name} roll={el.roll} />))
              }
            </div>
          )
        }
      </div>

    </div>
  )
}

export default page