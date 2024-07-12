import './App.css'
import { UseRecognition } from './hooks/speechRec'

function App() {

  const{hasRecognitionSupport,isListening,startListening,stopListening,text} =UseRecognition()

  return (
    <>
    {
      hasRecognitionSupport
      ?<div>
        <button onClick={startListening}>start listening</button>
        {isListening && <p>currently listening</p>}
        {isListening && <button onClick={stopListening}>listening</button>}
        <h1>{text}</h1>
      </div>
      :<div>does not support</div>
    }
    </>
  )
}

export default App
