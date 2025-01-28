import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'

interface functionType {
    (): void
}

const Button = ({ buttonName, ownClass, func = () => {} }: { buttonName: string, ownClass: string, func: functionType }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
        <button onClick={() => {
            setIsLoading((prev) => (prev = true))
            func();
            setIsLoading((prev) => (prev = false))

        }} className={` p-1 px-4 scale-105 rounded-md flex items-center justify-center hover:drop-shadow-lg hover:opacity-90 bg-slate-50 text-[#000]`}>{buttonName} {(isLoading ? (<Loader2 className='ml-2 text-gray-950 animate-spin duration-300' />) : "")}</button>
    )
}

export default Button