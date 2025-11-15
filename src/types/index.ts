export interface Document {
  id: string;
  name: string;
  category: 'Medical' | 'Financial' | 'Legal' | 'Personal' | 'Other';
  tags: string[];
  uploadDate: Date;
  size: number;
  thumbnail?: string;
  extractedText?: string;
  confidence?: number;
  metadata?: {
    dates?: string[];
    amounts?: string[];
    ids?: string[];
  };
}

export interface UploadProgress {
  id: string;
  name: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
}

export interface ProcessingStatus {
  stage: 'ocr' | 'nlp' | 'classification' | 'completed';
  progress: number;
  detectedLanguage?: string;
  confidence?: number;
  processingTime?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}