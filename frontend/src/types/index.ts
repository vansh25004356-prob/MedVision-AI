export interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  confidence: number;
}

export interface PredictionResponse {
  prediction: string;
  confidence: number | null;
  confidenceLabel: string;
  processingTimeMs: number;
  annotatedImageUrl?: string;
  boxes?: BoundingBox[];
  assessment: string;
  warningLevel: string;
  healthTips: string[];
  disclaimer: string;
  timestamp?: string;
  imageName?: string;
}

export interface UploadState {
  file: File | null;
  previewUrl: string | null;
  isUploading: boolean;
  error: string | null;
  result: PredictionResponse | null;
}