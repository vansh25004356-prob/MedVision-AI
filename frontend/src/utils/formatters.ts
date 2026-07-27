export const formatConfidence = (value: number | null | undefined) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 'Not Available';
  }

  // Backend returns confidence as decimal (0.0–1.0), convert to percentage
  const percentage = value * 100;
  return `${percentage.toFixed(1)}%`;
};

export const formatTime = (value: number) => `${value.toFixed(0)} ms`;
