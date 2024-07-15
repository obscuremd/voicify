import React, { useEffect, useState } from 'react';
import { UseRecognition } from '../hooks/speechRec';
import logo from '../assets/Logo.svg';
import { AppleMac, Eye, EyeClosed, Facebook, Google } from 'iconoir-react';
import { Buttons, CircleIconButtons } from '../Components/ui/Buttons';
import { speak } from '../hooks/speak';
import { isMobile } from '../Exports/Export';
import Loader from './Loader';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const Auth = () => {
  const { startListening, text } = UseRecognition();

  
  const auth = getAuth();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [current, setCurrent] = useState('email');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (text) {
      if (current === 'email') {
        setEmail(`${text}@gmail.com`);
      } else if (current === 'password') {
        setPassword(text);
      }
    }
  }, [text, current]);

  const recordEmail = () => {
    speak('What is your email?');
    setCurrent('email');
    startListening();
  };

  const recordPassword = () => {
    speak('What is your password?');
    setCurrent('password');
    startListening();
  };

  const doubleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.detail === 2) {
      recordPassword();
    } else if (e.detail === 3) {
      recordEmail();
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      console.log(user);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      window.alert(error)
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      console.log(user);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      window.alert(error)
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='container min-h-[100vh] flex flex-col justify-center items-center' onClick={doubleClick}>
      <div className='md:w-[40%] w-[90%] flex flex-col gap-7'>
        <div className='p-2 border-2 border-green-Dark_hover w-fit rounded-lg'>
          <img src={logo} alt="Logo" className='w-8' />
        </div>
        <div className='flex flex-col gap-2'>
          <h5 className='font-bold'>{isMobile ? 'Voicify' : 'Voicify: Communication simplified.'}</h5>
          <p className='text-title2'>Choose one of the options to get started</p>
        </div>
        <input
          placeholder='Email'
          className='w-full'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className='flex gap-4'>
          <input
            placeholder='Password'
            className='w-full'
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => setPasswordVisible(!passwordVisible)}
            className='p-2 border-[1px] border-pink-Light w-fit rounded-lg'
          >
            {passwordVisible ? <Eye /> : <EyeClosed />}
          </button>
        </div>
        <div className='flex w-full items-center gap-3'>
          <p className='text-title2 text-nowrap'>or continue with</p>
          <hr className='w-full text-pink-Light' />
        </div>
        <div className='flex gap-5'>
          <CircleIconButtons square icon={<Google />} />
          <CircleIconButtons square icon={<Facebook />} />
          <CircleIconButtons square icon={<AppleMac />} />
        </div>
        <div className='flex gap-5'>
          <Buttons bg text='Login' func={handleLogin} />
          <Buttons border text='Sign Up' func={handleSignUp} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
