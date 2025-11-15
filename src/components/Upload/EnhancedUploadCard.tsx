import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, X, CheckCircle, AlertCircle, Zap, Brain } from 'lucide-react';
import { UploadProgress } from '../../types';
import GlassmorphicCard from '../UI/GlassmorphicCard';
import NeumorphicButton from '../UI/NeumorphicButton';

export default function EnhancedUploadCard() {
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultText, setResultText] = useState<string>('');
  const [resultItems, setResultItems] = useState<Array<{ name: string; use: string }> | null>(null);
  const [resultForFile, setResultForFile] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newUploads: UploadProgress[] = acceptedFiles.map(file => {
      const id = Math.random().toString(36).substr(2, 9);
      // Start actual upload immediately
      uploadFile(file, id);
      return {
        id,
        name: file.name,
        progress: 0,
        status: 'uploading'
      };
    });

    setUploads(prev => [...prev, ...newUploads]);
  }, []);

  const uploadFile = (file: File, uploadId: string) => {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:6778/prescription/analyze_prescription');

    // Upload progress (bytes sent)
    xhr.upload.onprogress = (event: ProgressEvent<EventTarget>) => {
      if (event.lengthComputable) {
        const percent = Math.min(99, Math.round((event.loaded / event.total) * 100));
        setUploads(prev => prev.map(u => u.id === uploadId ? { ...u, progress: percent } : u));
      }
    };

    xhr.onloadstart = () => {
      setUploads(prev => prev.map(u => u.id === uploadId ? { ...u, status: 'uploading' } : u));
    };

    // When request finished (server may still be processing during response creation)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        try {
          const isSuccess = xhr.status >= 200 && xhr.status < 300;
          const response = xhr.responseText ? JSON.parse(xhr.responseText) : null;

          if (isSuccess && response) {
            setUploads(prev => prev.map(u => u.id === uploadId ? { ...u, progress: 100, status: 'completed' } : u));
            // Backend may send medicines as a JSON string or as an array
            let items: Array<{ name: string; use: string }> | null = null;
            if (Array.isArray(response.medicines)) {
              items = response.medicines as Array<{ name: string; use: string }>;
            } else if (typeof response.medicines === 'string') {
              try {
                const parsed = JSON.parse(response.medicines);
                if (Array.isArray(parsed)) items = parsed;
              } catch {
                // ignore, we'll keep raw text fallback below
              }
            }

            setResultItems(items);
            const fallback = typeof response.medicines === 'string' ? response.medicines : JSON.stringify(response);
            setResultText(fallback || 'No medicines found.');
            setResultForFile(file.name);
            setShowResultModal(true);
          } else {
            setUploads(prev => prev.map(u => u.id === uploadId ? { ...u, status: 'error' } : u));
          }
        } catch (e) {
          setUploads(prev => prev.map(u => u.id === uploadId ? { ...u, status: 'error' } : u));
        }
      } else if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
        // Switch to processing state once upload finished and server is working
        setUploads(prev => prev.map(u => u.id === uploadId ? { ...u, status: 'processing' } : u));
      }
    };

    xhr.onerror = () => {
      setUploads(prev => prev.map(u => u.id === uploadId ? { ...u, status: 'error' } : u));
    };

    xhr.send(formData);
  };

  const removeUpload = (uploadId: string) => {
    setUploads(prev => prev.filter(upload => upload.id !== uploadId));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: true,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  return (
    <div className="space-y-6">
      {/* Enhanced Upload Zone */}
      <GlassmorphicCard 
        className={`relative overflow-hidden transition-all duration-500 ${
          isDragActive ? 'scale-105 shadow-emerald-500/30' : ''
        }`}
        hover={false}
        glow={isDragActive}
      >
        <div
          {...getRootProps()}
          className="relative p-8 cursor-pointer"
        >
          <input {...getInputProps()} />
          
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 opacity-20"
            whileHover={{ scale: 1.01 }}
            animate={isDragActive ? { scale: 1.02 } : { scale: 1 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${
              isDragActive 
                ? 'from-gray-300/30 to-gray-400/30' 
                : 'from-gray-200/20 to-gray-300/20'
            }`} />
          </motion.div>
          
          <div className="relative flex flex-col items-center justify-center space-y-6">
            {/* Animated Upload Icon */}
            <motion.div
              animate={isDragActive ? { 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              } : {
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: isDragActive ? 0.6 : 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`p-6 rounded-3xl transition-all duration-300 ${
                isDragActive 
                  ? 'bg-gray-300/30 shadow-2xl shadow-black/20' 
                  : 'bg-gray-200/20'
              }`}
            >
              <Upload className={`w-16 h-16 transition-colors duration-300 ${
                isDragActive ? 'text-black' : 'text-gray-700'
              }`} />
            </motion.div>
            
            <div className="text-center space-y-4">
              <motion.h3 
                animate={isDragActive ? { scale: 1.05 } : { scale: 1 }}
                className="text-2xl font-bold text-black"
              >
                {isDragActive ? '🎯 Drop to Upload!' : '📁 Smart Document Upload'}
              </motion.h3>
              
              <p className="text-gray-600 text-lg">
                {isDragActive 
                  ? 'Release to start AI processing...' 
                  : 'Drag & drop files or click to browse'
                }
              </p>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-black" />
                  <span>AI Classification</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-black" />
                  <span>Instant Processing</span>
                </div>
              </div>
              
              <p className="text-xs text-gray-500">
                Supports PDF, DOC, DOCX, Images, TXT • Max 10MB each • Batch upload enabled
              </p>
            </div>
            
            <NeumorphicButton variant="primary" size="lg">
              Choose Files
            </NeumorphicButton>
          </div>
        </div>
      </GlassmorphicCard> 

      {/* Enhanced Upload Queue */}
      <AnimatePresence>
        {uploads.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
          >
            <GlassmorphicCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-black flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-black" />
                  <span>Processing Queue</span>
                </h4>
                <div className="text-sm text-gray-600">
                  {uploads.filter(u => u.status === 'completed').length} / {uploads.length} completed
                </div>
              </div>
              
              <div className="space-y-4">
                {uploads.map((upload, index) => (
                  <motion.div
                    key={upload.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <GlassmorphicCard className="p-4" hover={false}>
                      <div className="flex items-center space-x-4">
                        {/* File Icon */}
                        <div className={`p-3 rounded-xl transition-all duration-300 ${
                          upload.status === 'completed' 
                            ? 'bg-gray-300/50' 
                            : upload.status === 'processing'
                            ? 'bg-gray-200/50'
                            : 'bg-gray-100/50'
                        }`}>
                          {upload.status === 'completed' ? (
                            <CheckCircle className="w-6 h-6 text-black" />
                          ) : upload.status === 'error' ? (
                            <AlertCircle className="w-6 h-6 text-gray-700" />
                          ) : (
                            <File className="w-6 h-6 text-gray-600" />
                          )}
                        </div>
                        
                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-black truncate pr-4">
                              {upload.name}
                            </span>
                            <div className="flex items-center space-x-2">
                              {upload.status === 'processing' && (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                                />
                              )}
                              <button
                                onClick={() => removeUpload(upload.id)}
                                className="p-1 hover:bg-gray-300 rounded-lg transition-colors group"
                              >
                                <X className="w-4 h-4 text-gray-600 group-hover:text-black" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Enhanced Progress Bar */}
                          <div className="relative w-full bg-gray-300/50 rounded-full h-3 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${upload.progress}%` }}
                              className={`h-full rounded-full relative overflow-hidden ${
                                upload.status === 'completed' 
                                  ? 'bg-black' 
                                  : upload.status === 'processing'
                                  ? 'bg-gray-700'
                                  : 'bg-gray-600'
                              }`}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                            </motion.div>
                          </div>
                          
                          {/* Status Text */}
                          <div className="flex justify-between items-center mt-2">
                            <span className={`text-xs font-medium ${
                              upload.status === 'completed' ? 'text-black' :
                              upload.status === 'processing' ? 'text-gray-700' :
                              upload.status === 'error' ? 'text-gray-700' : 'text-gray-600'
                            }`}>
                              {upload.status === 'uploading' && '📤 Uploading...'}
                              {upload.status === 'processing' && '🧠 AI Processing...'}
                              {upload.status === 'completed' && '✅ Ready & Classified'}
                              {upload.status === 'error' && '❌ Upload Failed'}
                            </span>
                            <span className="text-xs text-gray-600 font-mono">
                              {Math.round(upload.progress)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </GlassmorphicCard>
                  </motion.div>
                ))}
              </div>
            </GlassmorphicCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Modal */}
      <AnimatePresence>
        {showResultModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowResultModal(false)} />
            <motion.div
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              className="relative z-10 w-full max-w-xl"
            >
              <GlassmorphicCard className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-black">Prescription Result</h3>
                    <p className="text-gray-600 text-sm mt-1">File: {resultForFile}</p>
                  </div>
                  <button
                    onClick={() => setShowResultModal(false)}
                    className="p-2 hover:bg-gray-200 rounded-lg"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-black" />
                  </button>
                </div>
                <div className="bg-gray-100 rounded-xl p-4 max-h-80 overflow-auto">
                  {resultItems && resultItems.length > 0 ? (
                    <div className="space-y-3">
                      {resultItems.map((item, idx) => (
                        <div key={idx} className="flex items-start justify-between bg-gray-200 rounded-xl p-3">
                          <div>
                            <div className="text-black font-semibold">{item.name}</div>
                            <div className="text-gray-700 text-sm mt-1">{item.use}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-gray-800">{resultText}</div>
                  )}
                </div>
                <div className="mt-6 flex justify-end">
                  <NeumorphicButton onClick={() => setShowResultModal(false)} variant="primary">
                    Close
                  </NeumorphicButton>
                </div>
              </GlassmorphicCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}