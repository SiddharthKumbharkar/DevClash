// import React from 'react'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// const Tabs1 = () => {
//   return (
//     <div className="my-10 flex flex-col items-center gap-5">
//       <Tabs defaultValue="account" className="w-[350px]">
//         <TabsList className="flex gap-6">
//           <TabsTrigger value="hots" className="text-lg font-semibold">Hots ♨️</TabsTrigger>
//           <TabsTrigger value="new" className="text-lg font-semibold">New 💫</TabsTrigger>
//           <TabsTrigger value="top" className="text-lg font-semibold">Top 💹</TabsTrigger>
//         </TabsList>
//         <TabsContent value="hots" className="p-6 text-lg">
//           Make changes to your account here.
//         </TabsContent>
//         <TabsContent value="new" className="p-6 text-lg">
//           Change your password here.
//         </TabsContent>
//         <TabsContent value="top" className="p-6 text-lg">
//           Explore top trending ideas here.
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// export default Tabs1
'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, TrendingUp, ChevronDown, X } from 'lucide-react';

const tabs = [
  { id: 'hots', label: 'Trending', icon: Flame, color: 'from-pink-500 to-rose-500' },
  { id: 'new', label: 'Latest', icon: Sparkles, color: 'from-cyan-500 to-blue-500' },
  { id: 'top', label: 'Top Rated', icon: TrendingUp, color: 'from-amber-500 to-orange-500' },
];

const CustomTabs = ({ selectedTab, setSelectedTab }) => {
  const [expanded, setExpanded] = useState(false);

  const containerVariants = {
    collapsed: { height: 56, width: 'auto' },
    expanded: { height: 'auto', width: '100%' },
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        animate={expanded ? 'expanded' : 'collapsed'}
        variants={containerVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="rounded-xl bg-gray-900/80 backdrop-blur-md border border-gray-700/50 shadow-lg overflow-hidden"
      >
        {/* Collapsed Mode */}
        {!expanded && (
          <div 
            className="flex justify-between items-center p-4 cursor-pointer"
            onClick={() => setExpanded(true)}
          >
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTab(tab.id);
                  }}
                  className={`px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${
                    selectedTab === tab.id 
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-md`
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
            <ChevronDown className="text-gray-400" />
          </div>
        )}

        {/* Expanded Mode */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="expanded-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-300">Browse Ideas</h3>
                <button
                  onClick={() => setExpanded(false)}
                  className="p-1 rounded-full hover:bg-gray-700/50 transition-colors"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSelectedTab(tab.id);
                      setExpanded(false);
                    }}
                    className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                      selectedTab === tab.id
                        ? `bg-gradient-to-br ${tab.color} text-white shadow-lg`
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="h-6 w-6 mb-2" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <p className="text-gray-300 text-sm">
                  {selectedTab === 'hots' && '🔥 Trending ideas based on recent engagement'}
                  {selectedTab === 'new' && '✨ Freshly shared ideas from the community'}
                  {selectedTab === 'top' && '🏆 Highest rated ideas of all time'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CustomTabs;