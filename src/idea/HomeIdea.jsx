// 'use client'
// import React, { useState, useEffect } from 'react'
// import HeaderIdea from './HeaderIdea'
// import HeroIdea from './HeroIdea'
// import Tabs from './Tabs'
// import { db } from '../../configs/db'
// import { Ideas } from '../../configs/schema'
// import { asc, desc, eq } from 'drizzle-orm'

// const HomeIdea = () => {
//   const [selectedTab, setSelectedTab] = useState('hots')
//   const [ideas, setIdeas] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   useEffect(() => {
//     GetAllIdeas(selectedTab)
//   }, [selectedTab])


//   const GetAllIdeas = async (tab) => {
//   let result;
//   switch (tab) {
//     case "hots":
//       result = await db.select().from(Ideas).orderBy(desc(Ideas.vote || Ideas.id));
//       break;
//     case "new":
//       result = await db.select().from(Ideas).orderBy(desc(Ideas.createdAt));
//       break;
//     case "top":
//       result = await db.select().from(Ideas).orderBy(desc(Ideas.vote || Ideas.id));
//       break;
//     default:
//       result = [];
//   }
//   setIdeas(result);
//   console.log(result);
// };

//   const handleUpvote = async (ideaId) => {
//     // Check if the user has already upvoted this idea
//     const upvotedIdeas = JSON.parse(localStorage.getItem('upvotedIdeas')) || [];
//     if (upvotedIdeas.includes(ideaId)) {
//       alert("You have already upvoted this idea.");
//       return;
//     }

//     try {
//       // Get the current vote count for the idea
//       const currentIdea = ideas.find(idea => idea.id === ideaId);
//       const newVoteCount = currentIdea.vote + 1;

//       const result = await db.update(Ideas).set({
//         vote: newVoteCount
//       }).where(eq(Ideas.id, ideaId)).returning({ id: Ideas.id });

//       if (result) {
//         // Save the upvoted idea ID to local storage
//         upvotedIdeas.push(ideaId);
//         localStorage.setItem('upvotedIdeas', JSON.stringify(upvotedIdeas));
//         GetAllIdeas(selectedTab);
//       }
//     } catch (error) {
//       console.error("Error upvoting idea:", error);
//     }
//   }

//   const handleDownvote = async (ideaId) => {
//     try {
//       // Get the current vote count for the idea
//       const currentIdea = ideas.find(idea => idea.id === ideaId);
//       const newVoteCount = currentIdea.vote - 1;

//       const result = await db.update(Ideas).set({
//         vote: newVoteCount
//       }).where(eq(Ideas.id, ideaId)).returning({ id: Ideas.id });

//       if (result) {
//         GetAllIdeas(selectedTab);
//       }
//     } catch (error) {
//       console.error("Error downvoting idea:", error);
//     }
//   }

//   const handleAddComment = async (ideaId, commentText) => {
//   if (!commentText.trim()) return;

//   try {
//     const currentIdea = ideas.find(idea => idea.id === ideaId);
//     const newComments = [...(currentIdea.comments || []), commentText];

//     const result = await db.update(Ideas).set({
//       comments: newComments
//     }).where(eq(Ideas.id, ideaId)).returning({ id: Ideas.id });

//     if (result) {
//       setNewComment("");
//       GetAllIdeas(selectedTab);
//     }
//   } catch (error) {
//     console.error("Error adding comment:", error);
//   }
// };


//   return (
//     <div>
//     <HeaderIdea />
//     <HeroIdea />
//     <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

//     <div className="mt-8 flex flex-col gap-4">
//       {ideas.length === 0 ? (
//         <p className="text-center text-lg">No ideas to display.</p>
//       ) : (
//         ideas.map((idea) => (
//           <div key={idea.id} className="p-6 border border-gray-700 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//             <h3 className="text-2xl font-semibold">{idea.name}</h3>
//             <p className="mt-2">{idea.content}</p>
//             <div className="mt-4 flex justify-between items-center text-sm">
//               <span>{idea.createdAt}</span>
//               <div className="flex items-center">
//                 <span className="mr-2">{idea.vote} Votes</span>
//                 <button 
//                   onClick={() => handleUpvote(idea.id)} 
//                   className={`bg-green-500 text-white text-xs font-bold py-1 px-2 rounded hover:bg-green-600 transition duration-200 ${JSON.parse(localStorage.getItem('upvotedIdeas'))?.includes(idea.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   disabled={JSON.parse(localStorage.getItem('upvotedIdeas'))?.includes(idea.id)}
//                 >
//                   Upvote
//                 </button>
//                 <button 
//                   onClick={() => handleDownvote(idea.id)} 
//                   className="bg-red-500 text-white text-xs font-bold py-1 px-2 rounded hover:bg-red-600 transition duration-200 ml-2"
//                 >
//                   Downvote
//                 </button>
//               </div>
//             </div>

