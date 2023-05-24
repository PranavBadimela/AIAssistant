import { useState, useEffect } from "react";
import "./style.css";
import { BsFillMicFill } from "react-icons/bs";
import { FaRobot } from "react-icons/fa";

const MyAssist = () => {
  const [transcript, setTranscript] = useState("");
  const [answer, setAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [buttonText, setButtonText] = useState("Say Something");
  const [recognitionInstance, setRecognitionInstance] = useState(null);

  console.log(transcript);
  // console.log(recognitionInstance);

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      // let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        }
        // else {
        //   interimTranscript += transcript;
        // }
      }

      setTranscript(finalTranscript);
    };

    setRecognitionInstance(recognition);
  }, []);

  const recordAudio = () => {
    setAnswer("");
    setButtonText("Recording...");
    setIsRecording(!isRecording);
    recognitionInstance.start();
  };

  const stopAudio = async () => {
    setButtonText("Say Something");
    setIsRecording(!isRecording);
    recognitionInstance.stop();

    const response = await fetch(
      `http://127.0.0.1:8000/answers?question=${transcript}`
    );
    const data = await response.json();
    // console.log(data);
    setAnswer(data["answer"]);

    const utterance = new SpeechSynthesisUtterance(data["answer"]);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="main-container">
      <div className="heading-container">
        <h2> My AI Assistant </h2>
        <FaRobot className="robot-icon" />
      </div>

      <div className="assist-container">
        <div className="input-container">
          <BsFillMicFill
            className="mic-icon"
            onMouseOver={recordAudio}
            onMouseLeave={stopAudio}
          />

          <p>{buttonText}</p>
        </div>

        {transcript && (
          <p>
            <span>Question:</span> {transcript}
          </p>
        )}

        {answer && <p>Answer: {answer}</p>}
      </div>
    </div>
  );
};

export default MyAssist;
