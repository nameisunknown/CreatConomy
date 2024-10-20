import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import formImage from "../assets/images/picture1.png";
import { setGlobalState, useGlobalState } from "../store";

export function OfferItem() {
  const [offerModal] = useGlobalState('offerModal');
  const [auction] = useGlobalState('auction');
  const [period, setPeriod] = useState("");
  const [biddable, setBiddable] = useState("");
  const [timeline, setTimeline] = useState('');

  async function submitArtwork(e) {
    e.preventDefault();
    if (!period || !biddable || !timeline) return;

    console.log({period, biddable, timeline});

    // const formData = new FormData();
    // formData.append("period", period);
    // resetForm();
  

    // console.log(name, price, description, fileUrl);
    
    // console.log("Submitted");
  }

  function resetForm() {
    setPeriod("");
    setGlobalState('offerModal', 'scale-0')
    // setBiddable("");
    // setTimeline("");
  }

  function onClose() {
    resetForm();
    setGlobalState("offerModal", "scale-0");
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${offerModal}`}
    >
      <div className="bg-[#151c25] shadow-xl shadow-[#25bd9c] rounded-xl w-11/12 sm:w-2/5 h-7/12 p-6">
        <form onSubmit={submitArtwork} className="flex flex-col">
          <div className="text-gray-400 flex justify-between items-center">
            <p className="font-semibold italic">Add NFT</p>
            <button
              type="button"
              onClick={onClose}
              className="border-0 bg-transaparent focus:outline-none"
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
            {/* <input
              type="number"
              min={1}
              className="block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 bg-transparent border-0 px-4 py-2"
              placeholder="Days E.g 7"
              name="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              required
            /> */}

            <select
              type="number"
              min={1}
              className="block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 bg-transparent border-0 px-4 py-2"
              placeholder="Days E.g 7"
              name="period"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              required
            >
              <option value="" hidden>Select Duration</option>
              <option value="sec" hidden>Seconds </option>
              <option value="min" hidden>Minutes</option>
              <option value="hour" hidden>Hours </option>
              <option value="day" hidden>Days</option>
            </select>
          </div>
          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <select
              type="number"
              min={1}
              className="block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 bg-transparent border-0 px-4 py-2"
              placeholder="Days E.g 7"
              name="period"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              required
            >
              <option value="" hidden>Select Biddability</option>
              <option value={true}>Yes </option>
              <option value={false} >No</option>
            </select>
          </div>
          <button
            type="submit"
            className="flex justify-center items-center w-full text-white text-md bg-[#25bd9c] py-2 px-5 rounded-full drop-shadow-xl border border-rounded hover:bg-transparent  hover:border hover:text-white hover:border-[#25bd9c] focus:outline-none focus:ring-0"
          >
            Offer Item
          </button>
        </form>
      </div>
    </div>
  );
}
