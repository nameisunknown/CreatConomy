import React from 'react'
import { Hero } from '../components/Hero'
import { NftCreationModal } from '../components/NftCreationModal'

export function Home(){
  return (
    <div className='w-4/5 mx-auto mt-11'>
      <Hero />
      <NftCreationModal />
    </div>
  )
}
