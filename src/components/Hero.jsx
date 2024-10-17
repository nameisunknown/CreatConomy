import { BsArrowRightShort } from "react-icons/bs";
import homepageImg from '../assets/images/picture0.png'

export function Hero() {
  return (
    <div className="flex flex-col items-start md:flex-row space-y-4 sm:space-y-0">
      <Banner />
      <Bidder />
    </div>
  );
}

function Banner(){
  return (
    <div
      className="flex flex-col md:flex-row w-full justify-between 
    items-center mx-auto"
    >
      <div className="text-white">
        <h1 className="font-semibold text-5xl py-1">Discover, Collect</h1>
        <h1 className="font-semibold text-4xl mb-5 py-1">
          and Sell
          <span className="text-green-500 px-1">NFTs</span>
        </h1>
        <p className="font-light">
          More Than 100+ NFTs available for collection
        </p>
        <p className="font-light mb-11">& sell, get your NFTs now.</p>
        <div className="flex text-5xl mb-4">
          <button className="text-sm p-2 bg-green-500 rounded-sm w-auto flex justify-center items-center shadow-md shadow-gray-700"
          onClick={() => setGlobalState('boxModal', 'scale-100')}>
            Create NFT
            <BsArrowRightShort />
          </button>
        </div>
        <div className="flex justify-start items-center space-x-4 w-3/4 mt-s">
          <div>
            <p className="font-bold">100k</p>
            <small className="text-gray-300">Auctions</small>
          </div>

          <div>
            <p className="font-bold">210k</p>
            <small className="text-gray-300">Rare</small>
          </div>
          <div>
            <p className="font-bold">120k</p>
            <small className="text-gray-300">Artists</small>
          </div>
        </div>
      </div>
    </div>
  );
};

function Bidder(){
  return (
    <div className="w-full text-white overflow-hidden bg-gray-800 rounded-md shadow-xl shadow-black md:w-3/5 lg:w-2/5 md:mt-0 font-sans">
      <img className='object-cover w-full h-60' src={homepageImg} alt='NFT'/>
      <div className='shadow-lg shadow-gray-400 border-4 border-[#ffffff36] flex justify-between items-center px-3'>
        <div className="p-2">
          Current Bid
          <div className="font-bold text-center">2.231 ETH</div>
        </div>
        <div className="p-2">
          Auction End
          <div className="font-bold text-center">20:10</div>
        </div>
        
      </div>
      <div className='block bg-green-500 w-full h-[40px] font-bold font-mono text-center mx-auto'>
          <h2>Place a bid</h2> 
        </div>
    </div>
  )
}