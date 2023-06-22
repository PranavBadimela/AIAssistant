// import { useState, useEffect } from "react";
// import Logo from "../assets/Logo.svg";
// import Upload from "../assets/Upload.svg";
// import MicIcon from "../assets/MicIcon.svg";
// import SearchIcon from "../assets/searchIcon.svg";
// import { MdDelete } from "react-icons/md";
// import "./style.css";

// const AssistantAI = () => {
//   const [transcript, setTranscript] = useState("");
//   const [transcript2, setTranscript2] = useState("");
//   // console.log(transcript2)
//   const [inputText, setInputText] = useState("");
//   const [case2InputText, setCase2InputText] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [case2Answer, setCase2Answer] = useState("");
//   // const [isRecording, setIsRecording] = useState(false);
//   const [recognitionInstance, setRecognitionInstance] = useState(null);
//   const [recognitionInstance2, setRecognitionInstance2] = useState(null);
//   const [customerCode, setCustomerCode] = useState("");
//   const [micColor, setMicColor] = useState("");
//   const [excelFile, setExcelFile] = useState(null);
//   const [selectedExcelFileName, setSelectedExcelFileName] =
//     useState("No file chosen");

//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoading2, setIsLoading2] = useState(false);

//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [uploadedFileName, setUploadedFileName] = useState("No file chosen");

//   useEffect(() => {
//     const recognition = new window.webkitSpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";

//     recognition.onresult = (event) => {
//       let finalTranscript = ""; //here Iam storing my speech input EX:- Hi Hello

//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcript = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           finalTranscript += transcript + " ";
//         }
//       }

//       // console.log(transcript);
//       // console.log(finalTranscript);

//       setTranscript(finalTranscript);
//       setTranscript2(finalTranscript);
//     };

//     // console.log(recognition);

//     setRecognitionInstance(recognition);
//     setRecognitionInstance2(recognition);
//   }, []);

//   const recordAudio = () => {
//     setAnswer("");
//     setMicColor("active");
//     recognitionInstance.start();
//   };

//   const stopAudio = async () => {
//     recognitionInstance.stop();
//     setInputText("");
//     setTranscript("");
//     setMicColor("");
//     setIsLoading(true);

//     try {
//       const response = await fetch(
//         `https://genaiapi.ezinnovation.com/api/aiapis/answers?question=${transcript}${inputText}`
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

//     setIsLoading(false);
//   };

//   const recordAudio2 = () => {
//     setCase2Answer("");
//     setMicColor("active");
//     recognitionInstance2.start();
//   };

//   const stopAudio2 = async () => {
//     recognitionInstance2.stop();
//     setCase2InputText("");
//     setTranscript2("");
//     setIsLoading2(true);

//     try {
//       const response2 = await fetch(
//         `https://genaiapi.ezinnovation.com/api/aiapis/get_pandas_answers/?question=${transcript2}${case2InputText}`
//       );

//       const data2 = await response2.json();
//       console.log(data2["answer"]);

//       setCase2Answer(data2["answer"]);

//       const utterance = new SpeechSynthesisUtterance(data2["answer"]);
//       window.speechSynthesis.speak(utterance);
//     } catch (error) {
//       console.log(error);
//       const utterance = new SpeechSynthesisUtterance(transcript2);
//       setCase2Answer(transcript2);
//       window.speechSynthesis.speak(utterance);
//     }

//     setIsLoading2(false);
//   };

//   const handleInputChange = (e) => {
//     setInputText(e.target.value);
//     setAnswer("");
//   };

//   const handleCase2InputChange = (e) => {
//     setCase2InputText(e.target.value);
//     setCase2Answer("");
//   };

//   const HandleFile = (e) => {
//     const file = e.target.files[0] || e.dataTransfer.files[0];
//     setUploadedFile(file);

//     if (
//       file &&
//       (file.type === "text/plain" || file.type === "application/pdf")
//     ) {
//       setUploadedFileName(file.name);
//     } else {
//       setUploadedFileName("*Invalid file format, please select txt or pdf");
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];

//     const extensions = ["txt", "pdf"];
//     const fileExtensions = file.name.split(".").pop().toLowerCase();

//     if (extensions.includes(fileExtensions)) {
//       setUploadedFile(file);
//       setUploadedFileName(file ? file.name : "No file uploaded");
//     } else {
//       setUploadedFileName("*Invalid file format, please select txt or pdf");
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//   };

//   const handleExcelDrop = (e) => {
//     e.preventDefault();
//     const myExcelFile = e.dataTransfer.files[0];

//     const allowedExtensions = ["xls", "xlsx", "csv"];
//     const fileExtension = myExcelFile.name.split(".").pop().toLowerCase();

//     if (allowedExtensions.includes(fileExtension)) {
//       setExcelFile(myExcelFile);
//       setSelectedExcelFileName(
//         myExcelFile ? myExcelFile.name : "No file uploaded"
//       );
//     } else {
//       setSelectedExcelFileName(
//         "*Invalid file format please select XLS or XLSX"
//       );
//     }
//   };

