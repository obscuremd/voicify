import {useState} from 'react'
import { Buttons } from '../Components/ui/Buttons'
import axios from 'axios'
import { Url } from '../Exports/Export'
import { useRecoilValue } from 'recoil'
import { UserEmail } from '../states/Record';

const Compose = () => {

  const user = useRecoilValue(UserEmail)

  const [receiverEmail , setReceiverEmail] = useState('')
  const [subject , setSubject] = useState('')
  const [text , setText] = useState('')

  const SendEmail = async() => {
    if(!receiverEmail || !subject || !text ){
      window.alert("fields must not be empty")
    }else{
      try{
        await axios.post(`${Url}/${user}`,{receiverEmail, subject, text})
        window.alert('email sent successfully')
      }catch(error){
        window.alert(error)
        console.log(error)
      }
    }
  }

  return (
    <div className='w-full flex justify-center items-center md:px-[64px] px-[32px]'>
      <div className='border-[1px] border-pink-Light w-full rounded-3xl md:p-8 p-4 flex flex-col md:gap-10 gap-5'>
        {/* header */}
        <div className='flex flex-col gap-5 md:flex-row justify-between md:items-center '>
          <h4 className='font-bold'>Emails</h4>
          <div className='flex gap-2'>
            <Buttons bg text='Send' func={SendEmail}/>
            <Buttons border text='Discard' to='/inbox'/>
          </div>
        </div>

        <div className='flex flex-col gradient-border-bottom'>
          <p>To:</p>
          <input type="text" className='remove-input' onChange={(e)=>setReceiverEmail(e.target.value)} />
        </div>
        
        <div className='flex flex-col gradient-border-bottom'>
          <p>Subject:</p>
          <input type="text" className='remove-input' onChange={(e)=>setSubject(e.target.value)} />
        </div>

        <textarea name="" id="" onChange={(e)=>setText(e.target.value)} className='bg-transparent outline-none border-[1px] p-5 min-h-[30vh] rounded-3xl'/>
      </div>
    </div>
  )
}

export default Compose