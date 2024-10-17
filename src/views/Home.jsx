import React from 'react';
import { Hero } from '../components/Hero';
import { NftCreationModal } from '../components/NftCreationModal';
import { Artworks } from '../components/Artworks';
import { useGlobalState } from '../store';

export function Home(){
  const [auctions] = useGlobalState('auctions');
  return (
    <div className='w-4/5 mx-auto mt-11'>
      <Hero />
      <Artworks auctions={auctions}/>
      <NftCreationModal />
    </div>
  )
}