//   const handleExcelDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleExcelDragEnter = (e) => {
//     e.preventDefault();
//   };

//   const handleExcelDragLeave = (e) => {
//     e.preventDefault();
//   };

//   const handleDelete = () => {
//     setUploadedFile(null);
//     setUploadedFileName("No file chosen");
//   };

//   const handleDeleteExcelFile = () => {
//     setExcelFile(null);
//     setSelectedExcelFileName("No file chosen");
//   };

//   const handleUpload = async () => {
//     if (
//       uploadedFile &&
//       (uploadedFile.type === "text/plain" ||
//         uploadedFile.type === "application/pdf")
//     ) {
//       const formData = new FormData();
//       formData.append("customerCode", customerCode);
//       formData.append("customerName", uploadedFileName);
//       formData.append("file", uploadedFile);

//       try {
//         const response = await fetch(
//           "https://genaiapi.ezinnovation.com/api/aiapis/upload_customer_document/",
//           {
//             method: "POST",
//             body: formData,
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           console.log("Upload successful:", data);
//         } else {
//           console.log("Upload failed:");
//         }
//       } catch (error) {
//         console.log("Error occurred while uploading:", error);
//       }
//     } else {
//       console.log("Invalid file format. Only .txt and .pdf files are allowed.");
//     }
//   };

//   const handleExcelFile = (e) => {
//     let file = e.target.files[0];
//     setExcelFile(file);

//     if (
//       file &&
//       (file.type === "application/vnd.ms-excel" ||
//         file.type ===
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
//     ) {
//       setSelectedExcelFileName(file ? file.name : "No file chosen");
//     } else {
//       setSelectedExcelFileName(
//         "*Invalid file format please select XLS or XLSX"
//       );
//     }
//   };

//   const handleUploadExcelFile = async () => {
//     const excelFormData = new FormData();
//     excelFormData.append("file", excelFile);

//     if (
//       excelFile &&
//       (excelFile.type === "application/vnd.ms-excel" ||
//         excelFile.type ===
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
//     ) {
//       try {
//         const response = await fetch(
//           "https://genaiapi.ezinnovation.com/api/aiapis/upload_excel_document/",
//           {
//             method: "POST",
//             body: excelFormData,
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           console.log("Upload successful:", data);
//         } else {
//           console.log("Upload failed:");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       console.log("Invalid file format");
//     }
//   };

//   const handleDropdownChange = (e) => {
//     // setSelectedOption(e.target.value);

//     if (e.target.value === "option1") {
//       setCustomerCode("EZ Innovation Services");
//     } else if (e.target.value === "option2") {
//       setCustomerCode("Cargo Hub");
//     } else if (e.target.value === "option3") {
//       setCustomerCode("Flexivan");
//     } else if (e.target.value === "option4") {
//       setCustomerCode("TimeSheet");
//     } else if (e.target.value === "option5") {
//       setCustomerCode("CM2");
//     }
//   };

//   return (
//     <div className="main-container">
//       <div className="nav-bar">
//         <img src={Logo} className="company-logo" />
//       </div>

//       <div className="main-assistant-container">
//         <p className="title-text">AI Assistant</p>

//         <div className="assistant-container-items">
//           {/* upload-container */}
//           <div className="left-upload-container">
//             <p className="title-text">Upload Documents</p>

//             <div className="drop-down-container">
//               <select
//                 name="dropdown"
//                 id="dropdown"
//                 onChange={handleDropdownChange}
//               >
//                 <option value="">Select Product Name</option>
//                 <option value="option1">EZ Innovation Services</option>
//                 <option value="option2">Cargo Hub</option>
//                 <option value="option3">FlexiVan</option>
//                 <option value="option4">TimeSheet</option>
//                 <option value="option5">CM2</option>
//               </select>
//             </div>

//             <div
//               className="drag-and-drop-container"
//               onDrop={handleDrop}
//               onDragOver={handleDragOver}
//               onDragEnter={handleDragEnter}
//               onDragLeave={handleDragLeave}
//             >
//               <div>
//                 <label htmlFor="file-input">
//                   <img src={Upload} alt="Upload" className="upload-icon" />
//                 </label>

//                 <input
//                   type="file"
//                   id="file-input"
//                   name="file"
//                   className="hidden-file-input"
//                   onChange={HandleFile}
//                 />
//                 <p className="para-text">
//                   Drag & Drop or Choose file to Upload
//                 </p>
//                 <p className="para-text1">Supported formats PDF,TXT</p>
//               </div>
//             </div>

//             {uploadedFile &&
//               uploadedFileName !==
//                 "*Invalid file format, please select txt or pdf" && (
//                 <div className="show-uploaded-file">
//                   <p className="file-name">{uploadedFileName}</p>
//                   <MdDelete
//                     className="delete-file-btn"
//                     onClick={handleDelete}
//                   />
//                 </div>
//               )}

