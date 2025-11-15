import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Eye, Layers, Clock } from 'lucide-react';
import { ProcessingStatus } from '../../types';

interface ProcessingPanelProps {
  status: ProcessingStatus;
}

const stages = [
  { id: 'ocr', label: 'OCR', icon: Eye, description: 'Extracting text from document' },
  { id: 'nlp', label: 'NLP', icon: Brain, description: 'Analyzing content and keywords' },
  { id: 'classification', label: 'Classification', icon: Layers, description: 'Determining document category' },
  { id: 'completed', label: 'Complete', icon: Clock, description: 'Processing finished' }
];

export default function ProcessingPanel({ status }: ProcessingPanelProps) {
  const currentStageIndex = stages.findIndex(stage => stage.id === status.stage);

  return (
    <div className="bg-white backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-black mb-6">Processing Status</h3>
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Overall Progress</span>
          <span className="text-sm font-medium text-black">{status.progress}%</span>
        </div>
        <div className="w-full bg-gray-300/50 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${status.progress}%` }}
            className="h-3 bg-black rounded-full"
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Processing Stages */}
      <div className="space-y-4 mb-6">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = index === currentStageIndex;
          const isCompleted = index < currentStageIndex;
          
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center space-x-4 p-4 rounded-xl transition-all ${
                isActive 
                  ? 'bg-black/10 border border-black/30' 
                  : isCompleted 
                  ? 'bg-gray-200/50 border border-gray-300'
                  : 'bg-gray-100/50 border border-gray-200'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                isActive 
                  ? 'bg-black/20' 
                  : isCompleted 
                  ? 'bg-gray-300/50'
                  : 'bg-gray-200/50'
              }`}>
                <Icon className={`w-5 h-5 ${
                  isActive 
                    ? 'text-black' 
                    : isCompleted 
                    ? 'text-gray-700'
                    : 'text-gray-600'
                }`} />
              </div>
              
              <div className="flex-1">
                <h4 className={`font-medium ${
                  isActive 
                    ? 'text-black' 
                    : isCompleted 
                    ? 'text-gray-700'
                    : 'text-gray-600'
                }`}>
                  {stage.label}
                </h4>
                <p className="text-xs text-gray-600">{stage.description}</p>
              </div>
              
              {isActive && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Status Info */}
      {status.detectedLanguage && (
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Language:</span>
            <span className="ml-2 text-black font-medium">{status.detectedLanguage}</span>
          </div>
          {status.confidence && (
            <div>
              <span className="text-gray-600">Confidence:</span>
              <span className="ml-2 text-black font-medium">{status.confidence}%</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}