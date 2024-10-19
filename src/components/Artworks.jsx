export function Artworks({auctions, title, showOffer}){
  return (
    <div className="w-4/5 py-10 mx-auto justify-center">
      <p className="text-xl uppercase text-white mb-4">
        {title ? title: "Current Bids"}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5 text-white font-mono px-1">
        {auctions.map((auction, i) => (<Auction key={i} auction={auction} />))}
      </div>
    </div>

  )
}

function Auction({auction, showOffer}) {
 
  return (
    <div className='overflow-hidden bg-gray-800 rounded-md shadow-xl shadow-black md:mt-0 font-sans my-4'>
      <Link to={'/nft/' + auction.tokenId}>
        <img src={auction.image} alt={auction.name} className="object-cover w-full h-60"/>
      </Link>
      <div className="shadow-lg- shadow-gray-400 border-4 border-[#ffffff36] flex justify-between text-gray-300 px-2">
        <div className="flex flex-col items-start py-2 px-1">
          <span>Current Bid</span>
          <div className='font-bold text-center'>
            {auction.price} ETH
          </div>
        </div>

        <div className="flex flex-col items-start py-2 px-1">
          <span>Auction End</span>
          <div className='font-bold text-center'>
            {auction.live && auction.duration > Date.now() ? ('') : '00:00:00' }
          </div>
        </div>
      </div>
      {auction.tokenId % 2 == 0 ? (
        <button className="bg-green-500 w-full h-[40px p-2 text-cenetr font-bold font-mono" 
        onClick={() => setGlobalState('priceModal','scale-100')}>Place a Bid</button>
      ) : (
        <button className="bg-red-500 w-full h-[40px] p-2 text-center font-bold font-mono" onClick={() => setGlobalState('bidPlacingModal','scale-100')}>
          Buy NFT
        </button>
      ) }
    </div>
  )
}