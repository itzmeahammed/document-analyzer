import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { UploadProgress } from '../../types';

export default function UploadCard() {
  const [uploads, setUploads] = useState<UploadProgress[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newUploads: UploadProgress[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      progress: 0,
      status: 'uploading'
    }));

    setUploads(prev => [...prev, ...newUploads]);

    // Simulate upload progress
    newUploads.forEach(upload => {
      simulateUpload(upload.id);
    });
  }, []);

  const simulateUpload = (uploadId: string) => {
    const interval = setInterval(() => {
      setUploads(prev => prev.map(upload => {
        if (upload.id === uploadId) {
          const newProgress = Math.min(upload.progress + Math.random() * 20, 100);
          const newStatus = newProgress === 100 ? 'processing' : upload.status;
          
          if (newProgress === 100 && upload.status === 'uploading') {
            setTimeout(() => {
              setUploads(p => p.map(u => 
                u.id === uploadId ? { ...u, status: 'completed' } : u
              ));
            }, 2000);
          }
          
          return { ...upload, progress: newProgress, status: newStatus };
        }
        return upload;
      }));
    }, 500);

    setTimeout(() => clearInterval(interval), 8000);
  };

  const removeUpload = (uploadId: string) => {
    setUploads(prev => prev.filter(upload => upload.id !== uploadId));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        {...getRootProps()}
        className={`relative p-8 border-2 border-dashed rounded-3xl transition-all cursor-pointer ${
          isDragActive 
            ? 'border-emerald-400 bg-emerald-400/5 shadow-2xl shadow-emerald-400/20' 
            : 'border-slate-600/40 hover:border-violet-400/60 bg-slate-800/20 backdrop-blur-sm'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div
            animate={isDragActive ? { scale: 1.1, rotate: 360 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded-full ${
              isDragActive ? 'bg-emerald-500/20' : 'bg-violet-500/20'
            }`}
          >
            <Upload className={`w-12 h-12 ${isDragActive ? 'text-emerald-400' : 'text-violet-400'}`} />
          </motion.div>
          
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              {isDragActive ? 'Drop your documents here!' : 'Upload Documents'}
            </h3>
            <p className="text-slate-400">
              Drag & drop files here, or click to select files
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Supports PDF, DOC, DOCX, PNG, JPG (Max 10MB each)
            </p>
          </div>
        </div>
      </motion.div>

      {/* Upload Queue */}
      <AnimatePresence>
        {uploads.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Upload Queue</h4>
            
            <div className="space-y-3">
              {uploads.map(upload => (
                <motion.div
                  key={upload.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-xl"
                >
                  <File className="w-5 h-5 text-slate-400" />
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white truncate">{upload.name}</span>
                      <div className="flex items-center space-x-2">
                        {upload.status === 'completed' && (
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        )}
                        {upload.status === 'error' && (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        )}
                        <button
                          onClick={() => removeUpload(upload.id)}
                          className="p-1 hover:bg-slate-600/40 rounded transition-colors"
                        >
                          <X className="w-3 h-3 text-slate-400" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="w-full bg-slate-600/30 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${upload.progress}%` }}
                        className={`h-2 rounded-full ${
                          upload.status === 'completed' 
                            ? 'bg-emerald-400' 
                            : upload.status === 'processing'
                            ? 'bg-violet-400'
                            : 'bg-blue-400'
                        }`}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-slate-400">
                        {upload.status === 'uploading' && 'Uploading...'}
                        {upload.status === 'processing' && 'Processing...'}
                        {upload.status === 'completed' && 'Complete'}
                        {upload.status === 'error' && 'Error'}
                      </span>
                      <span className="text-xs text-slate-400">{Math.round(upload.progress)}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}