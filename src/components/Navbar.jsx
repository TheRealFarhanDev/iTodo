import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-around bg-violet-900 text-xl py-2 text-white'>
            <span className='font-bold text-xl'>iTodo</span>
            <ul className="flex gap-6">
                <li className='cursor-pointer hover:font-bold transition-all text-lg'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all text-lg'>About</li>
            </ul>
        </nav>
    )
}

export default Navbar
