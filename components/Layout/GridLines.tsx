import React from 'react';

const GridLines: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Vertical Lines */}
      {/* Shifted to account for 5rem (20/w-20) sidebar + padding */}
      <div className="absolute top-0 bottom-0 left-20 md:left-44 w-[0.5px] bg-gray-200" />
      <div className="absolute top-0 bottom-0 right-12 md:right-24 w-[0.5px] bg-gray-200" />
      {/* Center line relative to the content area (calc 50% + half sidebar width roughly) */}
      <div className="absolute top-0 bottom-0 left-[calc(50%+2.5rem)] w-[0.5px] bg-gray-200 hidden lg:block" />
      
      {/* Horizontal Lines */}
      <div className="absolute left-0 right-0 top-24 h-[0.5px] bg-gray-200" />
      <div className="absolute left-0 right-0 bottom-24 h-[0.5px] bg-gray-200" />
    </div>
  );
};

export default GridLines;