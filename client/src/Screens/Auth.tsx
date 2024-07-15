import React, { useEffect, useState } from 'react'
import { UseRecognition } from '../hooks/speechRec';
import logo from '../assets/Logo.svg'
import { AppleMac, Eye, EyeClosed, Facebook, Google } from 'iconoir-react';
import { Buttons, CircleIconButtons } from '../Components/ui/Buttons';
import { isMobile } from '../assets/Shared';
import { speak } from '../hooks/speak';

const Auth = () => {

    const { startListening, text } = UseRecognition();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [current, setCurrent] = useState('email');
  
    useEffect(() => {
      if (text) {
        if (current === 'email') {
          setEmail(`${text}@gmail.com`);
        } else if (current === 'password') {
          setPassword(text);
        }
      }
    }, [text]);
  
    const recordEmail = () => {
      speak('whats your email')
      setCurrent('email')
      startListening();
    };
  
    const recordPassword = () => {
      speak('whats your password')
      setCurrent('password')
      startListening();
    };

    const submit =async()=>{
      console.log([email, password])
    }

    const doubleClick = (e: React.MouseEvent<HTMLElement>) => {
      console.log(e)
      if(e.detail === 1){
        recordEmail()
      }else if(e.detail === 2){
        recordPassword()
      }else if(e.detail === 3){
        submit()
      }
    }
  

  return (
    <div className='container min-h-[100vh] flex flex-col justify-center items-center' onClick={doubleClick}>
        <div className='md:w-[40%] w-[90%] flex flex-col gap-7'>
            {/* logo */}
            <div className='p-2 border-2 border-green-Dark_hover w-fit rounded-lg'> <img src={logo} alt="" className='w-8' /> </div>
            {/* header */}
            <div className=' flex flex-col gap-2'>
                <h5 className='font-bold'>{isMobile?'Voicify':'Voicify: Communication simplified.'}</h5>
                <p className='text-title2'>Choose one of the options to get started</p>
            </div>

            {/* inputs */}
            <input
            placeholder='Email'
                onClick={recordEmail}
                className='w-full'
                value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <div className='flex gap-4'>
                    <input
                        placeholder='Password'
                        onClick={recordPassword}
                        className='w-full'
                        type={passwordVisible?'text':'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={()=>setPasswordVisible(!passwordVisible)} className='p-2 border-[1px] border-pink-Light w-fit rounded-lg '>
                        {passwordVisible
                            ?<Eye/>
                            :<EyeClosed/>
                            }
                         
                    </button>
            </div>

            <div className='flex w-full items-center gap-3'>
                <p className='text-title2 text-nowrap'>or continue in with</p>
                <hr className='w-full text-pink-Light' />
            </div>

            <div className='flex gap-5 '>
                <CircleIconButtons square icon={<Google/>}/>
                <CircleIconButtons square icon={<Facebook/>}/>
                <CircleIconButtons square icon={<AppleMac/>}/>
            </div>
            
            <div className='flex gap-5 '>
                <Buttons bg text='Login'/>
                <Buttons border text='Sign Up'/>
            </div>
        </div>
    </div>
  )
}

export default Auth 