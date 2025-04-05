// import { useState, useEffect, useRef } from "react";
// import {
//   MagnifyingGlassIcon as SearchIcon,
//   SparklesIcon,
//   ArrowRightIcon,
//   ArrowUpTrayIcon,
//   DocumentTextIcon,
//   LinkIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import toast from "react-hot-toast";

// export default function AISearch() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState("disconnected");
//   const [pdfFiles, setPdfFiles] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const ws = useRef(null);
//   const inputRef = useRef(null);
//   const fileInputRef = useRef(null);

//   // WebSocket connection
//   useEffect(() => {
//     const connectWebSocket = () => {
//       setIsLoading(true);
//       setConnectionStatus("connecting");

//       ws.current = new WebSocket("ws://localhost:8765");

//       ws.current.onopen = () => {
//         toast.success("Connected to AI search", {
//           icon: "🔗",
//           style: {
//             background: "#1e293b",
//             color: "#fff",
//             border: "1px solid #334155"
//           }
//         });
//         setConnectionStatus("connected");
//         setIsLoading(false);
//       };

//       ws.current.onmessage = (event) => {
//         try {
//           const data = JSON.parse(event.data);
//           if (data.results) {
//             setResults(data.results);
//             setIsLoading(false);
//             // Auto-scroll to results
//             setTimeout(() => {
//               const resultsSection = document.getElementById("results-section");
//               if (resultsSection) {
//                 resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
//               }
//             }, 100);
//           }
//         } catch (error) {
//           console.error("WebSocket message parse error:", error);
//         }
//       };

//       ws.current.onerror = () => {
//         toast.error("Connection error - retrying...", {
//           icon: "⚠️",
//           style: {
//             background: "#1e293b",
//             color: "#fff",
//             border: "1px solid #334155"
//           }
//         });
//         setConnectionStatus("error");
//         setTimeout(connectWebSocket, 5000);
//       };

//       ws.current.onclose = () => {
//         setConnectionStatus("disconnected");
//         setTimeout(connectWebSocket, 5000);
//       };
//     };

//     connectWebSocket();

//     return () => {
//       if (ws.current) {
//         ws.current.close();
//       }
//     };
//   }, []);

//   // Fetch PDF files
//   useEffect(() => {
//     fetch("http://localhost:3001/files")
//       .then((res) => res.json())
//       .then((data) => {
//         setPdfFiles(data.files || []);
//       })
//       .catch(() => {
//         toast.error("Failed to fetch PDFs", {
//           icon: "❌",
//           style: {
//             background: "#1e293b",
//             color: "#fff",
//             border: "1px solid #334155"
//           }
//         });
//       });
//   }, []);

//   const sendQuery = (e) => {
//     e.preventDefault();
//     if (!query.trim()) {
//       toast("Enter a search query", {
//         icon: "🔍",
//         style: {
//           background: "#1e293b",
//           color: "#fff",
//           border: "1px solid #334155"
//         }
//       });
//       return;
//     }

//     if (ws.current && ws.current.readyState === WebSocket.OPEN) {
//       setIsLoading(true);
//       setResults([]);
//       ws.current.send(query);
//     } else {
//       setConnectionStatus("error");
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       sendQuery(e);
//     }
//   };

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file || file.type !== "application/pdf") {
//       toast.error("Please upload a PDF file", {
//         icon: "📄",
//         style: {
//           background: "#1e293b",
//           color: "#fff",
//           border: "1px solid #334155"
//         }
//       });
//       return;
//     }

//     setSelectedFile(file);

//     const formData = new FormData();
//     formData.append("pdf", file);

//     setIsLoading(true);
//     try {
//       const response = await fetch("http://localhost:3001/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         toast.success("PDF uploaded successfully!", {
//           icon: "📚",
//           style: {
//             background: "#1e293b",
//             color: "#fff",
//             border: "1px solid #334155"
//           }
//         });
//         setPdfFiles((prev) => [
//           { name: file.name, webViewLink: data.fileLink },
//           ...prev,
//         ]);
//       } else {
//         throw new Error("Upload failed");
//       }
//     } catch (err) {
//       toast.error("Error uploading file", {
//         icon: "❌",
//         style: {
//           background: "#1e293b",
//           color: "#fff",
//           border: "1px solid #334155"
//         }
//       });
//     } finally {
//       setIsLoading(false);
//       setSelectedFile(null);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//     }
//   };

//   const cancelUpload = () => {
//     setSelectedFile(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const ConnectionIndicator = () => {
//     const statusColors = {
//       connected: "bg-emerald-500",
//       connecting: "bg-amber-500",
//       disconnected: "bg-gray-500",
//       error: "bg-rose-500",
//     };

//     const statusText = {
//       connected: "Connected",
//       connecting: "Connecting...",
//       disconnected: "Disconnected",
//       error: "Connection Error",
//     };

//     return (
//       <div className="flex items-center space-x-2 text-sm">
//         <span className={`w-2.5 h-2.5 rounded-full ${statusColors[connectionStatus]} animate-pulse`}></span>
//         <span className="text-xs font-mono">{statusText[connectionStatus]}</span>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen text-white p-4 md:p-8">
//       {/* Glowing background elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full  opacity-10 blur-3xl"></div>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Hero Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
//               AI Document Intelligence
//             </span>
//           </h1>
//           <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
//             Instantly extract knowledge from your documents with our powerful AI search technology
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Left Panel - Search & Documents */}
//           <div className="w-full lg:w-2/5">
//             <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
//               {/* Search Box */}
//               <div className="p-6 border-b border-gray-700/50">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-xl font-semibold flex items-center">
//                     <SparklesIcon className="w-5 h-5 mr-2 text-cyan-400" />
//                     Ask Your Documents
//                   </h2>
//                   <ConnectionIndicator />
//                 </div>

