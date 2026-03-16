import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'



const HeaderButton = ({ route, data, mobileView, setIsMenuOpen }) => {
    let content;


    const navigate = useNavigate()
    console.log(mobileView)


    if (mobileView) {
        content = (
            <Link to={`/dashboard/${route === "index" ? "" : route}`}
                onClick={() => setIsMenuOpen(false)}
                className='cursor-pointer'
            >
                <button
                    className='text-[#626262] text-sm font-semibold  '

                >
                    {data}
                </button>
            </Link>
        )
    }

    return (
        <Link to={`/dashboard/${route === "index" ? "" : route}`}>
            <button
                className='text-[#626262] text-sm font-semibold '

            >
                {data}
            </button>
        </Link>
    )
}

export default HeaderButton
