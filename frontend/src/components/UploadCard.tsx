import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlus, ScanLine, UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';

interface UploadCardProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  previewUrl: string | null;
}

const UploadCard = ({ onFileSelect, isLoading, previewUrl }: UploadCardProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    multiple: false,
    disabled: isLoading,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Step 1</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Upload a chest X-ray</h2>
          <p className="mt-2 text-sm text-slate-500">Drag and drop a study or browse from your device to begin analysis.</p>
        </div>
        <div className="rounded-2xl bg-brand-50 p-3 text-brand-700">
          <ScanLine size={22} />
        </div>
      </div>

      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-3xl border-2 border-dashed p-8 text-center transition ${isDragActive ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:border-brand-400 hover:bg-slate-50'}`}
      >
        <input {...getInputProps()} />
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
          {previewUrl ? <ImagePlus size={26} /> : <UploadCloud size={26} />}
        </div>
        <p className="mt-5 text-lg font-semibold text-slate-800">
          {isDragActive ? 'Drop your image here' : 'Choose image or drag and drop'}
        </p>
        <p className="mt-2 text-sm text-slate-500">Supported formats: JPG, PNG, WEBP</p>
      </div>
    </motion.div>
  );
};

export default UploadCard;