//                 <form onSubmit={sendQuery} className="space-y-3">
//                   <div className="relative">
//                     <input
//                       ref={inputRef}
//                       type="text"
//                       value={query}
//                       onChange={(e) => setQuery(e.target.value)}
//                       onKeyDown={handleKeyDown}
//                       placeholder="e.g. 'Show me the key points from the contract...'"
//                       className="w-full p-4 pl-12 pr-14 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-200"
//                       disabled={isLoading}
//                     />

//                     <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

//                     <button
//                       type="submit"
//                       className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-200 ${
//                         isLoading || !query.trim()
//                           ? "bg-gray-600/50 text-gray-400"
//                           : "bg-cyan-600 hover:bg-cyan-500 text-white"
//                       }`}
//                       disabled={isLoading || !query.trim()}
//                     >
//                       {isLoading ? (
//                         <div className="w-5 h-5 border-2 border-gray-400/50 border-t-white rounded-full animate-spin" />
//                       ) : (
//                         <ArrowRightIcon className="w-5 h-5" />
//                       )}
//                     </button>
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <div className="text-xs text-gray-400">
//                       {selectedFile ? (
//                         <div className="flex items-center">
//                           <span className="truncate max-w-xs">{selectedFile.name}</span>
//                           <button
//                             onClick={cancelUpload}
//                             className="ml-2 text-gray-400 hover:text-white"
//                           >
//                             <XMarkIcon className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ) : (
//                         "Type your question or upload documents"
//                       )}
//                     </div>

//                     <label
//                       htmlFor="pdfUpload"
//                       className={`text-xs flex items-center px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
//                         isLoading
//                           ? "bg-gray-700/50 text-gray-500"
//                           : "bg-gray-700 hover:bg-gray-600 text-gray-300"
//                       }`}
//                     >
//                       <ArrowUpTrayIcon className="w-4 h-4 mr-1" />
//                       Upload PDF
//                     </label>
//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       id="pdfUpload"
//                       accept="application/pdf"
//                       hidden
//                       onChange={handleFileUpload}
//                       disabled={isLoading}
//                     />
//                   </div>
//                 </form>
//               </div>

//               {/* Document Library */}
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="font-medium flex items-center">
//                     <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-400" />
//                     Document Library
//                   </h3>
//                   <span className="text-xs bg-gray-700/50 px-2 py-1 rounded-full">
//                     {pdfFiles.length} documents
//                   </span>
//                 </div>

