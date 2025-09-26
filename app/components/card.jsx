'use client'
import React from "react";
import {motion} from "framer-motion";

export default function Card() {

    return(
        <div className="card bg-[#F8D4C8] overflow-y-scroll p-8 min-h-screen flex flex-col-2 gap-5 justify-center items-center relative text-center">
            <motion.div
        initial={{ opacity: 1, y: 1000 }}
        animate={{ opacity: 1, y: 20 }}
        transition={{ duration: 1.5, ease: [0.3, 0, 0, 1], delay:0.7 }}
        className="z-10 rounded-[25px] min-h-[85vh] bg-[#2D411B] overflow-hidden w-full flex flex-col md:flex-row items-center p-6 md:p-12"
      >
        <div className="text-left text-[#FBF7F5] md:w-1/2 w-full mb-6 md:mb-0">
        <h1 className='text-[40px] font-bold'>Heading</h1>
        <p className='text-[20px]'>Description goes here.</p>
        </div>

      </motion.div>
      <motion.div
        initial={{ opacity: 1, y: 1000 }}
        animate={{ opacity: 1, y: 20 }}
        transition={{ duration: 1.5, ease: [0.3, 0, 0, 1], delay:0.7 }}
        className="z-10 rounded-[25px] min-h-[85vh] bg-[#2D411B] overflow-hidden w-full flex flex-col md:flex-row items-center p-6 md:p-12"
      >
        <div className="text-left text-[#FBF7F5] md:w-1/2 w-full mb-6 md:mb-0">
        <h1 className='text-[40px] font-bold'>Heading</h1>
        <p className='text-[20px]'>Description goes here.</p>
        </div>

      </motion.div>
        </div>

    )


}
