import { useEffect, useState }  from 'react'
import { Buttons } from '../Components/ui/Buttons'
import { MoreHoriz } from 'iconoir-react'
import axios from 'axios'
import { Url } from '../Exports/Export'
import { useRecoilValue } from 'recoil'
import { UserEmail } from '../states/Record';

const Inbox = () => {
  const [data, setData] = useState([])
  const user = useRecoilValue(UserEmail)

  useEffect(() => {
    const FetchMails =async () =>{
      const res = await axios.get(`${Url}/user/${user}`)
      setData(res.data)
    }

    FetchMails()
  },[])
 
  return (
    <div className=''>
      {/* header */}
      <div className='flex justify-between items-center md:px-[64px] px-[32px] '>
        <h4 className='font-bold'>Emails</h4>
        <Buttons bg text='Compose' to='/compose'/>
      </div>
      <div className='w-full overflow-scroll md:overflow-hidden md:px-[64px] px-0'> 
        <table className='w-full gradient-border-top'>
          <thead>
            <tr className='gradient gradient-border-bottom '>
              <th ></th>
              <th >Subject</th>
              <th >Reciepnt</th>
              <th >Date</th>
              <th ></th>
            </tr>
          </thead>
          {data.length === 0
          ?<p>no posts yet</p>
          :  <tbody>
            {
              data.map(({ receiverEmail, subject, createdAt}, index)=>(
              <tr key={index} className='gradient-border-bottom text-nowrap'>
                <td className='w-[10em]'>{subject}</td>
                <td className='w-[10em]'>{subject}</td>
                <td className='w-[10em]'>{receiverEmail}</td>
                <td className='w-[10em]'>{createdAt}</td>
                <td className='w-[10em]'><MoreHoriz/></td>
              </tr>
              ))
            }

          </tbody>}
          
        </table>
      </div>
    </div>
  )
}

export default Inbox