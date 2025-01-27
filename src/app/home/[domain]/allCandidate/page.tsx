"use client"
import Button from '@/components/Button'
import CandidateCard from '@/components/CandidateCard'
import CandidateCardWithOneButton from '@/components/CandidateCardWithOneButton'
import LoadingSpinner from '@/components/LoadingSpinner'
import Search from '@/components/Search'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'

interface params {
  domain: string,
}

const page = ({ params }: { params: Promise<params> }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const resolvedParams = use(params);
  const [allCandidate, setAllCandidate] = useState<candidate[]>([])

  const domain: string = resolvedParams.domain;

  const handleDomainSpecificCandidate = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/candidate/${domain}`)
      if (response) {
        setAllCandidate(response.data as candidate[])
        setIsLoading(false);

      }
      else {
        //Problem
      }
    } catch (error) {
      //Problem while making as present
    }
  }

  useEffect(() => {
    handleDomainSpecificCandidate();
  }, [])


  const handleSelected = async () => {
    router.push(`/home/selected/${domain}`)
  }

  const handleInterviewed = async () => {
    router.push(`/home/interviewed/${domain}`)
  }

  return (
    <div className='min-h-screen text-sm text-white flex flex-col gap-8 items-center justify-start mx-8 mt-8'>
      <div className='w-full flex flex-col items-center justify-evenly'>
        <div className='w-full flex flex-wrap items-center md:justify-between justify-evenly gap-4'>
          <h1 className='text-lg text-bold'>ALL {domain.toUpperCase()} {"Present Candidates".toUpperCase()}</h1>
          <Button buttonName={"Selected Candidates"} ownClass={"bg-green-500 text-white"} func={handleSelected} />
          <Button buttonName={"Interviewed Candidates"} ownClass={"bg-blue-500 text-white"} func={handleInterviewed} />

          <div className='w-full flex items-center justify-center' >
            <Search />
          </div>
        </div>

      </div>
      <div className='w-full min-h-full flex flex-col flex-wrap gap-4'>

        {
          (isLoading) ? (<div className='w-full h-1/2 flex items-center justify-center'><LoadingSpinner /></div>) : (
            <div className='flex-col gap-4 min-h-screen'>
              {
                allCandidate.map((el: candidate, index: number) => (<a href={`/home/interview/${el.domain}/${el.roll}`} key={index} ><CandidateCardWithOneButton
                  name={el.name} roll={el.roll as unknown as number} buttonName={"Take Interview"} func={()=>{}} ownClass={''} /></a>))
              }
            </div>
          )
        }



      </div>

    </div>
  )

}
export default page

