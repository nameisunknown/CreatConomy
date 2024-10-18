import React from 'react'
import { useGlobalState } from '../store'
import {Artworks } from '../components/Artworks'
import {EmptyFile} from '../components/EmptyFile'
import { OfferItem } from '../components/OfferItem'

export function Collections(){
  const [collections] = useGlobalState('collections')
  return (
    <div className='w-4/5 mx-auto mt-11'>
      {collections.length > 0 ? (<Artworks title='Your Collections' auction={collections} showOffer />): (<EmptyFile />)}
      <OfferItem />
      OfferI
    </div>
  )
}

export default Collections