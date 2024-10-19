import { FaTimes } from "react-icons/fa";
import formImage from "../assets/images/picture1.png";
import { useState } from "react";
import { setGlobalState, useGlobalState } from "../store";

export function PlaceBidsModal() {
  const [price, setPrice] = useState("");
  const [imgBase64, setImgBase64] = useState(null);
  const [bidPlacingModal] = useGlobalState("bidPlacingModal");
  const [auction] = useGlobalState('auction');

  async function submitArtwork(e) {
    e.preventDefault();
    if (!price) return;
    resetForm();
    console.log("Submitted");
  }

  function resetForm() {
    setPrice("");
  }

  function onClose() {
    resetForm();
    setGlobalState("bidPlacingModal", "scale-0");
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${bidPlacingModal}`}
    >
      <div className="bg-[#151c25] shadow-xl shadow-[#25bd9c] rounded-xl w-11/12 sm:w-2/5 h-7/12 p-6">
        <form onSubmit={submitArtwork} className="flex flex-col">
          <div className="text-gray-400 flex justify-between items-center">
            <p className="font-semibold italic">Bidding</p>
            <button
              type="button"
              onClick={onClose}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-center items-center mt-5 ">
            <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
              <img
                src={auction.image || formImage}
                alt="Artwrk"
                className="h-full w-full object-cover cursor-pointer"
              />
            </div>
          </div>
          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              type="number"
              min={0.01}
              step={0.01}
              className="block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 bg-transparent border-0 px-4 py-2"
              placeholder="Price (ETH)"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
         
          <button
            type="submit"
            className="flex justify-center items-center w-full text-white text-md bg-[#25bd9c] py-2 px-5 rounded-full drop-shadow-xl border border-rounded hover:bg-transparent  hover:border hover:text-white hover:border-[#25bd9c] focus:outline-none focus:ring-0"
          >
            Place Bid
          </button>
        </form>
      </div>
    </div>
  );
}
