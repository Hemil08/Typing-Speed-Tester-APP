import React, {  useEffect, useRef, useState } from "react";
import Styles from "./TextArea.module.css";
import { getRandomPassage } from "../../utils";
// import {getRandomPassage} from "../../services/getRandomPassage"
import TextToSpeech from "../TextToSpeech";


const TextArea = (props) => {
  const [timeLeft, setTimeLeft] = useState(props.timeDuration);
  const [mistakes, setMistakes] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
  const [accuracy,setAccuracy] = useState(0);
  const [correctWrong, setCorrectWrong] = useState([]);
  const [paragraph, setParagraph] = useState("");

  // for Text to Speech Component
  const [text,settext] = useState('')
  const [isSpeaking,setIsSpeaking] = useState(false);

  const inputRef = useRef(null);
  const charRefs = useRef([]);


  useEffect(() => {
    setParagraph(getRandomPassage(props.difficulty));
    
    setTimeLeft(props.timeDuration);
    setMistakes(0);
    setCharIndex(0);
    setIsTyping(false);
    setCPM(0);
    setWPM(0);
    setCorrectWrong([]);
    inputRef.current.focus();
    setCorrectWrong(Array(charRefs.current.length).fill(""));
  }, [props.difficulty, props.timeDuration]);

  useEffect(() => {
    let interval;
    if (isTyping && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        let correctChars = charIndex - mistakes;
        let totalTime = props.timeDuration - timeLeft;

        let cpm = correctChars * (60 / totalTime);
        cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
        setCPM(parseInt(cpm, 10));

        let wpm = Math.round((correctChars / 5 / totalTime) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        setWPM(wpm);

        let totalCharsTyped = charIndex;
        let Accuracy = totalCharsTyped > 0 ? (correctChars/totalCharsTyped) * 100 : 0;
        setAccuracy(Accuracy.toFixed(2))
      }, 1000);
    } else if (timeLeft === 0 && isTyping) {
      clearInterval(interval);
      setIsTyping(false);
      
      props.onSubmitAccuracy(parseFloat(accuracy));
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTyping, timeLeft]);

  const tryAgain = () => {
    setParagraph(getRandomPassage(props.difficulty));
    setTimeLeft(props.timeDuration);
    setMistakes(0);
    setCharIndex(0);
    setIsTyping(false);
    setWPM(0);
    setCPM(0);
    setCorrectWrong([]);

    if (inputRef.current){
      inputRef.current.value = "";
    }
    inputRef.current.focus();
  };

  const handleChange = (e) => {
    const characters = charRefs.current || [];
    const typedValue = e.target.value;
    const currentChar = charRefs.current[charIndex];
    let typedChar = typedValue.slice(-1);
    settext(typedValue);

    if (currentChar === null) {
      setIsTyping(false);
      return 
    }
    
    if (typedValue.length < charIndex) {
      // Handle Backspace
      setCharIndex(charIndex - 1);
      correctWrong[charIndex - 1] = "";
      setCorrectWrong([...correctWrong]);
      return;
    } 

    if (charIndex < characters.length && timeLeft > 0) {
      if (!isTyping) {
        setIsTyping(true);
      }
    

      if (typedChar === currentChar.textContent) {
        setCharIndex(charIndex + 1);
        correctWrong[charIndex] = Styles.correct;
      } else {
        setCharIndex(charIndex + 1);
        setMistakes(mistakes + 1);
        correctWrong[charIndex] = Styles.wrong;
      }

      if (charIndex === charIndex.length - 1) {
        setIsTyping(false);
      }
    } 
  };

  const handleSpeakToggle = () =>{
    if (isSpeaking){
      setIsSpeaking(false);
    }
    else if(text.trim()){
      setIsSpeaking(true);
    }
    // else{
    //   alert('Please enter text to Speak.')
    // }
  }

  return (
    <div className="w-4/5 mx-auto border-2 border-gray-300 rounded-xl shadow-2xl p-6 h-auto "
    onClick={() => inputRef.current.focus()}>
      <input
        type="text"
        className="opacity-0 -z-999 absolute"
        ref={inputRef}
        onChange={handleChange}
      />

      {timeLeft !== 0 ? (
        <div className="text-center text-lg font-medium ">
        
          {paragraph.split("").map((char, index) => (
            <span
              key={index}
              className={`${Styles.char} ${index === charIndex ? Styles.active : ""} ${
                correctWrong[index]
              }`}
              ref={(e) => (charRefs.current[index] = e)}
            >
              {char}
            </span>
          ))}
        </div>
      ) : (
        <div>
          <h2>Accuracy Matrix</h2>
        
        <p>Accuracy: <strong>{accuracy}</strong></p>

        </div>
      )}

      <div className="flex mt-10 justify-between items-center border-t-2 border-slate-50">
        <button
          onClick={handleSpeakToggle}
          className= {`text-white py-2 px-4 rounded-lg ${isSpeaking ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isSpeaking ? 'Stop Listening' : 'Start Listening'}
        </button>



        <p>
          Time Left: <strong>{timeLeft}</strong>
        </p>
        <p>
          Mistakes: <strong>{mistakes}</strong>
        </p>
        <p>
          WPM: <strong>{WPM}</strong>
        </p>
        <p>
          CPM: <strong>{CPM}</strong>
        </p>
        
        <button
          onClick={tryAgain}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Try Again
        </button>
        <TextToSpeech text={text} isSpeaking={isSpeaking} setIsSpeaking={setIsSpeaking}/>
      </div>
    </div>
  );
};

export default TextArea;
