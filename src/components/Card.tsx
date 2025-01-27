import Link from 'next/link'
import React from 'react'

const Card = ({ domainName, logo, dbDomainName }: { domainName: string, logo: string, dbDomainName: string }) => {
    return (
        <Link href={`/home/${dbDomainName}/allCandidate`}>
            <div className='bg-transparent backdrop-blur-lg border-mywidth border-gray-600 text-white h-48 w-52 rounded-lg flex flex-col items-center justify-evenly drop-shadow-lg hover:scale-105 duration-200'>
                <div>
                    <img src={logo} alt="LOGO" width={100} height={100} />
                </div>
                <div className='p-1 rounded-lg text-center uppercase drop-shadow-lg'>
                    <h1>{domainName}</h1>
                </div>
            </div>
        </Link>
    )
}

export default Card