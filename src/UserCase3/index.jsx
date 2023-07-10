import { useState, useEffect } from "react";
import MicIcon from "../assets/MicIcon.svg";
import SearchIcon from "../assets/searchIcon.svg";

import "./style.css";

const UserCase3 = () => {
  const [transcript3, setTranscript3] = useState("");
  const [case3InputText, setCase3InputText] = useState("");
  const [case3Answer, setCase3Answer] = useState("");
  const [recognitionInstance3, setRecognitionInstance3] = useState(null);
  const [isLoading3, setIsLoading3] = useState(false);
  const [micColor, setMicColor] = useState("");
  const [case3questionText, setCase3QuestionText] = useState("");

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        }
      }

      setTranscript3(finalTranscript);
    };

    setRecognitionInstance3(recognition);

    window.onbeforeunload = () => {
      window.speechSynthesis.cancel();
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const recordAudio3 = () => {
    setCase3Answer("");
    setMicColor("active");
    setCase3InputText("");
    setCase3QuestionText("");
    recognitionInstance3.start();
  };

  const stopAudio3 = async () => {
    recognitionInstance3.stop();
    setMicColor("");
    setIsLoading3(true);
    setCase3Answer("");

    try {
      const response3 = await fetch(
        `https://genaiapi.ezinnovation.com/api/aiapis/get_request_answers/?question=${transcript3}${case3InputText}`
      );

      const data3 = await response3.json();

      setCase3Answer(data3["answer"]);

      const utterance = new SpeechSynthesisUtterance(data3["answer"]);
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.log(error);
      const utterance = new SpeechSynthesisUtterance(transcript3);
      setCase3Answer(transcript3);
      window.speechSynthesis.speak(utterance);
    }

    setIsLoading3(false);
  };

  const handleCase3InputKeyDown = (e) => {
    if (e.key === "Enter") {
      stopAudio3();
    }
  };

  const handleCase3InputChange = (e) => {
    setCase3InputText(e.target.value);
    setCase3QuestionText(e.target.value);
    setCase3Answer("");
    setTranscript3("");
  };

  const handleCase3InputHover = () => {
    setCase3InputText("");
  };

  return (
    <div className="case3-container">
      <p className="title-text" style={{ marginTop: "5px" }}>
        Use Case 1 - <span className="suffix-text2">RampedUp Data</span>
      </p>
      <div className="case3-right-container">
        <div className="case3-voice-input-nav-section">
          <div className="case3-text-input-container">
            <input
              className="case3-input-text"
              type="text"
              value={case3InputText}
              onChange={handleCase3InputChange}
              onKeyDown={handleCase3InputKeyDown}
              onClick={handleCase3InputHover}
              placeholder="Text Here"
            />
            <img
              src={MicIcon}
              className={`mic-icon ${micColor}`}
              onClick={recordAudio3}
            />
          </div>

          <div className="tool-tip">
            <div className="answer-btn" onClick={stopAudio3}>
              <p>Answer</p>
              <img src={SearchIcon} className="search-icon" />
            </div>

            <span className="tool-tip-text">Click Here To Get Answer</span>
          </div>
        </div>

        <div className="hr-line"></div>

        {transcript3 && (
          <p>
            <span>Question (Speech Input):</span> {transcript3}
          </p>
        )}

        {case3questionText && (
          <div>
            <p>
              <span>Question (Text Input):</span> {case3questionText}
            </p>
          </div>
        )}

        {isLoading3 && (
          <div className="loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}

        {case3Answer && (
          <p className="testing">
            <span className="answer">Answer:</span> {case3Answer}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCase3;
