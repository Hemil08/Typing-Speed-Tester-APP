import { useEffect, useRef } from 'react'

const TextToSpeech = ({text,isSpeaking,setIsSpeaking}) => {

    const synthRef = useRef(window.speechSynthesis);
    const utteranceRef = useRef(new SpeechSynthesisUtterance());

    useEffect(()=>{
        if(isSpeaking){
            speakText(text);
        }
        else{
            stopSpeaking();
        }
        return () => stopSpeaking();
    },[isSpeaking,text])

    const speakText = (text) => {
        stopSpeaking();
        if (text.trim()) {
            utteranceRef.current.text = text;
            utteranceRef.current.rate = 1; 
            utteranceRef.current.onend = () => setIsSpeaking(false); 
            synthRef.current.speak(utteranceRef.current); 
        }
    }

    const stopSpeaking = () =>{
        if (synthRef.current.speaking){
            synthRef.current.cancel();
        }
    }

  return null;
}

export default TextToSpeech