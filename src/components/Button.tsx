import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'

interface functionType {
    (): void
}

const Button = ({ buttonName, ownClass, func = () => (console.log("Default Funtion")) }: { buttonName: string, ownClass: string, func: functionType }) => {
    const [isLoading,setIsLoading]=useState<boolean>(false);
    return (
        <button onClick={() => {
            setIsLoading(true)
            func();
            setIsLoading(false);
        }} className={` p-1 px-4 scale-105 rounded-md flex items-center justify-center hover:drop-shadow-lg hover:opacity-90 ${ownClass}`}>{buttonName} {(isLoading?(<Loader2 className='ml-2 text-gray-900 animate-spin duration-300'/>):"")}</button>
    )
}

export default Button