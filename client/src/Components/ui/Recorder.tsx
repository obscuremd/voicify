import { Microphone} from 'iconoir-react';
import { UseRecognition } from '../../hooks/speechRec'

import { mirage } from 'ldrs'
import { useRecoilValue } from 'recoil';
import { RecordedText, Recording } from '../../states/Record';

mirage.register()

const Recorder = () => {

  const{ hasRecognitionSupport} =UseRecognition()

  const recordedText = useRecoilValue(RecordedText)
  const recording = useRecoilValue(Recording)

  return (
      <div className='p-8 flex flex-col items-center gap-10 w-fit border-[0.5px] border-opacity-25 rounded-2xl border-pink-Light'>
        
        <div className='w-[80%] h-[250px] border-[1px] border-green-Dark_hover flex items-center justify-center rounded-3xl text-[100px] text-green-Dark_hover'>
          {recording
          ?<l-mirage size="150" speed="2.5" color="#1f614d" />
          :<Microphone/>}
        </div>
        <h5 className='w-[10em] text-center'>
          {recordedText ===''
            ?'Speak into the mic'
            :recordedText
          }
        </h5>
        {!hasRecognitionSupport && <p>your browser does not support this</p>}
      </div>
  )
}

export default Recorder