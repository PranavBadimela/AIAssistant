// import { useState, useEffect } from "react";
// import "./style.css";
// import { BsFillMicFill } from "react-icons/bs";
// import { FaRobot } from "react-icons/fa";
// // import { TbLogout } from "react-icons/tb";

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
//   // const [selectedOption, setSelectedOption] = useState("");

//   // console.log(selectedOption)

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

//     setSelectedFileName(file ? file.name : "No file chosen");

//     const fileName = file.name;
//     // const dotIndex = fileName.lastIndexOf(".");
//     // const nameBeforeDot =
//     //   dotIndex !== -1 ? fileName.substring(0, dotIndex) : fileName;

//     // setCustomerCode(nameBeforeDot);
//     setCustomerName(fileName);
//   };

//   const handleUpload = async () => {
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
//     // setSelectedOption(e.target.value);

//     if (e.target.value === "option1") {
//       setCustomerCode("CM2");
//     } else if (e.target.value === "option2") {
//       setCustomerCode("Cargo Hub");
//     } else if (e.target.value === "option3") {
//       setCustomerCode("Flexivan");
//     } else if (e.target.value === "option4") {
//       setCustomerCode("TimeSheet");
//     }
//   };

//   const [selectedFileName, setSelectedFileName] = useState("No file chosen");

//   return (
//     <div className="main-container">
//       <div className="heading-container">
//         <h2>My AI Assistant</h2>
//         <FaRobot className="robot-icon" />
//       </div>

//       <div className="assist-container">
//         {/* <div className="nav-icons">
//           <p>AI</p>
//           <TbLogout className="nav-right-icon"/>
//         </div> */}

//         <div className="assist-content-container">
//           <div className="input-container">
//             <input
//               className="input-text"
//               type="text"
//               value={inputText}
//               onChange={handleInputChange}
//             />
//             <div>
//               <BsFillMicFill className="mic-icon" onClick={recordAudio} />
//               <p className="mic-text">{buttonText}</p>
//             </div>
//           </div>

//           <div className="file-upload-container">
//             <div className="drop-down-container">
//               <select
//                 name="dropdown"
//                 id="dropdown"
//                 onChange={handleDropdownChange}
//               >
//                 <option value="">Select Product Name</option>
//                 <option value="option1">CM2</option>
//                 <option value="option2">Cargo Hub</option>
//                 <option value="option3">FlexiVan</option>
//                 <option value="option4">TimeSheet</option>
//               </select>
//             </div>

//             {/* <input type="file" name="file" onChange={HandleFile} /> */}

//             <div className="file-input-container">
//               <label htmlFor="file-input" className="custom-file-input">
//                 Choose File
//               </label>
//               <span className="selected-file-name">{selectedFileName}</span>
//               <input
//                 type="file"
//                 id="file-input"
//                 name="file"
//                 onChange={HandleFile}
//                 className="hidden-file-input"
//               />
//             </div>

//             <button type="submit" className="upload-btn" onClick={handleUpload}>
//               Upload
//             </button>
//           </div>

//           <button className="answer-button" onClick={stopAudio}>
//             Answer
//           </button>

//           {transcript && (
//             <p>
//               <span>Question (Speech Input):</span> {transcript}
//             </p>
//           )}

//           {inputText && (
//             <p>
//               <span>Question (Text Input):</span> {inputText}
//             </p>
//           )}

//           {answer && (
//             <p>
//               <span className="answer">Answer:</span> {answer}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyAssist;
