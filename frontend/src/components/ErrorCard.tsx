import { AlertCircle } from 'lucide-react';

interface ErrorCardProps {
  message: string;
}

const ErrorCard = ({ message }: ErrorCardProps) => {
  return (
    <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 shadow-soft">
      <div className="flex items-center gap-3 text-rose-700">
        <AlertCircle size={20} />
        <p className="font-semibold">Analysis could not be completed</p>
      </div>
      <p className="mt-3 text-sm text-rose-600">{message}</p>
    </div>
  );
};

export default ErrorCard;
