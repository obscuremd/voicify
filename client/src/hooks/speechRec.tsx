import { useState, useEffect } from "react";

interface WebkitSpeechRecognition extends SpeechRecognition {
    continuous: boolean;
}

let recognition: WebkitSpeechRecognition | null = null;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition() as WebkitSpeechRecognition;
    recognition.continuous = true;
    recognition.lang = 'en-US';
}

export const UseRecognition = () => {
    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (!recognition) return;

        recognition.onstart = () => {
            console.log('Recognition started');
            setIsListening(true);
        };

        recognition.onresult = (e: SpeechRecognitionEvent) => {
            let finalTranscript = '';
            for (let i = 0; i < e.results.length; i++) {
                finalTranscript += e.results[i][0].transcript;
            }
            setText(finalTranscript);
            recognition.stop();
        };

        recognition.onerror = (e: Event) => {
            console.error('Error occurred in recognition: ', e);
            setIsListening(false);
        };

        recognition.onend = () => {
            console.log('Recognition ended');
            setIsListening(false);
        };

        return () => {
            recognition.onstart = null;
            recognition.onresult = null;
            recognition.onerror = null;
            recognition.onend = null;
        };

    }, []);

    const startListening = () => {
        if (recognition && !isListening) {
            recognition.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (recognition && isListening) {
            recognition.stop();
        }
    };

    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition
    };
};
