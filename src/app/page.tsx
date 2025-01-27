"use client"
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <motion.div initial={{ x: "-100vw" }} animate={{ x: 0, transition: {} }}>
        <Link className="bg-transparent border-mywidth border-gray-600  text-sm text-white hover:scale-110 duration-200 py-[5px] scale-x-105 px-3 rounded-md flex items-center justify-center" href="/signin">Get Started&nbsp;&nbsp;
          <span ><GoArrowRight /></span>
        </Link>
      </motion.div>
    </div>
  );
}