//                 {pdfFiles.length === 0 ? (
//                   <div className="text-center py-8 text-gray-400">
//                     <DocumentTextIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
//                     <p>No documents yet</p>
//                     <p className="text-xs mt-1">Upload your first PDF to get started</p>
//                   </div>
//                 ) : (
//                   <ul className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
//                     {pdfFiles.map((file, index) => (
//                       <li
//                         key={index}
//                         className="group flex items-center justify-between p-2.5 hover:bg-gray-700/30 rounded-lg transition-colors"
//                       >
//                         <div className="flex items-center min-w-0">
//                           <DocumentTextIcon className="w-4 h-4 mr-3 text-blue-400/50 flex-shrink-0" />
//                           <span className="truncate text-sm">{file.name}</span>
//                         </div>
//                         <a
//                           href={file.webViewLink}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="opacity-0 group-hover:opacity-100 text-xs flex items-center text-cyan-400 hover:text-cyan-300 transition-opacity"
//                         >
//                           <LinkIcon className="w-3.5 h-3.5 mr-1" />
//                           Open
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Panel - Results */}
//           <div className="w-full lg:w-3/5" id="results-section">
//             <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl h-full overflow-hidden">
//               <div className="p-6 border-b border-gray-700/50">
//                 <h3 className="text-xl font-semibold flex items-center">
//                   <SearchIcon className="w-5 h-5 mr-2 text-blue-400" />
//                   Search Results
//                 </h3>
//               </div>

