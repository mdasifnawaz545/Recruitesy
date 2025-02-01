"use client"

import { FaWhatsapp } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import Link from "next/link";

export default function Completed() {

    return (
        <div className="w-full min-h-screen text-sm flex items-center justify-center  max-sm:items-start  max-sm:mt-12">
            <div className=" w-72 h-80 bg-transparent border-mywidth border-gray-600
             backdrop-blur-lg rounded-xl drop-shadow-lg flex flex-col justify-center items-center gap-4">
                <div>
                    <img src="https://res.cloudinary.com/dpqdgcipi/image/upload/v1737533670/image-removebg-preview_1_gl5lis.png" width={150} height={50} alt={"LOGO"} />
                </div>
                <Link href={""}>    <button className="bg-slate-50 text-sm text-gray-950 h-10 w-auto py-2 px-4 drop-shadow-lg flex items-center justify-center rounded-lg hover:bg-slate-200 hover:drop-shadow-xl"><FaWhatsapp /> <p className="ml-2">Join Whatsapp Group </p></button></Link>
                <Link href={""} ><button className="bg-slate-50 text-sm h-10 w-auto py-2 px-4 drop-shadow-lg flex items-center justify-center text-gray-950 rounded-lg hover:bg-slate-300 hover:drop-shadow-xl" > <IoIosDocument />
                    <p className="ml-2">Know more about Company</p></button></Link>

            </div>
        </div>
    );
}