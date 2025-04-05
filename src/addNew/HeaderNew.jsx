// 'use client'
// import React, { useEffect, useState } from 'react'
// import { ChevronLeft, Send } from 'lucide-react'
// import { db } from '../../configs/db'
// import { Ideas } from '../../configs/schema'
// import moment from 'moment'
// import toast from 'react-hot-toast'
// import { Link } from 'react-router-dom'

// const HeaderNew = () => {
//     const [idea, setIdea] = useState('');
//     const [name, setName] = useState('');
//     const [existingUser, setExistingUser] = useState(false);

//     useEffect(() => {
//       if(typeof window !== 'undefined' && localStorage.getItem('name')){
//         setName(localStorage.getItem('name'));
//         setExistingUser(true);
//       }
//     }, [])

//     const onSaveHandler = async () => {
//         const savePromise = db.insert(Ideas).values({
//             content: idea,
//             name: name,
//             createdAt: moment().format('DD MM YYYY')
//         }).returning({id: Ideas.id})

//         toast.promise(
//             savePromise,
//             {
//                 loading: 'Saving your idea...',
//                 success: (result) => {
//                     localStorage.setItem('name', name);
//                     setIdea('');
//                     setName('');
//                     return 'Idea saved successfully!';
//                 },
//                 error: 'Failed to save idea'
//             },
//             {
//                 style: {
//                     background: '#1e293b',
//                     color: '#fff',
//                     border: '1px solid #334155',
//                     padding: '12px 16px',
//                     borderRadius: '8px'
//                 },
//                 success: {
//                     duration: 4000,
//                     icon: '✅',
//                 },
//                 error: {
//                     duration: 4000,
//                     icon: '❌',
//                 },
//                 loading: {
//                     duration: 2000,
//                     icon: '⏳',
//                 }
//             }
//         );
//     }

//     return (
//         <div className='flex flex-col items-center p-8 bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-xl max-w-2xl mx-auto'>
//             <Link to="/idea" className="self-start mb-6">
//                 <button className="flex font-poppins items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors duration-200">
//                     <ChevronLeft size={18} />
//                     Go Back
//                 </button>
//             </Link>
            
//             <h2 className='font-bold font-poppins text-2xl md:text-4xl text-center mb-8 bg-clip-text text-white'>
//                 From Idea to Learning grows Innovation 📈
//             </h2>
            
//             <div className='w-full space-y-6'>
//                 <div className='flex flex-col gap-3'>
//                     <label className='font-poppins font-medium text-gray-300'>Your Idea</label>
//                     <textarea 
//                         onChange={(e) => setIdea(e.target.value)} 
//                         value={idea}
//                         className='w-full font-poppins min-h-[150px] p-4 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-200'
//                         placeholder="Describe your innovative idea..."
//                     />
//                 </div>

//                 {!existingUser && (
//                     <div className='flex flex-col gap-3'>
//                         <label className='font-poppins font-medium text-gray-300'>Your Name</label>
//                         <input
//                             type="text"
//                             onChange={(e) => setName(e.target.value)}
//                             value={name}
//                             className='w-full font-poppins p-4 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-200'
//                             placeholder="Enter your name"
//                         />
//                     </div>
//                 )}

//                 <button 
//                     disabled={!idea || (!existingUser && !name)}
//                     onClick={onSaveHandler}
//                     className={`w-full font-poppins mt-6 py-3 px-6 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-200 ${
//                         (!idea || (!existingUser && !name)) 
//                             ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
//                             : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
//                     }`}
//                 >
//                     Save Idea
//                     <Send size={18} />
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default HeaderNew
'use client';import React, { useEffect, useState } from 'react';
import { ChevronLeft, Send, UploadCloud } from 'lucide-react';
import { db } from '../../configs/db';
import { Ideas } from '../../configs/schema';
import moment from 'moment';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CLOUDINARY_CONFIG, CLOUDINARY_UPLOAD_URL } from '../../configs/cloudinary';

const HeaderNew = () => {
  const [idea, setIdea] = useState('');
  const [name, setName] = useState('');
  const [existingUser, setExistingUser] = useState(false);
  const [docUrl, setDocUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileType, setFileType] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('name')) {
      setName(localStorage.getItem('name') || '');
      setExistingUser(true);
    }
  }, []);

  const onUploadDoc = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Get file extension and type
    const fileName = file.name;
    const fileExt = fileName.split('.').pop().toLowerCase();
    setFileType(fileExt);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
    formData.append('resource_type', 'auto');

    try {
      setUploading(true);
      const res = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      
      let finalUrl = data.secure_url;
      if (fileExt === 'pdf') {
        finalUrl = data.secure_url.replace('/upload/', '/upload/fl_attachment/');
      }

      setDocUrl(finalUrl);
      toast.success('Document uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err);
      toast.error('Document upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onSaveHandler = async () => {
    if (!idea || (!existingUser && !name)) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const result = await db
        .insert(Ideas)
        .values({
          content: idea,
          name: name,
          createdAt: moment().format('DD MM YYYY'),
          fileUrl: docUrl,
          fileType: fileType,
        })
        .returning({ id: Ideas.id });

      localStorage.setItem('name', name);
      setIdea('');
      setName('');
      setDocUrl(null);
      setFileType('');
      
      toast.success('Idea saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save idea');
    }
  };

  return (
    <div className='flex flex-col items-center p-8 bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-xl max-w-2xl mx-auto'>
      <Link to='/idea' className='self-start mb-6'>
        <button className='flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors duration-200'>
          <ChevronLeft size={18} />
          Go Back
        </button>
      </Link>

      <h2 className='font-bold font-poppins text-2xl md:text-4xl text-center mb-8 text-white'>
        From Idea to Learning grows Innovation 📈
      </h2>

      <div className='w-full space-y-6'>
        <div className='flex flex-col gap-3'>
          <label className='font-poppins font-medium text-gray-300'>Your Idea</label>
          <textarea
            onChange={(e) => setIdea(e.target.value)}
            value={idea}
            className='w-full font-poppins min-h-[150px] p-4 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50'
            placeholder='Describe your innovative idea...'
            required
          />
        </div>

        {!existingUser && (
          <div className='flex flex-col gap-3'>
            <label className='font-poppins font-medium text-gray-300'>Your Name</label>
            <input
              type='text'
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='w-full font-poppins p-4 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50'
              placeholder='Enter your name'
              required
            />
          </div>
        )}

        <div className='flex flex-col gap-3'>
          <label className='font-poppins font-medium text-gray-300'>Attach Document (optional)</label>
          <div className="flex items-center gap-3">
            <label className="cursor-pointer bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-lg transition-colors duration-200">
              <UploadCloud size={16} className="inline mr-2" />
              Choose File
              <input
                type='file'
                onChange={onUploadDoc}
                accept='.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png'
                className='hidden'
              />
            </label>
            {uploading && <span className="text-cyan-400 text-sm">Uploading...</span>}
          </div>
          
          {docUrl && (
            <div className="mt-2">
              <a
                href={docUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='text-cyan-400 text-sm underline hover:text-cyan-300'
              >
                View Uploaded Document ({fileType.toUpperCase()})
              </a>
            </div>
          )}
        </div>

        <button
          disabled={!idea || (!existingUser && !name)}
          onClick={onSaveHandler}
          className={`w-full font-poppins mt-6 py-3 px-6 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-200 ${
            !idea || (!existingUser && !name)
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
          }`}
        >
          Save Idea
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default HeaderNew;