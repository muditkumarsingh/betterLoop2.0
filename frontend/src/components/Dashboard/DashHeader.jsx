import React, { useState } from 'react'
import HeaderButton from './HeaderButton'
import { IoMenuOutline } from "react-icons/io5";

const DashHeader = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    console.log(isMenuOpen)


    return (
        <header className='w-full py-5 relative'>
            <div className='mx-5 md:mx-10 lg:mx-30 px-10 py-5 bg-[#D9D9D9] rounded-full flex justify-between items-center'>
                <div>
                    <h1 className='font-bold text-[#414141] text-lg'>
                        BETTERLOOP
                    </h1>
                </div>
                <div className='hidden md:flex gap-5 justify-center items-center '>
                    <HeaderButton data={'HOME'} route='index' />
                    <HeaderButton data={'SUMMARY'} route='summary' />
                    <HeaderButton data={'TESTIMONIALS'} route='testimonials' />
                    <HeaderButton data={'ABOUT'} route='about' />
                </div>
                <div className='md:hidden'>
                    <IoMenuOutline size={30} onClick={() => setIsMenuOpen(!isMenuOpen)} />
                </div>
            </div>

            {
                isMenuOpen &&
                <div className='w-full px-15 absolute mt-2 '>
                    <div className='bg-green-100 flex flex-col p-2 gap-4'>
                        <HeaderButton data={'HOME'} route='index' mobileView={true} setIsMenuOpen={setIsMenuOpen} />
                        <HeaderButton data={'SUMMARY'} route='summary' mobileView={true}  setIsMenuOpen={setIsMenuOpen}/>
                        <HeaderButton data={'TESTIMONIALS'} route='testimonials' mobileView={true} setIsMenuOpen={setIsMenuOpen} />
                        <HeaderButton data={'ABOUT'} route='about' mobileView={true} setIsMenuOpen={setIsMenuOpen} />
                    </div>
                </div>
            }
        </header>
    )
}

export default DashHeader