//             <div className="button-container">
//               <p
//                 className={
//                   uploadedFileName ===
//                   "*Invalid file format, please select txt or pdf"
//                     ? "file-name invalid"
//                     : "file-name"
//                 }
//               >
//                 {uploadedFileName}
//               </p>

//               <button className="upload-btn" onClick={handleUpload}>
//                 Upload
//               </button>
//             </div>
//           </div>

//           {/* voice-input-container */}
//           <div className="right-container">
//             {/* Nav-section */}
//             <div className="voice-input-nav-section">
//               <div className="text-input-container">
//                 <input
//                   className="input-text"
//                   type="text"
//                   value={inputText}
//                   onChange={handleInputChange}
//                   placeholder="Text Here"
//                 />
//                 <img
//                   src={SearchIcon}
//                   className="search-icon"
//                   onClick={stopAudio}
//                 />
//               </div>

//               <div>
//                 <img
//                   src={MicIcon}
//                   className={`mic-icon ${micColor}`}
//                   onClick={recordAudio}
//                 />
//               </div>
//             </div>

//             {/* Horizontal Line */}
//             <div className="hr-line"></div>

//             {/* Question and Answer container */}
//             <div className="question-and-answer-container">
//               <button className="answer-btn" onClick={stopAudio}>
//                 Answer
//               </button>

//               {transcript && (
//                 <p>
//                   <span>Question (Speech Input):</span> {transcript}
//                 </p>
//               )}

//               {inputText && (
//                 <p>
//                   <span>Question (Text Input):</span> {inputText}
//                 </p>
//               )}

//               {isLoading && (
//                 <div className="loader">
//                   <div className="dot"></div>
//                   <div className="dot"></div>
//                   <div className="dot"></div>
//                 </div>
//               )}

//               {answer && (
//                 <p className="testing">
//                   <span className="answer">Answer:</span> {answer}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Bottom Container */}

//         <p className="title-text" style={{ marginTop: "10px" }}>
//           Use Case2
//         </p>
//         <div className="bottom-container">
//           <div className="left-upload-container">
//             <p className="title-text">Upload Excel Files</p>

//             <div
//               className="drag-and-drop-container"
//               onDrop={handleExcelDrop}
//               onDragOver={handleExcelDragOver}
//               onDragEnter={handleExcelDragEnter}
//               onDragLeave={handleExcelDragLeave}
//             >
//               <div>
//                 <label htmlFor="excel-file-input">
//                   <img src={Upload} alt="Upload" className="upload-icon" />
//                 </label>

//                 <input
//                   type="file"
//                   id="excel-file-input"
//                   name="excelFile"
//                   className="hidden-file-input"
//                   onChange={handleExcelFile}
//                 />
//                 <p className="para-text">
//                   Drag & Drop or Choose file to Upload
//                 </p>
//                 <p className="para-text1">Supported formats XLS,XLSX</p>
//               </div>
//             </div>

//             {excelFile &&
//               selectedExcelFileName !==
//                 "*Invalid file format please select XLS or XLSX" && (
//                 <div className="show-uploaded-file">
//                   <p className="file-name">{selectedExcelFileName}</p>
//                   <MdDelete
//                     className="delete-file-btn"
//                     onClick={handleDeleteExcelFile}
//                   />
//                 </div>
//               )}

//             <div className="button-container">
//               <p
//                 className={
//                   selectedExcelFileName ===
//                   "*Invalid file format please select XLS or XLSX"
//                     ? "file-name invalid"
//                     : "file-name"
//                 }
//               >
//                 {selectedExcelFileName}
//               </p>

//               <button className="upload-btn" onClick={handleUploadExcelFile}>
//                 Upload
//               </button>
//             </div>
//           </div>

//           <div className="bottom-right-container">
//             <div className="voice-input-nav-section">
//               <div className="text-input-container">
//                 <input
//                   className="input-text"
//                   type="text"
//                   value={case2InputText}
//                   onChange={handleCase2InputChange}
//                   placeholder="Search Here"
//                 />
//                 <img
//                   src={SearchIcon}
//                   className="search-icon"
//                   onClick={stopAudio2}
//                 />
//               </div>

//               <div>
//                 <img
//                   src={MicIcon}
//                   className="mic-icon"
//                   onClick={recordAudio2}
//                 />
//               </div>
//             </div>

//             <div className="hr-line"></div>

//             <button className="answer-btn" onClick={stopAudio2}>
//               Answer
//             </button>

//             {isLoading2 && (
//               <div className="loader">
//                 <div className="dot"></div>
//                 <div className="dot"></div>
//                 <div className="dot"></div>
//               </div>
//             )}

//             {transcript2 && (
//               <p>
//                 <span>Question (Speech Input):</span> {transcript2}
//               </p>
//             )}

//             {case2InputText && (
//               <p>
//                 <span>Question (Text Input):</span> {case2InputText}
//               </p>
//             )}

//             {case2Answer && (
//               <p className="testing">
//                 <span className="answer">Answer:</span> {case2Answer}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssistantAI;
