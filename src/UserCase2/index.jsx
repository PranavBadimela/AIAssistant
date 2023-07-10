import { useState, useEffect } from "react";
import Upload from "../assets/Upload.svg";
import MicIcon from "../assets/MicIcon.svg";
import SearchIcon from "../assets/searchIcon.svg";
import { MdDelete } from "react-icons/md";
import "./style.css";

const UserCase2 = () => {
  const [transcript2, setTranscript2] = useState("");
  const [case2InputText, setCase2InputText] = useState("");
  const [case2Answer, setCase2Answer] = useState("");
  const [recognitionInstance2, setRecognitionInstance2] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [selectedExcelFileName, setSelectedExcelFileName] =
    useState("No file chosen");
  const [isLoading2, setIsLoading2] = useState(false);
  const [micColor, setMicColor] = useState("");
  const [uploadMessage, setUploadMessage] = useState(false);
  const [case2questionText, setCase2QuestionText] = useState("");

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

      setTranscript2(finalTranscript);
    };

    setRecognitionInstance2(recognition);

    window.onbeforeunload = () => {
      window.speechSynthesis.cancel();
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const recordAudio2 = () => {
    setCase2Answer("");
    setMicColor("active");
    setCase2InputText("");
    setCase2QuestionText("");
    recognitionInstance2.start();
  };

  const stopAudio2 = async () => {
    recognitionInstance2.stop();
    setMicColor("");
    setIsLoading2(true);
    setCase2Answer("");

    try {
      const response2 = await fetch(
        `https://genaiapi.ezinnovation.com/api/aiapis/get_pandas_answers/?question=${transcript2}${case2InputText}`
      );

      const data2 = await response2.json();

      setCase2Answer(data2["answer"]);

      const utterance = new SpeechSynthesisUtterance(data2["answer"]);
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.log(error);
      const utterance = new SpeechSynthesisUtterance(transcript2);
      setCase2Answer(transcript2);
      window.speechSynthesis.speak(utterance);
    }

    setIsLoading2(false);
  };

  const handleCase2InputKeyDown = (e) => {
    if (e.key === "Enter") {
      stopAudio2();
    }
  };

  const handleCase2InputChange = (e) => {
    setCase2InputText(e.target.value);
    setCase2QuestionText(e.target.value);
    setCase2Answer("");
    setTranscript2("");
  };

  const handleCase2InputHover = () => {
    setCase2InputText("");
  };

  const handleExcelDrop = (e) => {
    e.preventDefault();
    const myExcelFile = e.dataTransfer.files[0];

    const allowedExtensions = ["xls", "xlsx", "csv"];
    const fileExtension = myExcelFile.name.split(".").pop().toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
      setExcelFile(myExcelFile);
      setSelectedExcelFileName(
        myExcelFile ? myExcelFile.name : "No file uploaded"
      );
      setUploadMessage(false);
    } else {
      setSelectedExcelFileName(
        "*Invalid file format please select XLS or XLSX"
      );
      setUploadMessage(false);
    }
  };

  const handleExcelDragOver = (e) => {
    e.preventDefault();
  };

  const handleExcelDragEnter = (e) => {
    e.preventDefault();
  };

  const handleExcelDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDeleteExcelFile = () => {
    setExcelFile(null);
    setSelectedExcelFileName("No file chosen");
  };

  const handleExcelFile = (e) => {
    let file = e.target.files[0];
    setExcelFile(file);

    if (
      file &&
      (file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    ) {
      setSelectedExcelFileName(file ? file.name : "No file chosen");
      setUploadMessage(false);
    } else {
      setSelectedExcelFileName(
        "*Invalid file format please select XLS or XLSX"
      );
      setUploadMessage(false);
    }
  };

  const handleUploadExcelFile = async () => {
    const excelFormData = new FormData();
    excelFormData.append("file", excelFile);

    if (
      excelFile &&
      (excelFile.type === "application/vnd.ms-excel" ||
        excelFile.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    ) {
      try {
        const response = await fetch(
          "https://genaiapi.ezinnovation.com/api/aiapis/upload_excel_document/",
          {
            method: "POST",
            body: excelFormData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Uploaded successfully:", data);
          setUploadMessage(true);
          setExcelFile(null);
          setSelectedExcelFileName("No file chosen");
        } else {
          console.log("Upload failed:");
          setUploadMessage(false);
        }
      } catch (error) {
        console.log(error);
        setUploadMessage(false);
      }
    } else {
      console.log("Invalid file format");
    }
  };

  return (
    <div className="case2-container">
      <div className="main-assistant-cas2-container">
        <p className="title-text" style={{ marginTop: "5px" }}>
          Use Case 2 <span className="suffix-text">(XLS Files)</span>
        </p>
        <div className="bottom-container">
          <div className="case2-left-upload-container">
            <div
              className="case2-drag-and-drop-container"
              onDrop={handleExcelDrop}
              onDragOver={handleExcelDragOver}
              onDragEnter={handleExcelDragEnter}
              onDragLeave={handleExcelDragLeave}
            >
              <div>
                <label htmlFor="excel-file-input">
                  <img src={Upload} alt="Upload" className="upload-icon" />
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
                <p className="para-text1">Supported formats XLS,XLSX</p>
              </div>
            </div>

            {uploadMessage ? (
              <p style={{ fontWeight: "bold" }}>File Uploaded Successfully</p>
            ) : (
              excelFile &&
              selectedExcelFileName !==
                "*Invalid file format please select XLS or XLSX" && (
                <div className="show-uploaded-file">
                  <p className="file-name">{selectedExcelFileName}</p>
                  <MdDelete
                    className="delete-file-btn"
                    onClick={handleDeleteExcelFile}
                  />
                </div>
              )
            )}

            <div className="button-container">
              <p
                className={
                  selectedExcelFileName ===
                  "*Invalid file format please select XLS or XLSX"
                    ? "file-name invalid"
                    : "file-name"
                }
              >
                {selectedExcelFileName}
              </p>

              <button className="upload-btn" onClick={handleUploadExcelFile}>
                Upload
              </button>
            </div>
          </div>

          <div className="bottom-right-container">
            <div className="voice-input-nav-section">
              <div className="text-input-container">
                <input
                  className="input-text"
                  type="text"
                  value={case2InputText}
                  onChange={handleCase2InputChange}
                  onKeyDown={handleCase2InputKeyDown}
                  onClick={handleCase2InputHover}
                  placeholder="Text Here"
                />

                <img
                  src={MicIcon}
                  className={`mic-icon ${micColor}`}
                  onClick={recordAudio2}
                />
              </div>

              <div className="tool-tip">
                <div className="answer-btn" onClick={stopAudio2}>
                  <p>Answer</p>
                  <img src={SearchIcon} className="search-icon" />
                </div>

                <span className="tool-tip-text">Click Here To Get Answer</span>
              </div>
            </div>

            <div className="hr-line"></div>

            {/* <button className="answer-btn" onClick={stopAudio2}>
              Answer
            </button> */}

            {transcript2 && (
              <p>
                <span>Question (Speech Input):</span> {transcript2}
              </p>
            )}

            {case2questionText && (
              <div>
                <p>
                  <span>Question (Text Input):</span> {case2questionText}
                </p>
              </div>
            )}

            {isLoading2 && (
              <div className="loader">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            )}

            {case2Answer && (
              <p className="testing">
                <span className="answer">Answer:</span> {case2Answer}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCase2;
