// import { useState, useEffect } from "react";
// import "./style.css";
// import { BsFillMicFill } from "react-icons/bs";
// import { FaRobot } from "react-icons/fa";

// const MyAssist = () => {
//   const [transcript, setTranscript] = useState("");
//   const [inputText, setInputText] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [buttonText, setButtonText] = useState("Say Something");
//   const [recognitionInstance, setRecognitionInstance] = useState(null);

//   console.log(transcript);
//   console.log(inputText);
//   // console.log(recognitionInstance);

//   useEffect(() => {
//     const recognition = new window.webkitSpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";

//     recognition.onresult = (event) => {
//       let finalTranscript = "";

//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcript = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           finalTranscript += transcript + " ";
//         }
//       }

//       setTranscript(finalTranscript);
//     };

//     setRecognitionInstance(recognition);
//   }, []);

//   const recordAudio = () => {
//     setAnswer("");
//     setButtonText("Recording...");
//     setIsRecording(!isRecording);
//     recognitionInstance.start();
//   };

//   const stopAudio = async () => {
//     setButtonText("Say Something");
//     setIsRecording(!isRecording);
//     recognitionInstance.stop();

//     try {
//       const response = await fetch(
//         `https://aiassistantapi.mindwavetech.com/api/aiapis/answers?question=${transcript}${inputText}`
//       );

//       const data = await response.json();
//       setAnswer(data["answer"]);

