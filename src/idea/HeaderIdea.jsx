// import React from "react";
// import { Link } from "react-router-dom";
// import { Lightbulb } from "lucide-react"; // Optional icon

// const HeaderIdea = () => {
//   return (
//     <div className="w-full px-6 py-4 flex justify-between items-center rounded-xl border border-gray-700/60 bg-gray-900/60 backdrop-blur-md shadow-md">
//       {/* Heading */}
//       <h2 className=" font-poppins text-lg md:text-3xl font-semibold text-gray-100 tracking-tight">
//         🚀 Get your Notes
//       </h2>

//       {/* CTA Button */}
//       <Link to="/addNew">
//         <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow transition duration-300">
//           <Lightbulb className="w-4 h-4" />
//           <span className="text-sm font-medium">Add Notes</span>
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default HeaderIdea;


import React from "react";
import { Link } from "react-router-dom";
import { Lightbulb, Sparkles } from "lucide-react";
import { textGradient } from "../style";

const HeaderIdea = () => {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center">
      {/* Logo/Branding */}
      <div className="flex items-center gap-2">
        <Sparkles className="text-cyan-400" size={24} />
        <h1 className={`text-xl font-bold ${textGradient}`}>IdeaHub</h1>
      </div>

      {/* CTA Button */}
      <Link to="/addNew">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg transition-all duration-300 transform hover:scale-105">
          <Lightbulb className="w-4 h-4" />
          <span className="text-sm font-medium">Add Idea</span>
        </button>
      </Link>
    </header>
  );
};

export default HeaderIdea;