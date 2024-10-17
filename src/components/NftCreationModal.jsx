import { FaTimes} from 'react-icons/fa'
import formImage from '../assets/images/picture1.png'
import {useState} from 'react';
import { setGlobalState, useGlobalState } from '../store';

export function NftCreationModal(){
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [imgBase64, setImgBase64] = useState(null);
  const [boxModal] = useGlobalState('boxModal');

  async function changeImageFunc(e){
    const fileReader = new FileReader();
    if(e.target.files[0]) fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (readerEvent) => {
      const file = readerEvent.target.result;
      setImgBase64(file);
      setFileUrl(e.target.files[0]);
    }
  }

  async function submitArtwork(e){
    e.preventDefault();
    if(!name || !price || !description || !fileUrl) return;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', fileUrl);

    console.log(name, price, description, fileUrl);
    resetForm();
    console.log('Submitted');

  }

  function resetForm(){
    setFileUrl('');
    setImgBase64('')
    setName('');
    setDescription('');
    setPrice('');
  }

  function onClose(){
    resetForm();
    setGlobalState('boxModal', 'scale-0');
  }

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${boxModal}`}>
      
      <div className="bg-[#151c25] shadow-xl shadow-[#25bd9c] rounded-xl w-11/12 sm:w-2/5 h-7/12 p-6">
        <form onSubmit={submitArtwork} className='flex flex-col'>
          <div className='text-gray-400 flex justify-between items-center'>
            <p className='font-semibold italic'>Add NFT</p>
            <button type='button' onClick={onClose} className='border-0 bg-transaparent focus:outline-none'>
              <FaTimes />
            </button>
          </div>
          <div className='flex justify-center items-center mt-5 '>
            <div className='shrink-0 rounded-xl overflow-hidden h-20 w-20'>
              <img
                src={imgBase64 || formImage} alt='Artwrk' className='h-full w-full object-cover cursor-pointer'
              />
            </div>
          </div>
          <div className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
            <label className='block'>
              <span className='sr-only'>
                Choose NFT Artwork
              </span>
              <input type='file' accept='image/png, image/jpg, image/webp, image/jpeg, image/gif' className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-[#1d2631] file:text-gray-300 hover:file:bg-[#1d2631] cursor-pointer focus:ring-0' onChange={changeImageFunc} required/>
            </label>
          </div>
          <div className='flex justify-between items-cenetr bg-gray-800 rounded-xl mt-5'>
          <input type='text' className='block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 bg-transparent border-0 px-4 py-2' placeholder='Title' value={name} name='name' onChange={(e) => setName(e.target.value)} required/>
          </div>
          <div className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
          <input type='number' min={0.01} step={0.01} className='block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 bg-transparent border-0 px-4 py-2' placeholder='Price (ETH)' name="price" value={price} onChange={(e) => setPrice(e.target.value)} required/>
          </div>
          <div className='flex justify-between items-cenetr bg-gray-800 rounded-xl mt-5'>
          <textarea type='text' className='block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 bg-transparent border-0 px-4 py-2' placeholder='Description' name="description" value={description} onChange={(e) => setDescription(e.target.value)} required>
            </textarea>
          </div>
          <button type='submit' className='flex justify-center items-center w-full text-white text-md bg-[#25bd9c] py-2 px-5 rounded-full drop-shadow-xl border border-rounded hover:bg-transparent  hover:border hover:text-white hover:border-[#25bd9c] focus:outline-none focus:ring-0'>Mint Now</button>
        </form>
      </div>
    </div>
  )
}