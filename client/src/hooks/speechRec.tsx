import { useEffect, useState } from "react"



interface WebkitSpeechRecognition extends SpeechRecognition {
    continuous: boolean;
}

let recognition: WebkitSpeechRecognition | null = null;

if('webkitSpeechRecognition' in window){
    recognition = new webkitSpeechRecognition()
    recognition.continuous = true
    recognition.lang = 'en-US'
}


export const UseRecognition =()=>{
    const [text, setText] = useState('')
    const [isListening, setIsListening] = useState(false)

    useEffect(()=>{
        if(!recognition)return;

        recognition.onresult =(e: SpeechRecognitionEvent)=>{
            console.log(e)
            setText(e.results[0][0].transcript)
            recognition.stop()
            setIsListening(false)
        }
        recognition.onerror = (e: Event) => {
            console.error('Error occurred in recognition: ', e);
            setIsListening(false);
        };
    },[])

    const startListening =()=>{
        setText('')
        setIsListening(true)
        recognition?.start()
    }

    const stopListening =()=>{
        setIsListening(false)
        recognition?.stop()
    }

    return{
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition
    }
}