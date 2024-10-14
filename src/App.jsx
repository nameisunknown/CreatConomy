import { Home } from './views/Home';
import {Routes, Route} from 'react-router-dom';
import Collections from './views/Collections';
import Nft from './views/Nft';
import Header from './components/Header';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-800 bg-repeat via-[#25bd9c] to-gray-900 bg-center subpixel-antialiased">

      <Header />
     <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/collections" element={<Collections />}/>
      <Route path="/nft/:id" element={<Nft />} />
     </Routes>
      <Home />
    </div>
  )
}

export default App
