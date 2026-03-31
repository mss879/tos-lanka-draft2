import React from 'react';

type FluidCornerProps = {
  className?: string; // Standard positioning (e.g., top-0 left-full)
  radius?: number; // Size of the corner
  color?: string; // The solid color to fill the negative space
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
};

export default function FluidCorner({ className = "", radius = 32, color = "#ffffff", position = 'top-left' }: FluidCornerProps) {
  // Rotate the SVG based on position to create different corners
  const getRotation = () => {
    switch (position) {
      case 'top-left': return 'rotate-0';
      case 'top-right': return 'rotate-90'; // points top-right
      case 'bottom-right': return 'rotate-180';
      case 'bottom-left': return '-rotate-90';
      default: return '';
    }
  };

  return (
    <svg 
      width={radius} 
      height={radius} 
      viewBox={`0 0 ${radius} ${radius}`} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute pointer-events-none z-20 ${getRotation()} ${className}`}
      style={{ width: radius, height: radius }}
    >
      {/* 
        This draws a square that subtracts a circle from the bottom right.
        sweep-flag=1 ensures the arc curves INWARD (concave) around the center (radius, radius),
        leaving the bottom-right completely transparent so the dark background shows through!
      */}
      <path 
        d={`M 0 0 L 0 ${radius} A ${radius} ${radius} 0 0 1 ${radius} 0 L 0 0 Z`} 
        fill={color} 
      />
    </svg>
  );
}
