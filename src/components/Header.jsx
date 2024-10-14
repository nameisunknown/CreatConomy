import React from 'react'
import { Link } from 'react-router-dom'

function Header(){
  return (
    <nav className='w-4/5 text-white'>
      <div className='md:flex-[0.5] flex-initial'>
        <Link to="/">
          <span className='px-2 py-1 font-bold text-3xl italic'>
            CreatConomomy Dapp
          </span>
          <span className='py-1 font-semibold italic'>Creators Connect</span>
        </Link>
      </div>
    </nav>
  )
}

export default Header