import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import Inbox from './Inbox';
import Mail from './Mail';
import Compose from './Compose';

const Navigation = () => {
  return (
    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/inbox' element={<Inbox/>}/>
          <Route path='/inbox/:email' element={<Mail/>}/>
          <Route path='/compose' element={<Compose/>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default Navigation