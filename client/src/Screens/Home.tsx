import React, { useEffect } from 'react'
import { Buttons, CircleIconButtons } from '../Components/ui/Buttons'
import logo from '../assets/Logo.svg'
import { speak } from '../hooks/speak'
import { icons } from '../Exports/Export'
import { Mail } from 'iconoir-react'
import { UseRecognition } from '../hooks/speechRec'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  const { startListening,stopListening, text } = UseRecognition();

  const doubleClick = (e: React.MouseEvent<HTMLElement>) =>{
    console.log(e.detail)
    if(e.detail === 2){
      speak('what would you like to do, go to inbox or compose')
      startListening()
    }else if(e.detail === 3){
      stopListening()
    }
  }
 
  useEffect(()=>{
    if(text.toLowerCase() === 'go to inbox'){
      navigate('/inbox')
    }else if(text.toLowerCase() === 'compose'){
      navigate('/compose')
    }else{
      return
    }
  },[text, navigate])  

  return (
    <div className='w-full flex flex-col items-center gap-16' onClick={doubleClick}>
      {/* hero */}
      <div className='md:w-[45%] w-[80%] md:py-52 py-28 flex flex-col gap-10 text-center items-center'>
        <h1 className='font-bold leading-10'>Emails For The Blind</h1>
        <p className='text-title1'>Reach your audience effortlessly, regardless of any disabilities. Deliver transactional and marketing emails at scale with ease.</p>
        <div className='flex gap-5'>
          <Buttons bg text='Get Started' to='/inbox'/>
          <Buttons text='Documentation'/>
        </div>
      </div>
      {/* developed */}
      <footer className="gradient-border-top gradient py-16 md:px-32 px-8 flex items-center justify-center w-full">
        <p>Developed by Abdul HardDick</p>
    </footer>
    {/* get started */}
    <div className=' flex flex-col items-center gap-16 w-full p-0 px-8'>
      <div className='p-3 border-4 border-green-Dark_hover w-fit rounded-lg'> <img src={logo} alt="" className='w-24' /> </div>
      <h1 className='flex flex-col md:flex-row gap-[0.5em] md:gap-[0.1em] items-center font-bold'>Easy To <span className='green_gradient_text'>Get Started</span>  </h1>
      <p className='text-title2 text-center'>Utilizing these packages has made sending emails easier and more effortless than ever before.</p>
      <div className='flex flex-wrap justify-center gap-5 md:gap-20'>
        <CircleIconButtons square icon={<img className='w-4' src={icons.react}/>} text='React'/>
        <CircleIconButtons square icon={<img className='w-4' src={icons.typescript}/>} text='Typescript'/>
        <CircleIconButtons square icon={<img className='w-4' src={icons.express}/>} text='Express Js'/>
        <CircleIconButtons square icon={<img className='w-4' src={icons.figma}/>} text='Figma'/>
        <CircleIconButtons square icon={<img className='w-4' src={icons.mongodb}/>} text='MongoDb'/>
        <CircleIconButtons square icon={<img className='w-4' src={icons.nextjs}/>} text='NextJs'/>
        <CircleIconButtons square icon={<Mail/>} text='NodeMailer'/>
      </div>
    </div>
    
    </div>
  )
}

export default Home