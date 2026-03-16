import React, { useState } from 'react'
import HeaderButton from './HeaderButton'
import { IoMenuOutline } from "react-icons/io5";

const DashHeader = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className='w-full py-6 relative flex justify-center'>

            {/* Header Container */}
            <div className='w-[95%] lg:w-[85%] px-8 py-4 
            bg-white/70 backdrop-blur-md
            border border-gray-200
            shadow-md rounded-2xl 
            flex justify-between items-center'>

                {/* Logo */}
                <div>
                    <h1 className='font-extrabold tracking-wide text-xl text-gray-800'>
                        BETTERLOOP
                    </h1>
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex gap-6 items-center text-sm font-medium'>
                    <HeaderButton data={'HOME'} route='index' />
                    <HeaderButton data={'SUMMARY'} route='summary' />
                    <HeaderButton data={'TESTIMONIALS'} route='testimonials' />
                    <HeaderButton data={'ABOUT'} route='about' />
                </div>

                {/* Mobile Menu Icon */}
                <div className='md:hidden'>
                    <IoMenuOutline
                        size={32}
                        className='cursor-pointer text-gray-700 hover:text-black transition'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                </div>
            </div>

            {/* Mobile Dropdown */}
            {
                isMenuOpen &&
                <div className='w-full flex justify-center absolute top-[85px] z-50'>

                    <div className='w-[90%] 
                    bg-white 
                    shadow-xl 
                    border border-gray-200
                    rounded-xl 
                    p-6 
                    flex flex-col 
                    gap-5
                    animate-fadeIn'>

                        <HeaderButton data={'HOME'} route='index' mobileView={true} setIsMenuOpen={setIsMenuOpen} />
                        <HeaderButton data={'SUMMARY'} route='summary' mobileView={true} setIsMenuOpen={setIsMenuOpen} />
                        <HeaderButton data={'TESTIMONIALS'} route='testimonials' mobileView={true} setIsMenuOpen={setIsMenuOpen} />
                        <HeaderButton data={'ABOUT'} route='about' mobileView={true} setIsMenuOpen={setIsMenuOpen} />

                    </div>
                </div>
            }

        </header>
    )
}

export default DashHeader