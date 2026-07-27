import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';

interface ImagePreviewProps {
  previewUrl: string | null;
  fileName: string | null;
}

const ImagePreview = ({ previewUrl, fileName }: ImagePreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Step 2</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Preview</h2>
        </div>
      </div>

      {previewUrl ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <img src={previewUrl} alt="Selected preview" className="h-[320px] w-full object-contain" />
        </div>
      ) : (
        <div className="flex h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-slate-400">
          <ImageIcon size={36} />
          <p className="mt-3 text-sm">Your selected image will appear here.</p>
        </div>
      )}

      {fileName ? <p className="mt-4 text-sm text-slate-500">{fileName}</p> : null}
    </motion.div>
  );
};

export default ImagePreview;
