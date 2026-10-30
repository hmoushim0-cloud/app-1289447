import React from 'react';

interface BespokeVectorIllustrationProps {
  archetype?: string;
  screenIdx?: number;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export const BespokeVectorIllustration: React.FC<BespokeVectorIllustrationProps> = ({
  archetype = 'booking_timeline',
  screenIdx = 1,
  className = 'w-full h-40',
  primaryColor = '#0F766E', // Teal
  secondaryColor = '#F59E0B', // Amber
}) => {
  const w = 400;
  const h = 160;
  const cx = w / 2; // 200
  const cy = h / 2; // 80

  const renderContent = () => {
    if (archetype === 'booking_timeline') {
      if (screenIdx === 1) {
        // Screen 1: Calendar Grid Matrix & Clock Chrono Vector
        return (
          <>
            {/* Calendar Base */}
            <rect
              x={cx - 70}
              y={cy - 50}
              width={140}
              height={100}
              rx={8}
              fill={primaryColor}
              fillOpacity={0.2}
              stroke={primaryColor}
              strokeWidth={3}
            />
            {/* Calendar Header */}
            <path
              d={`M ${cx - 70} ${cy - 50 + 8} A 8 8 0 0 1 ${cx - 70 + 8} ${cy - 50} H ${cx + 70 - 8} A 8 8 0 0 1 ${cx + 70} ${cy - 50 + 8} V ${cy - 20} H ${cx - 70} Z`}
              fill={primaryColor}
            />
            {/* Calendar Ring Clips */}
            <line
              x1={cx - 45}
              y1={cy - 60}
              x2={cx - 45}
              y2={cy - 40}
              stroke={secondaryColor}
              strokeWidth={5}
              strokeLinecap="round"
            />
            <line
              x1={cx + 45}
              y1={cy - 60}
              x2={cx + 45}
              y2={cy - 40}
              stroke={secondaryColor}
              strokeWidth={5}
              strokeLinecap="round"
            />
            {/* Grid Horizontal Lines */}
            <line
              x1={cx - 70}
              y1={cy}
              x2={cx + 70}
              y2={cy}
              stroke={primaryColor}
              strokeOpacity={0.4}
              strokeWidth={2}
            />
            <line
              x1={cx - 70}
              y1={cy + 25}
              x2={cx + 70}
              y2={cy + 25}
              stroke={primaryColor}
              strokeOpacity={0.4}
              strokeWidth={2}
            />
            {/* Grid Vertical Lines */}
            <line
              x1={cx - 20}
              y1={cy - 20}
              x2={cx - 20}
              y2={cy + 50}
              stroke={primaryColor}
              strokeOpacity={0.4}
              strokeWidth={2}
            />
            <line
              x1={cx + 25}
              y1={cy - 20}
              x2={cx + 25}
              y2={cy + 50}
              stroke={primaryColor}
              strokeOpacity={0.4}
              strokeWidth={2}
            />
            {/* Selected Date Green Badge */}
            <rect
              x={cx - 5}
              y={cy + 8}
              width={20}
              height={20}
              rx={4}
              fill="#10B981"
            />
            {/* Clock Outline */}
            <circle
              cx={cx + 105}
              cy={cy + 5}
              r={25}
              fill="#1E293B"
              stroke={secondaryColor}
              strokeWidth={4}
            />
            {/* Clock Hands */}
            <line
              x1={cx + 105}
              y1={cy + 5}
              x2={cx + 105}
              y2={cy - 10}
              stroke="#FFFFFF"
              strokeWidth={3}
              strokeLinecap="round"
            />
            <line
              x1={cx + 105}
              y1={cy + 5}
              x2={cx + 120}
              y2={cy + 5}
              stroke="#FFFFFF"
              strokeWidth={3}
              strokeLinecap="round"
            />
            <circle cx={cx + 105} cy={cy + 5} r={3} fill="#F59E0B" />
          </>
        );
      } else if (screenIdx === 2) {
        // Screen 2: Chrono Progress Stream & Milestone Nodes
        return (
          <>
            {/* Sine Stream */}
            <path
              d={`M ${cx - 140} ${cy} C ${cx - 70} ${cy - 45}, ${cx + 70} ${cy + 45}, ${cx + 140} ${cy}`}
              fill="none"
              stroke={primaryColor}
              strokeWidth={6}
              strokeLinecap="round"
            />
            {/* Left Node */}
            <circle cx={cx - 140} cy={cy} r={12} fill={primaryColor} />
            <circle cx={cx - 140} cy={cy} r={6} fill="#FFFFFF" />
            {/* Center Node */}
            <circle cx={cx} cy={cy} r={12} fill={secondaryColor} />
            <circle cx={cx} cy={cy} r={5} fill="#0F172A" />
            {/* Right Node (Completed Green) */}
            <circle cx={cx + 140} cy={cy} r={12} fill="#10B981" />
            {/* Checkmark inside Right Node */}
            <path
              d={`M ${cx + 134} ${cy - 2} L ${cx + 139} ${cy + 3} L ${cx + 146} ${cy - 4}`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Milestone Label Stems */}
            <line
              x1={cx - 140}
              y1={cy - 25}
              x2={cx - 140}
              y2={cy - 15}
              stroke="#FFFFFF"
              strokeWidth={3}
            />
            <line
              x1={cx}
              y1={cy - 25}
              x2={cx}
              y2={cy - 15}
              stroke="#FFFFFF"
              strokeWidth={3}
            />
            <line
              x1={cx + 140}
              y1={cy - 25}
              x2={cx + 140}
              y2={cy - 15}
              stroke="#FFFFFF"
              strokeWidth={3}
            />
            {/* Accent dashes */}
            <line
              x1={cx - 80}
              y1={cy - 35}
              x2={cx - 60}
              y2={cy - 35}
              stroke={secondaryColor}
              strokeWidth={3}
              strokeLinecap="round"
            />
            <line
              x1={cx + 60}
              y1={cy + 35}
              x2={cx + 80}
              y2={cy + 35}
              stroke={secondaryColor}
              strokeWidth={3}
              strokeLinecap="round"
            />
          </>
        );
      } else {
        // Screen 3: Certified Booking Seal & Ribbon Stamp
        return (
          <>
            {/* Outer Seal Circle */}
            <circle
              cx={cx}
              cy={cy}
              r={55}
              fill={primaryColor}
              fillOpacity={0.2}
              stroke={primaryColor}
              strokeWidth={5}
            />
            {/* Inner Concentric Circle */}
            <circle
              cx={cx}
              cy={cy}
              r={45}
              fill="none"
              stroke={secondaryColor}
              strokeWidth={2}
              strokeDasharray="4 4"
            />
            {/* Verified Big Checkmark */}
            <path
              d={`M ${cx - 20} ${cy} L ${cx - 5} ${cy + 15} L ${cx + 25} ${cy - 15}`}
              fill="none"
              stroke="#10B981"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Ribbon Tail Left */}
            <polygon
              points={`${cx - 30},${cy + 45} ${cx - 40},${cy + 70} ${cx - 15},${cy + 55}`}
              fill={primaryColor}
            />
            {/* Ribbon Tail Right */}
            <polygon
              points={`${cx + 30},${cy + 45} ${cx + 40},${cy + 70} ${cx + 15},${cy + 55}`}
              fill={primaryColor}
            />
            {/* Cardinal Marks */}
            <line
              x1={cx}
              y1={cy - 55}
              x2={cx}
              y2={cy - 45}
              stroke={secondaryColor}
              strokeWidth={3}
            />
            <line
              x1={cx}
              y1={cy + 45}
              x2={cx}
              y2={cy + 55}
              stroke={secondaryColor}
              strokeWidth={3}
            />
            <line
              x1={cx - 55}
              y1={cy}
              x2={cx - 45}
              y2={cy}
              stroke={secondaryColor}
              strokeWidth={3}
            />
            <line
              x1={cx + 45}
              y1={cy}
              x2={cx + 55}
              y2={cy}
              stroke={secondaryColor}
              strokeWidth={3}
            />
            {/* Center Core Dot */}
            <circle cx={cx} cy={cy} r={4} fill="#FFFFFF" />
          </>
        );
      }
    }

    // Default Fallback Vector Graphics
    return (
      <>
        <circle cx={cx} cy={cy} r={50} fill={primaryColor} fillOpacity={0.3} stroke={secondaryColor} strokeWidth={3} />
        <path d={`M ${cx - 25} ${cy} L ${cx} ${cy - 25} L ${cx + 25} ${cy} L ${cx} ${cy + 25} Z`} fill={secondaryColor} />
      </>
    );
  };

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-slate-800/80 border border-slate-700/60 p-2 shadow-inner ${className}`}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full h-full max-h-44 transition-all duration-300 select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width={w} height={h} fill="url(#glowGrad)" />
        {renderContent()}
      </svg>
    </div>
  );
};