//               {isLoading ? (
//                 <div className="flex flex-col items-center justify-center py-16">
//                   <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-4"></div>
//                   <p className="text-gray-400">Analyzing documents...</p>
//                   <p className="text-xs text-gray-500 mt-1">
//                     This may take a few moments
//                   </p>
//                 </div>
//               ) : results.length > 0 ? (
//                 <div className="divide-y divide-gray-700/50 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
//                   {results.map((result, index) => (
//                     <div
//                       key={index}
//                       className="p-6 hover:bg-gray-700/20 transition-colors group"
//                     >
//                       <div className="flex justify-between items-start mb-3">
//                         <div>
//                           <h4 className="font-medium text-cyan-400">
//                             {result.pdf_name}
//                           </h4>
//                           <span className="text-xs text-gray-400">
//                             Page {result.page}
//                           </span>
//                         </div>
//                         <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full">
//                           Match: {Math.round(result.score * 100)}%
//                         </span>
//                       </div>
//                       <p className="text-gray-300">{result.text}</p>
//                       <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
//                         <button className="text-xs flex items-center text-blue-400 hover:text-blue-300">
//                           View full document <ArrowRightIcon className="w-3 h-3 ml-1" />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center py-16 text-gray-400">
//                   <SearchIcon className="w-12 h-12 mb-4 opacity-50" />
//                   <p>Your search results will appear here</p>
//                   <p className="text-sm mt-2 text-gray-500 max-w-md text-center">
//                     Ask questions about your documents or upload new files to get started
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom scrollbar styles */}
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(255, 255, 255, 0.1);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(255, 255, 255, 0.2);
//         }
//       `}</style>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon as SearchIcon,
  SparklesIcon,
  ArrowRightIcon,
  ArrowUpTrayIcon,
  DocumentTextIcon,
  LinkIcon,
  XMarkIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function AISearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [pdfFiles, setPdfFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const ws = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Check if speech recognition is supported
  const isSpeechSupported = typeof window !== "undefined" && 
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  // Initialize speech recognition
  useEffect(() => {
    if (!isSpeechSupported) {
      console.warn("Speech recognition not supported in this browser");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(prev => prev + (prev ? " " : "") + transcript);
      setIsListening(false);
      toast.success("Voice input captured", {
        icon: "🎤",
        style: {
          background: "#1e293b",
          color: "#fff",
          border: "1px solid #334155"
        }
      });
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      
      let errorMessage = "Voice input failed";
      switch(event.error) {
        case "no-speech":
          errorMessage = "No speech detected";
          break;
        case "audio-capture":
          errorMessage = "Audio capture problem";
          break;
        case "not-allowed":
          errorMessage = "Microphone access denied";
          break;
        default:
          errorMessage = `Error: ${event.error}`;
      }
      
      toast.error(errorMessage, {
        icon: "❌",
        style: {
          background: "#1e293b",
          color: "#fff",
          border: "1px solid #334155"
        },
        duration: 5000
      });
    };

    recognitionRef.current.onend = () => {
      if (isListening) {
        setIsListening(false);
        toast.error("Listening timed out", {
          icon: "⏱️",
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #334155"
          }
        });
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isSpeechSupported]);

  // WebSocket connection
  useEffect(() => {
    const connectWebSocket = () => {
      setIsLoading(true);
      setConnectionStatus("connecting");

      ws.current = new WebSocket("ws://localhost:8765");

      ws.current.onopen = () => {
        toast.success("Connected to AI search", {
          icon: "🔗",
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #334155"
          }
        });
        setConnectionStatus("connected");
        setIsLoading(false);
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.results) {
            setResults(data.results);
            setIsLoading(false);
            setTimeout(() => {
              const resultsSection = document.getElementById("results-section");
              if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }, 100);
          }
        } catch (error) {
          console.error("WebSocket message parse error:", error);
        }
      };

      ws.current.onerror = () => {
        toast.error("Connection error - retrying...", {
          icon: "⚠️",
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #334155"
          }
        });
        setConnectionStatus("error");
        setTimeout(connectWebSocket, 5000);
      };

      ws.current.onclose = () => {
        setConnectionStatus("disconnected");
        setTimeout(connectWebSocket, 5000);
      };
    };

    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // Fetch PDF files
  useEffect(() => {
    fetch("http://localhost:3001/files")
      .then((res) => res.json())
      .then((data) => {
        setPdfFiles(data.files || []);
      })
      .catch(() => {
        toast.error("Failed to fetch PDFs", {
          icon: "❌",
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #334155"
          }
        });
      });
  }, []);

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition not supported in your browser", {
        icon: "❌",
        style: {
          background: "#1e293b",
          color: "#fff",
          border: "1px solid #334155"
        }
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    // Request permission first
    navigator.permissions.query({ name: 'microphone' }).then(permissionStatus => {
      console.log("Microphone permission state:", permissionStatus.state);
      
      if (permissionStatus.state === 'denied') {
        throw new Error("Microphone permission denied");
      }

      return navigator.mediaDevices.getUserMedia({ audio: true });
    }).then(() => {
      setQuery(prev => prev.trim()); // Clear any previous partial input
      recognitionRef.current.start();
      setIsListening(true);
      toast("Listening... Speak now", {
        icon: "🎤",
        style: {
          background: "#1e293b",
          color: "#fff",
          border: "1px solid #334155"
        }
      });
    }).catch(err => {
      console.error("Speech recognition error:", err);
      setIsListening(false);
      
      let errorMessage = "Could not start microphone";
      if (err.message.includes("denied") || err.name === "NotAllowedError") {
        errorMessage = "Microphone access was denied. Please allow microphone access in your browser settings.";
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        errorMessage = "No microphone found. Please ensure a microphone is connected.";
      }

      toast.error(errorMessage, {
        icon: "❌",
        style: {
          background: "#1e293b",
          color: "#fff",
          border: "1px solid #334155"
        },
        duration: 5000
      });
    });
  };

  const sendQuery = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast("Enter a search query", {
        icon: "🔍",
        style: {
          background: "#1e293b",
          color: "#fff",
          border: "1px solid #334155"
        }
      });
      return;
    }

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      setIsLoading(true);
      setResults([]);
      ws.current.send(query);
    } else {
      setConnectionStatus("error");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendQuery(e);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      toast.error("Please upload a PDF file", {
        icon: "📄",
        style: {
          background: "#1e293b",
          color: "#fff",
          border: "1px solid #334155"
        }
      });
      return;
    }

    setSelectedFile(file);

    const formData = new FormData();
    formData.append("pdf", file);

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("PDF uploaded successfully!", {
          icon: "📚",
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #334155"
          }
        });
        setPdfFiles((prev) => [
          { name: file.name, webViewLink: data.fileLink },
          ...prev,
        ]);
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      toast.error("Error uploading file", {
        icon: "❌",
        style: {
          background: "#1e293b",
          color: "#fff",
          border: "1px solid #334155"
        }
      });
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const cancelUpload = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const ConnectionIndicator = () => {
    const statusColors = {
      connected: "bg-emerald-500",
      connecting: "bg-amber-500",
      disconnected: "bg-gray-500",
      error: "bg-rose-500",
    };

    const statusText = {
      connected: "Connected",
      connecting: "Connecting...",
      disconnected: "Disconnected",
      error: "Connection Error",
    };

    return (
      <div className="flex items-center space-x-2 text-sm">
        <span className={`w-2.5 h-2.5 rounded-full ${statusColors[connectionStatus]} animate-pulse`}></span>
        <span className="text-xs font-mono">{statusText[connectionStatus]}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white p-4 md:p-8">
      {/* Glowing background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
              AI Document Intelligence
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Instantly extract knowledge from your documents with our powerful AI search technology
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel - Search & Documents */}
          <div className="w-full lg:w-2/5">
            <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Box */}
              <div className="p-6 border-b border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <SparklesIcon className="w-5 h-5 mr-2 text-cyan-400" />
                    Ask Your Documents
                  </h2>
                  <ConnectionIndicator />
                </div>

                <form onSubmit={sendQuery} className="space-y-3">
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="e.g. 'Show me the key points from the contract...'"
                      className="w-full p-4 pl-12 pr-20 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-200"
                      disabled={isLoading}
                    />

                    <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

                    {/* Speech-to-text button */}
                    <button
                      type="button"
                      onClick={toggleSpeechRecognition}
                      className={`absolute right-14 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all ${
                        isListening
                          ? "bg-red-500 animate-pulse"
                          : isSpeechSupported 
                            ? "bg-gray-600/50 hover:bg-gray-500/50"
                            : "bg-gray-700/50 cursor-not-allowed"
                      }`}
                      disabled={isLoading || !isSpeechSupported}
                      title={!isSpeechSupported ? "Speech recognition not supported" : ""}
                    >
                      <MicrophoneIcon className="w-5 h-5" />
                    </button>

                    {/* Submit button */}
                    <button
                      type="submit"
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-200 ${
                        isLoading || !query.trim()
                          ? "bg-gray-600/50 text-gray-400"
                          : "bg-cyan-600 hover:bg-cyan-500 text-white"
                      }`}
                      disabled={isLoading || !query.trim()}
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-gray-400/50 border-t-white rounded-full animate-spin" />
                      ) : (
                        <ArrowRightIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-400">
                      {selectedFile ? (
                        <div className="flex items-center">
                          <span className="truncate max-w-xs">{selectedFile.name}</span>
                          <button
                            onClick={cancelUpload}
                            className="ml-2 text-gray-400 hover:text-white"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        "Type your question or upload documents"
                      )}
                    </div>

                    <label
                      htmlFor="pdfUpload"
                      className={`text-xs flex items-center px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
                        isLoading
                          ? "bg-gray-700/50 text-gray-500"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      }`}
                    >
                      <ArrowUpTrayIcon className="w-4 h-4 mr-1" />
                      Upload PDF
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="pdfUpload"
                      accept="application/pdf"
                      hidden
                      onChange={handleFileUpload}
                      disabled={isLoading}
                    />
                  </div>
                </form>
              </div>

              {/* Document Library */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium flex items-center">
                    <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-400" />
                    Document Library
                  </h3>
                  <span className="text-xs bg-gray-700/50 px-2 py-1 rounded-full">
                    {pdfFiles.length} documents
                  </span>
                </div>

                {pdfFiles.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <DocumentTextIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p>No documents yet</p>
                    <p className="text-xs mt-1">Upload your first PDF to get started</p>
                  </div>
                ) : (
                  <ul className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                    {pdfFiles.map((file, index) => (
                      <li
                        key={index}
                        className="group flex items-center justify-between p-2.5 hover:bg-gray-700/30 rounded-lg transition-colors"
                      >
                        <div className="flex items-center min-w-0">
                          <DocumentTextIcon className="w-4 h-4 mr-3 text-blue-400/50 flex-shrink-0" />
                          <span className="truncate text-sm">{file.name}</span>
                        </div>
                        <a
                          href={file.webViewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-0 group-hover:opacity-100 text-xs flex items-center text-cyan-400 hover:text-cyan-300 transition-opacity"
                        >
                          <LinkIcon className="w-3.5 h-3.5 mr-1" />
                          Open
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="w-full lg:w-3/5" id="results-section">
            <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl h-full overflow-hidden">
              <div className="p-6 border-b border-gray-700/50">
                <h3 className="text-xl font-semibold flex items-center">
                  <SearchIcon className="w-5 h-5 mr-2 text-blue-400" />
                  Search Results
                </h3>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400">Analyzing documents...</p>
                  <p className="text-xs text-gray-500 mt-1">
                    This may take a few moments
                  </p>
                </div>
              ) : results.length > 0 ? (
                <div className="divide-y divide-gray-700/50 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="p-6 hover:bg-gray-700/20 transition-colors group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-cyan-400">
                            {result.pdf_name}
                          </h4>
                          <span className="text-xs text-gray-400">
                            Page {result.page}
                          </span>
                        </div>
                        <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full">
                          Match: {Math.round(result.score * 100)}%
                        </span>
                      </div>
                      <p className="text-gray-300">{result.text}</p>
                      <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-xs flex items-center text-blue-400 hover:text-blue-300">
                          View full document <ArrowRightIcon className="w-3 h-3 ml-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <SearchIcon className="w-12 h-12 mb-4 opacity-50" />
                  <p>Your search results will appear here</p>
                  <p className="text-sm mt-2 text-gray-500 max-w-md text-center">
                    Ask questions about your documents or upload new files to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}