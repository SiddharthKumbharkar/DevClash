import React from 'react';
import { textGradient, knowledgeGradient } from '../style';

const HeroIdea = () => {
  return (
    <section className="flex flex-col items-center text-center mt-8 mb-16 px-4">
      <div className={`inline-flex items-center py-2 px-4 rounded-full ${knowledgeGradient} mb-6 shadow-md`}>
        <span className="text-sm font-medium text-cyan-300">Share & Discover Ideas</span>
      </div>
      
      <h1 className="font-poppins font-semibold text-4xl md:text-6xl text-white leading-tight mb-4">
        The <span className={textGradient}>Community</span> <br />
        Knowledge Hub
      </h1>
      
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
        Share your insights, discover new perspectives, and collaborate with like-minded thinkers.
      </p>
      
      <div className="flex gap-4">
        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
          Get Started
        </button>
        <button className="bg-transparent border-2 border-cyan-400/50 text-cyan-300 font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default HeroIdea;