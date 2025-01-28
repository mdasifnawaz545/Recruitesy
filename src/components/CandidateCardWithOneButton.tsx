import React, { useState } from 'react'
import Button from './Button'
import axios from 'axios'

interface functionType {
    // Typesafety in typerscript for function is not for the prototype of the entire function it is only for defining the data types of data which is passed in the arguments or parameter and the return value of the funtion.
    (): void
}

const CandidateCardWithOneButton = ({ name, roll, buttonName = "Take Interview", func = () => { }, ownClass = "" }: { name: string, roll: number, buttonName: string, func: any, ownClass: string }) => {


    // We are here usnig the concept of nextjs is that, call the function or fetch the data in a component where it is used.

    //Take an Interview API call not logic logic will be there inside the route.ts where you are calling to or where the API is redirecting you to.

    



    return (
        <div className='w-full md:flex flex-wrap  duration-200 justify-between items-center p-2 bg-transparent backdrop-blur-lg border-mywidth border-gray-600 rounded-lg drop-shadow-lg hover:shadow-md hover:shadow-blue-400 text-slate-100 text-bold text-md'>
            <div className='flex md:w-1/2 w-full items-center justify-between md:h-10 h-14 px-4'>
                <div className='w-1/2 '>{roll}</div>
                <div className='w-1/2 md:text-start text-end'>{name}</div>

            </div>
            <div className='w-full px-4 md:w-1/2 flex items-center md:justify-end justify-center gap-4'>
                <Button buttonName={buttonName} ownClass={`bg-blue-500  text-[#000] ${ownClass}`} func={func} />
            </div>
        </div>
    )
}

export default CandidateCardWithOneButton