import { MotionConfig } from 'framer-motion';
import './App.css';
import Gradient from './Components/ui/Gradient';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Auth from './Screens/Auth';
import Navigation from './Screens/Navigation';

function App() {

  return (
    <MotionConfig transition={{ ease: 'easeInOut' }}>
      <Gradient />
        {/* <Auth/> */}
        <Navigation/>
      
    </MotionConfig>
  );
}

export default App;
