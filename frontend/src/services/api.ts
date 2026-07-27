import axios from 'axios';
import type { PredictionResponse } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 120000,
});

const normalizePredictionResponse = (payload: any): PredictionResponse => {
  const data = payload?.data ?? payload;
  const annotatedImage = data?.annotated_image;
  const timestamp = new Date().toLocaleString();

  // Handle null/None confidence from backend (for "Uncertain" predictions)
  const rawConfidence = data?.confidence;
  const confidence = rawConfidence !== null && rawConfidence !== undefined ? Number(rawConfidence) : null;

  return {
    prediction: data?.prediction ?? 'Uncertain',
    confidence,
    confidenceLabel: 'Backend assessment',
    processingTimeMs: Math.round((Number(data?.processing_time ?? 0)) * 1000),
    annotatedImageUrl: annotatedImage ? `http://localhost:8000/predictions/${annotatedImage}` : undefined,
    boxes: Array.isArray(data?.boxes)
      ? data.boxes.map((box: any) => ({
          x1: Number(box?.x1 ?? 0),
          y1: Number(box?.y1 ?? 0),
          x2: Number(box?.x2 ?? 0),
          y2: Number(box?.y2 ?? 0),
          confidence: Number(box?.confidence ?? 0),
        }))
      : [],
    assessment: data?.assessment ?? 'No assessment available.',
    warningLevel: data?.warning_level ?? 'Low',
    healthTips: Array.isArray(data?.health_tips) ? data.health_tips : [],
    disclaimer: data?.disclaimer ?? 'This AI result is not a medical diagnosis.',
    timestamp,
  };
};

export const predictImage = async (file: File): Promise<PredictionResponse> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await api.post('/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return normalizePredictionResponse(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error('Unable to reach the backend. Please make sure the API server is running.');
      }

      const detail = error.response?.data?.detail ?? error.response?.data?.message ?? 'Prediction failed.';
      throw new Error(detail);
    }

    throw new Error('Prediction failed. Please try again.');
  }
};
