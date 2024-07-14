import { MotionConfig } from 'framer-motion';
import './App.css';
import { Buttons } from './Components/ui/Buttons';
import { UserScan } from 'iconoir-react';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Gradient from './Components/ui/Gradient';
import { useState, useEffect } from 'react';
import { UseRecognition } from './hooks/speechRec';

function App() {
  const { startListening, text } = UseRecognition();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [current, setCurrent] = useState('email');

  useEffect(() => {
    if (text) {
      if (current === 'email') {
        setEmail(text);
      } else if (current === 'password') {
        setPassword(text);
      }
    }
  }, [text]);

  const recordEmail = () => {
    setCurrent('email')
    startListening();
  };

  const recordPassword = () => {
    setCurrent('password')
    startListening();
  };

  return (
    <MotionConfig transition={{ ease: 'easeInOut' }}>
      <NavBar />
      <Gradient />
      <input
        placeholder='Email'
        onClick={recordEmail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>{text}</p>
      <input
        placeholder='Password'
        onClick={recordPassword}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Buttons text='Get Started' icon={<UserScan />} />
      <Footer />
    </MotionConfig>
  );
}

export default App;
