import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, ArrowUp, ArrowDown, Send, Bookmark, Share2, MoreHorizontal } from 'lucide-react';
import { textGradient } from '../style';
// import { textGradient } from '../../src/style';

const IdeaCard = ({ 
  idea, 
  onUpvote, 
  onDownvote, 
  onAddComment,
  expandedIdeas,
  toggleExpandIdea,
  newComments,
  setNewComments
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const upvoted = JSON.parse(localStorage.getItem("upvotedIdeas"))?.includes(idea.id);

  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-gray-700/50 overflow-hidden shadow-lg"
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{idea.name || "Anonymous"}</h3>
            <span className="text-xs text-gray-400 mt-1">
              {new Date(idea.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-full ${isBookmarked ? 'text-amber-400 bg-amber-400/10' : 'text-gray-400 hover:bg-gray-700/50'}`}
            >
              <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:bg-gray-700/50">
              <Share2 size={16} />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <p className="text-gray-300 mb-4">{idea.content}</p>
        
        {/* Stats & Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Upvote Button */}
            <button
              onClick={() => onUpvote(idea.id)}
              disabled={upvoted}
              className={`flex items-center gap-1 ${upvoted ? 'text-green-400' : 'text-gray-400 hover:text-green-400'}`}
            >
              <ArrowUp size={18} fill={upvoted ? 'currentColor' : 'none'} />
              <span className="text-sm font-medium">{idea.vote || 0}</span>
            </button>
            
            {/* Downvote Button */}
            <button
              onClick={() => onDownvote(idea.id)}
              className="text-gray-400 hover:text-rose-400 flex items-center gap-1"
            >
              <ArrowDown size={18} />
            </button>
            
            {/* Comments Button */}
            <button
              onClick={() => toggleExpandIdea(idea.id)}
              className="text-gray-400 hover:text-cyan-400 flex items-center gap-1"
            >
              <MessageSquare size={16} />
              <span className="text-sm font-medium">{idea.comments?.length || 0}</span>
            </button>
          </div>
          
          <button className="text-gray-400 hover:bg-gray-700/50 p-2 rounded-full">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
      
      {/* Comments Section */}
      <AnimatePresence>
        {expandedIdeas[idea.id] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800/30 border-t border-gray-700/50"
          >
            <div className="p-4">
              <h4 className={`text-sm font-semibold mb-3 ${textGradient} flex items-center gap-2`}>
                <MessageSquare size={16} />
                Discussion ({idea.comments?.length || 0})
              </h4>
              
              {/* Comments List */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto custom-scrollbar">
                {idea.comments?.length > 0 ? (
                  idea.comments.map((comment, idx) => (
                    <div key={idx} className="bg-gray-700/20 p-3 rounded-lg text-sm text-gray-300">
                      {comment}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    No comments yet. Be the first to share your thoughts!
                  </div>
                )}
              </div>
              
              {/* Add Comment */}
              <div className="flex gap-2">
                <input
                  value={newComments[idea.id] || ""}
                  onChange={(e) => setNewComments(prev => ({ ...prev, [idea.id]: e.target.value }))}
                  placeholder="Add your comment..."
                  onKeyPress={(e) => e.key === 'Enter' && onAddComment(idea.id)}
                  className="flex-1 bg-gray-700/50 border border-gray-600/50 px-4 py-2 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <button
                  onClick={() => onAddComment(idea.id)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 text-sm font-medium"
                >
                  <Send size={16} />
                  Post
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default IdeaCard;