//             {/* Comment Section */}
//             <div className="mt-4">
//               <h4 className="text-lg font-semibold">Comments</h4>
//               <ul className="mt-2 space-y-2">
//                 {idea.comments && idea.comments.length > 0 ? (
//                   idea.comments.map((comment, index) => (
//                     <li key={index} className="p-2 border rounded">
//                       {comment}
//                     </li>
//                   ))
//                 ) : (
//                   <p className="text-gray-500">No comments yet.</p>
//                 )}
//               </ul>

//               {/* Add Comment Input */}
//               <div className="mt-2 flex items-center">
//                 <input
//                   type="text"
//                   className="border rounded p-2 w-full"
//                   placeholder="Add a comment..."
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                 />
//                 <button
//                   onClick={() => handleAddComment(idea.id, newComment)}
//                   className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   </div>
//   )
// }

// export default HomeIdea

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, ArrowUp, ArrowDown, Send, Download, FileText, Image, File } from "lucide-react";
import toast from "react-hot-toast";
import HeaderIdea from "./HeaderIdea";
import HeroIdea from "./HeroIdea";
import Tabs from "./Tabs";
import { db } from "../../configs/db";
import { Ideas } from "../../configs/schema";
import { asc, desc, eq } from "drizzle-orm";

const HomeIdea = () => {
  const [selectedTab, setSelectedTab] = useState("hots");
  const [ideas, setIdeas] = useState([]);
  const [newComments, setNewComments] = useState({});
  const [expandedIdeas, setExpandedIdeas] = useState({});
  const [hoveredIdea, setHoveredIdea] = useState(null);

  useEffect(() => {
    GetAllIdeas(selectedTab);
  }, [selectedTab]);

  const GetAllIdeas = async (tab) => {
    let result;
    try {
      switch (tab) {
        case "hots":
        case "top":
          result = await db.select().from(Ideas).orderBy(desc(Ideas.vote || Ideas.id));
          break;
        case "new":
          result = await db.select().from(Ideas).orderBy(desc(Ideas.createdAt));
          break;
        default:
          result = [];
      }
      setIdeas(result);
    } catch (error) {
      toast.error("Failed to load ideas");
      console.error(error);
    }
  };

  const FileDownloadButton = ({ fileUrl, fileType }) => {
    if (!fileUrl) return null;

    const getFileIcon = () => {
      switch(fileType?.toLowerCase()) {
        case 'pdf': return <FileText className="text-red-500" size={16} />;
        case 'doc':
        case 'docx': return <FileText className="text-blue-500" size={16} />;
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif': return <Image className="text-green-500" size={16} />;
        default: return <File className="text-gray-400" size={16} />;
      }
    };

    return (
      <div className="mt-3">
        <a 
          href={"https://drive.google.com/file/d/1yyzSm-jhbdBXkEnYRNBH98uFNVGzYWT7/view?usp=drive_link"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          {getFileIcon()}
          <span className="ml-2 underline">Download {fileType?.toUpperCase() || 'File'}</span>
          <Download size={14} className="ml-1" />
        </a>
      </div>
    );
  };

  const handleUpvote = async (ideaId) => {
    const upvotedIdeas = JSON.parse(localStorage.getItem("upvotedIdeas")) || [];
    if (upvotedIdeas.includes(ideaId)) {
      toast.error("You've already upvoted this idea");
      return;
    }

    try {
      const currentIdea = ideas.find((idea) => idea.id === ideaId);
      const newVoteCount = (currentIdea.vote || 0) + 1;

      await db.update(Ideas).set({ vote: newVoteCount }).where(eq(Ideas.id, ideaId));

      upvotedIdeas.push(ideaId);
      localStorage.setItem("upvotedIdeas", JSON.stringify(upvotedIdeas));
      GetAllIdeas(selectedTab);
      toast.success("Upvoted successfully!");
    } catch (error) {
      toast.error("Failed to upvote");
      console.error(error);
    }
  };

  const handleDownvote = async (ideaId) => {
    try {
      const currentIdea = ideas.find((idea) => idea.id === ideaId);
      const newVoteCount = Math.max((currentIdea.vote || 0) - 1, 0);

      await db.update(Ideas).set({ vote: newVoteCount }).where(eq(Ideas.id, ideaId));
      GetAllIdeas(selectedTab);
      toast.success("Downvoted successfully!");
    } catch (error) {
      toast.error("Failed to downvote");
      console.error(error);
    }
  };

  const handleAddComment = async (ideaId) => {
    const commentText = newComments[ideaId];
    if (!commentText?.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      const currentIdea = ideas.find((idea) => idea.id === ideaId);
      const newCommentsList = [...(currentIdea.comments || []), commentText];

      await db.update(Ideas).set({ comments: newCommentsList }).where(eq(Ideas.id, ideaId));

      setNewComments((prev) => ({ ...prev, [ideaId]: "" }));
      GetAllIdeas(selectedTab);
      toast.success("Comment added!");
    } catch (error) {
      toast.error("Failed to add comment");
      console.error(error);
    }
  };

  const toggleExpandIdea = (ideaId) => {
    setExpandedIdeas((prev) => ({ ...prev, [ideaId]: !prev[ideaId] }));
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="fixed top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="fixed bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl opacity-20 -z-10" />

      <HeaderIdea />
      <HeroIdea />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      <div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        {ideas.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">No ideas yet</h3>
            <p className="text-gray-400">Be the first to share an idea!</p>
          </motion.div>
        ) : (
          <div className="relative h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar pb-8">
            <AnimatePresence>
              {ideas.map((idea, index) => {
                const upvoted = JSON.parse(localStorage.getItem("upvotedIdeas"))?.includes(idea.id);
                
                return (
                  <motion.div
                    key={idea.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`relative mb-4 ${index !== ideas.length - 1 ? "pb-4" : ""}`}
                    style={{
                      zIndex: ideas.length - index,
                    }}
                  >
                    <motion.div
                      className={`bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden transition-all duration-300 ${
                        hoveredIdea === idea.id ? "shadow-lg" : "shadow-md"
                      }`}
                      whileHover={{ scale: 1.01 }}
                      onMouseEnter={() => setHoveredIdea(idea.id)}
                      onMouseLeave={() => setHoveredIdea(null)}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{idea.name || "Anonymous"}</h3>
                            <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full inline-block mt-1">
                              {new Date(idea.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center bg-gray-700/50 px-3 py-1 rounded-full text-pink-400">
                            <Heart size={16} />
                            <span className="ml-1 text-sm">{idea.vote || 0}</span>
                          </div>
                        </div>

                        <p className="text-gray-300 line-clamp-3">{idea.content}</p>

                        {/* File Download Button */}
                        {idea.fileUrl && (
                          <FileDownloadButton fileUrl={idea.fileUrl} fileType={idea.fileType} />
                        )}

                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpvote(idea.id)}
                              disabled={upvoted}
                              className={`text-xs px-3 py-1 rounded-full flex items-center space-x-1 transition ${
                                upvoted
                                  ? "bg-green-500/10 text-green-400 cursor-not-allowed"
                                  : "bg-gray-700/70 text-gray-300 hover:bg-green-500/10 hover:text-green-400"
                              }`}
                            >
                              <ArrowUp size={14} fill={upvoted ? 'currentColor' : 'none'} />
                              <span>Upvote</span>
                            </button>
                            <button
                              onClick={() => handleDownvote(idea.id)}
                              className="text-xs px-3 py-1 rounded-full flex items-center space-x-1 bg-gray-700/70 text-gray-300 hover:bg-red-500/10 hover:text-red-400"
                            >
                              <ArrowDown size={14} />
                              <span>Downvote</span>
                            </button>
                          </div>

                          <button
                            onClick={() => toggleExpandIdea(idea.id)}
                            className="text-xs text-gray-400 hover:text-cyan-400 flex items-center gap-1"
                          >
                            <MessageSquare size={14} />
                            <span>{idea.comments?.length || 0} comments</span>
                          </button>
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedIdeas[idea.id] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-800/20 border-t border-gray-700/50 overflow-hidden"
                          >
                            <div className="px-6 py-4">
                              <h4 className="text-sm font-semibold text-cyan-400 mb-2 flex items-center">
                                <MessageSquare size={16} className="mr-2" />
                                Discussion
                              </h4>
                              <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-2 mb-3">
                                {idea.comments?.length > 0 ? (
                                  idea.comments.map((comment, idx) => (
                                    <div
                                      key={idx}
                                      className="bg-gray-700/20 p-3 rounded-lg text-sm text-gray-300"
                                    >
                                      {comment}
                                    </div>
                                  ))
                                ) : (
                                  <div className="text-gray-500 text-sm">No comments yet.</div>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  value={newComments[idea.id] || ""}
                                  onChange={(e) =>
                                    setNewComments((prev) => ({
                                      ...prev,
                                      [idea.id]: e.target.value,
                                    }))
                                  }
                                  placeholder="Add your thoughts..."
                                  onKeyPress={(e) => e.key === "Enter" && handleAddComment(idea.id)}
                                  className="flex-1 bg-gray-700/50 border border-gray-600/50 px-3 py-2 rounded-lg text-white text-sm"
                                />
                                <button
                                  onClick={() => handleAddComment(idea.id)}
                                  className="bg-cyan-600 hover:bg-cyan-500 px-3 py-2 rounded-lg text-white flex items-center text-sm"
                                >
                                  <Send size={16} className="mr-1" />
                                  Post
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeIdea;