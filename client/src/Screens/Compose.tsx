import {useEffect, useState} from 'react'
import { Buttons } from '../Components/ui/Buttons'
import axios from 'axios'
import { Url } from '../Exports/Export'
import { useRecoilValue } from 'recoil'
import { UserEmail } from '../states/Record';
import { UseRecognition } from '../hooks/speechRec'
import { speak } from '../hooks/speak';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Compose = () => {


  const navigate = useNavigate()
  const user = useRecoilValue(UserEmail)

  const [receiverEmail , setReceiverEmail] = useState('')
  const [subject , setSubject] = useState('')
  const [body , setBody] = useState('')

  const [loading, setLoading] = useState(false)

  const { startListening, text } = UseRecognition();

  const [current, setCurrent] = useState('to')

  const recordTo =()=>{
    speak('who do you want to send to')
    setCurrent('to')
    startListening()
  }
  const recordSubject =()=>{
    speak('whats the subject')
    setCurrent('subject')
    startListening()
  }
  const recordBody =()=>{
    speak('what do you want to say')
    setCurrent('body')
    startListening()
  }

  useEffect(() => {
    if (text) {
      if (current === 'to') {
        setReceiverEmail(`${text}@gmail.com`);
      } else if (current === 'subject') {
        setSubject(text);
      } else if (current === 'body'){
        setBody(text);
      }
    }
  }, [text, current]);

  const SendEmail = async() => {
    setLoading(true);
    if(!receiverEmail || !subject || !body ){
      window.alert("fields must not be empty")
      setLoading(false);
    }else{
      try{
        await axios.post(`${Url}/${user}`,{receiverEmail, subject, text:body})
        window.alert('email sent successfully')
        setLoading(false)
      }catch(error){
        window.alert(error)
        console.log(error)
        setLoading(false)
      }
    }
  }

  const doubleClick = (e: React.MouseEvent<HTMLElement>) => {
    const screenHeight = window.innerHeight;
    const clickY = e.clientY;

    if(e.detail === 2){
      if (clickY < screenHeight / 2) {
        SendEmail()
      } else {
        navigate('/')
      }
    }else{return}

  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='w-full flex justify-center items-center md:px-[64px] px-[32px]' onClick={doubleClick}>
      <div className='border-[1px] border-pink-Light w-full rounded-3xl md:p-8 p-4 flex flex-col md:gap-10 gap-5'>
        {/* header */}
        <div className='flex flex-col gap-5 md:flex-row justify-between md:items-center '>
          <h4 className='font-bold'>Emails</h4>
          <div className='flex gap-2'>
            <Buttons bg text='Send' func={SendEmail}/>
            <Buttons border text='Discard' to='/inbox'/>
          </div>
        </div>

        <div className='flex flex-col gradient-border-bottom' onClick={recordTo}>
          <p>To:</p>
          <input type="text" className='remove-input' onChange={(e)=>setReceiverEmail(e.target.value)} value={receiverEmail}/>
        </div>
        
        <div className='flex flex-col gradient-border-bottom' onClick={recordSubject}>
          <p>Subject:</p>
          <input type="text" className='remove-input' onChange={(e)=>setSubject(e.target.value)} value={subject}/>
        </div>

        <textarea name="" id="" onClick={recordBody} onChange={(e)=>setBody(e.target.value)} value={body} className='bg-transparent outline-none border-[1px] p-5 min-h-[30vh] rounded-3xl'/>
      </div>
    </div>
  )
}

export default Compose