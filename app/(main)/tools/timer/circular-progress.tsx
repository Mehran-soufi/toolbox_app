"use client";

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

export default function CircularProgress({
  progress,
  size = 200,
  strokeWidth = 10,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;

  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="
      relative
      flex
      items-center
      justify-center
      "
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        className="
        -rotate-90
        "
      >
        {/* Background Circle */}

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="
          text-muted
          "
        />

        {/* Progress Circle */}

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="
          text-purple-600
          transition-all
          duration-500
          ease-out
          "
        />
      </svg>

      {/* Center Content */}

      <div
        className="
        absolute
        inset-0
        flex
        items-end
        justify-center
        mb-5
        "
      >
        <span
          className="
          text-sm
          font-semibold
          text-purple-600
          "
        >
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