//       const utterance = new SpeechSynthesisUtterance(data["answer"]);
//       window.speechSynthesis.speak(utterance);
//     } catch (err) {
//       console.log(err);
//       const utterance = new SpeechSynthesisUtterance(transcript);
//       setAnswer(transcript);
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   const handleInputChange = (e) => {
//     setInputText(e.target.value);
//   };

//   // const getAnswerFromInput = async () => {
//   //   setAnswer("");
//   //   setTranscript("");

//   //   try {
//   //     const response = await fetch(
//   //       `https://aiassistantapi.mindwavetech.com/api/aiapis/answers?question=${inputText}`
//   //     );

//   //     const data = await response.json();
//   //     setAnswer(data["answer"]);

//   //     const utterance = new SpeechSynthesisUtterance(data["answer"]);
//   //     window.speechSynthesis.speak(utterance);
//   //   } catch (err) {
//   //     console.log(err);
//   //     const utterance = new SpeechSynthesisUtterance(inputText);
//   //     setAnswer(inputText);
//   //     window.speechSynthesis.speak(utterance);
//   //   }
//   // };

//   return (
//     <div className="main-container">
//       <div className="heading-container">
//         <h2>My AI Assistant</h2>
//         <FaRobot className="robot-icon" />
//       </div>

//       <div className="assist-container">
//         <div className="input-container">
//           <input
//             type="text"
//             value={inputText}
//             onChange={handleInputChange}
//             className="input-text"
//           />
//           <div>
//             <BsFillMicFill className="mic-icon" onClick={recordAudio} />
//             <p className="mic-text">{buttonText}</p>
//           </div>
//         </div>
//         <button className="stop-button" onClick={stopAudio}>
//           Answer
//         </button>

//         {transcript && (
//           <p>
//             <span>Question (Speech Input):</span> {transcript}..?
//           </p>
//         )}

//         {inputText && (
//           <p>
//             <span>Question (Text Input):</span> {inputText}
//           </p>
//         )}

//         {/* <button className="answer-button" onClick={getAnswerFromInput}>
//           Get Answer from Text Input
//         </button> */}

//         {answer && (
//           <p>
//             <span className="answer">Answer:</span> {answer}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyAssist;



// **********************************************************************************************************


// import { useState, useEffect } from "react";
// import "./style.css";
// import { BsFillMicFill } from "react-icons/bs";
// import { FaRobot } from "react-icons/fa";
// // import EZ from "../TextFiles/EZ Innovation.txt";
// // import CM2 from "../TextFiles/CM2 Project.txt";
// // import MW from "../TextFiles/Mind WaveAi Solutions.txt";

// // const fileData = [
// //   {
// //     id: 1,
// //     name: EZ,
// //   },
// //   {
// //     id: 2,
// //     name: CM2,
// //   },
// //   {
// //     id: 3,
// //     name: MW,
// //   },
// // ];

// const MyAssist = () => {
//   const [transcript, setTranscript] = useState("");
//   const [inputText, setInputText] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [buttonText, setButtonText] = useState("Say Something");
//   const [recognitionInstance, setRecognitionInstance] = useState(null);
//   const [file, setFile] = useState(null);
//   const [customerCode, setCustomerCode] = useState("");
//   const [customerName, setCustomerName] = useState("");
//   const [selectedOption, setSelectedOption] = useState("");

//   useEffect(() => {
//     const recognition = new window.webkitSpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";

//     recognition.onresult = (event) => {
//       let finalTranscript = "";

//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcript = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           finalTranscript += transcript + " ";
//         }
//       }

//       setTranscript(finalTranscript);
//     };

//     setRecognitionInstance(recognition);
//   }, []);

//   const recordAudio = () => {
//     setAnswer("");
//     setButtonText("Recording...");
//     setIsRecording(!isRecording);
//     recognitionInstance.start();
//   };

//   const stopAudio = async () => {
//     setButtonText("Say Something");
//     setIsRecording(!isRecording);
//     recognitionInstance.stop();
//     setInputText("");
//     setTranscript("");

//     try {
//       const response = await fetch(
//         `https://aiassistantapi.mindwavetech.com/api/aiapis/answers?question=${transcript}${inputText}`
//       );

//       const data = await response.json();
//       setAnswer(data["answer"]);

//       const utterance = new SpeechSynthesisUtterance(data["answer"]);
//       window.speechSynthesis.speak(utterance);
//     } catch (err) {
//       console.log(err);
//       const utterance = new SpeechSynthesisUtterance(transcript);
//       setAnswer(transcript);
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   const handleInputChange = (e) => {
//     setInputText(e.target.value);
//   };

//   const HandleFile = (e) => {
//     let file = e.target.files[0];
//     setFile(file);

//     const fileName = file.name;
//     const dotIndex = fileName.lastIndexOf(".");
//     const nameBeforeDot =
//       dotIndex !== -1 ? fileName.substring(0, dotIndex) : fileName;

//     setCustomerCode(nameBeforeDot);

//     setCustomerName(fileName);
//   };

//   const handleUpload = async () => {
//     // e.preventDefault();
//     const formData = new FormData();
//     formData.append("customerCode", customerCode);
//     formData.append("customerName", customerName);
//     formData.append("file", file);

//     try {
//       const response = await fetch(
//         "https://aiassistantapi.mindwavetech.com/api/aiapis/upload_customer_document/",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Upload successful:", data);
//       } else {
//         console.log("Upload failed:");
//       }
//     } catch (error) {
//       console.log("Error occurred while uploading:", error);
//     }
//   };

//   const handleDropdownChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

//   return (
//     <div className="main-container">
//       <div className="heading-container">
//         <h2>My AI Assistant</h2>
//         <FaRobot className="robot-icon" />
//       </div>

//       <div className="assist-container">
//         <div className="input-container">
//           <input
//             className="input-text"
//             type="text"
//             value={inputText}
//             onChange={handleInputChange}
//           />
//           <div>
//             <BsFillMicFill className="mic-icon" onClick={recordAudio} />
//             <p className="mic-text">{buttonText}</p>
//           </div>
//         </div>

//         {/* <form onSubmit={handleUpload}>
//           <input type="file" name="file" onChange={(e) => HandleFile(e)} />
//           <button type="submit">Upload</button>
//         </form> */}

//         <div className="file-upload-container">
//           <input type="file" name="file" onChange={(e) => HandleFile(e)} />
//           <button type="submit" className="upload-btn" onClick={handleUpload}>
//             Upload
//           </button>
//         </div>

//         <div className="drop-down-container">
//           <select name="dropdown" id="dropdown" onChange={handleDropdownChange}>
//             <option value="option1">Ez Innovations</option>
//             <option value="option2">Castus Info</option>
//             <option value="option3">Mind Wave</option>
//           </select>
//         </div>

//         <button className="answer-button" onClick={stopAudio}>
//           Answer
//         </button>

//         {transcript && (
//           <p>
//             <span>Question (Speech Input):</span> {transcript}
//           </p>
//         )}

//         {inputText && (
//           <p>
//             <span>Question (Text Input):</span> {inputText}
//           </p>
//         )}

//         {answer && (
//           <p>
//             <span className="answer">Answer:</span> {answer}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyAssist;
