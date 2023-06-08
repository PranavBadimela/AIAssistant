// import React from "react";
import { useState, useEffect } from "react";
import Logo from "../assets/Logo.svg";
import Upload from "../assets/Upload.svg";
import MicIcon from "../assets/MicIcon.svg";
import SearchIcon from "../assets/searchIcon.svg";
import "./style.css";

const AssistantAI = () => {
  const [transcript, setTranscript] = useState("");
  const [inputText, setInputText] = useState("");
  const [answer, setAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  // const [buttonText, setButtonText] = useState("Say Something");
  const [recognitionInstance, setRecognitionInstance] = useState(null);
  const [file, setFile] = useState(null);
  const [customerCode, setCustomerCode] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("No file chosen");
  const [micColor, setMicColor] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [selectedExcelFileName, setSelectedExcelFileName] =
    useState("No file chosen");

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

      setTranscript(finalTranscript);
    };

    setRecognitionInstance(recognition);
  }, []);

  const recordAudio = () => {
    setAnswer("");
    setIsRecording(!isRecording);
    // setButtonText("Recording...");
    setMicColor("active");
    recognitionInstance.start();
  };

  const stopAudio = async () => {
    // setButtonText("Say Something");
    setIsRecording(!isRecording);
    recognitionInstance.stop();
    setInputText("");
    setTranscript("");
    setMicColor("");

    try {
      const response = await fetch(
        `https://aiassistantapi.mindwavetech.com/api/aiapis/answers?question=${transcript}${inputText}`
      );

      const data = await response.json();
      setAnswer(data["answer"]);

      const utterance = new SpeechSynthesisUtterance(data["answer"]);
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.log(err);
      const utterance = new SpeechSynthesisUtterance(transcript);
      setAnswer(transcript);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const HandleFile = (e) => {
    let file = e.target.files[0];
    setFile(file);

    setSelectedFileName(file ? file.name : "No file chosen");

    const fileName = file.name;

    setCustomerName(fileName);

    if (
      file &&
      (file.type === "text/plain" || file.type === "application/pdf")
    ) {
      setSelectedFileName(file ? file.name : "No file chosen");
    } else {
      setSelectedFileName("*Invalid file format please select txt or pdf");
    }
  };

  const handleUpload = async () => {
    // Check if the selected file is .txt or .pdf
    if (
      file &&
      (file.type === "text/plain" || file.type === "application/pdf")
    ) {
      const formData = new FormData();
      formData.append("customerCode", customerCode);
      formData.append("customerName", customerName);
      formData.append("file", file);

      try {
        const response = await fetch(
          "https://aiassistantapi.mindwavetech.com/api/aiapis/upload_customer_document/",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Upload successful:", data);
        } else {
          console.log("Upload failed:");
        }
      } catch (error) {
        console.log("Error occurred while uploading:", error);
      }
    } else {
      console.log("Invalid file format. Only .txt and .pdf files are allowed.");
    }
  };

  const handleExcelFile = (e) => {
    let file = e.target.files[0];
    setExcelFile(file);

    setSelectedExcelFileName(file ? file.name : "No file chosen");
  };

  const handleUploadExcelFile = async () => {
    const excelFormData = new FormData();
    excelFormData.append("file", excelFile);

    try {
      const response = await fetch(
        "https://aiassistantapi.mindwavetech.com/api/aiapis/upload_excel_document/",
        {
          method: "POST",
          body: excelFormData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Upload successful:", data);
      } else {
        console.log("Upload failed:");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDropdownChange = (e) => {
    // setSelectedOption(e.target.value);

    if (e.target.value === "option1") {
      setCustomerCode("EZ Innovation Services");
    } else if (e.target.value === "option2") {
      setCustomerCode("Cargo Hub");
    } else if (e.target.value === "option3") {
      setCustomerCode("Flexivan");
    } else if (e.target.value === "option4") {
      setCustomerCode("TimeSheet");
    } else if (e.target.value === "option5") {
      setCustomerCode("CM2");
    }
  };

  // const micColor = isRecording ? "redd" : "orange";

  return (
    <div className="main-container">
      <div className="nav-bar">
        <img src={Logo} className="company-logo" />
      </div>

      <div className="main-assistant-container">
        <p className="title-text">AI Assistant</p>

        <div className="assistant-container-items">
          {/* upload-container */}
          <div className="left-upload-container">
            <p className="title-text">Upload Documents</p>

            <div className="drop-down-container">
              <select
                name="dropdown"
                id="dropdown"
                onChange={handleDropdownChange}
              >
                <option value="">Select Product Name</option>
                <option value="option1">EZ Innovation Services</option>
                <option value="option2">Cargo Hub</option>
                <option value="option3">FlexiVan</option>
                <option value="option4">TimeSheet</option>
                <option value="option5">CM2</option>
              </select>
            </div>

            <div className="drag-and-drop-container">
              <div>
                <label htmlFor="file-input">
                  <img src={Upload} alt="Upload" />
                </label>

                <input
                  type="file"
                  id="file-input"
                  name="file"
                  className="hidden-file-input"
                  onChange={HandleFile}
                />
                <p className="para-text">
                  Drag & Drop or Choose file to Upload
                </p>
                <p className="para-text1">Supported formats PDF,TXT</p>
              </div>
            </div>

            <div className="button-container">
              <p
                className={
                  selectedFileName ===
                  "*Invalid file format please select txt or pdf"
                    ? "file-name invalid"
                    : "file-name"
                }
              >
                {selectedFileName}
              </p>

              {/* <p className="file-name">{selectedFileName}</p> */}
              <button className="upload-btn" onClick={handleUpload}>
                Upload
              </button>
            </div>
          </div>

          {/* voice-input-container */}
          <div className="right-container">
            {/* Nav-section */}
            <div className="voice-input-nav-section">
              <div className="text-input-container">
                <input
                  className="input-text"
                  type="text"
                  value={inputText}
                  onChange={handleInputChange}
                  placeholder="Text Here"
                />
                <img src={SearchIcon} className="search-icon" />
              </div>

              <div>
                <img
                  src={MicIcon}
                  className={`mic-icon ${micColor}`}
                  onClick={recordAudio}
                />
              </div>
            </div>

            {/* Horizontal Line */}
            <div className="hr-line"></div>

            {/* Question and Answer container */}
            <div className="question-and-answer-container">
              <button className="answer-btn" onClick={stopAudio}>
                Answer
              </button>

              {transcript && (
                <p>
                  <span>Question (Speech Input):</span> {transcript}
                </p>
              )}

              {inputText && (
                <p>
                  <span>Question (Text Input):</span> {inputText}
                </p>
              )}

              {answer && (
                <p className="testing">
                  <span className="answer">Answer:</span> {answer}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Container */}

        <div className="bottom-container">
          <div className="left-upload-container">
            <p className="title-text">Upload Excel Files</p>

            <div className="drag-and-drop-container">
              <div>
                <label htmlFor="excel-file-input">
                  <img src={Upload} alt="Upload" />
                </label>

                <input
                  type="file"
                  id="excel-file-input"
                  name="excelFile"
                  className="hidden-file-input"
                  onChange={handleExcelFile}
                />
                <p className="para-text">
                  Drag & Drop or Choose file to Upload
                </p>
                <p className="para-text1">Supported formats XLS</p>
              </div>
            </div>

            <div className="button-container">
              <p className="file-name">{selectedExcelFileName}</p>
              <button className="upload-btn" onClick={handleUploadExcelFile}>
                Upload
              </button>
            </div>
          </div>

          <div className="bottom-right-container"></div>
        </div>
      </div>
    </div>
  );
};

export default AssistantAI;
