// src/components/BannerSection.jsx
import { useState } from 'react';

export default function BannerSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative h-[400px] overflow-hidden mb-8">
      {/* background */}
        <img
          src="src/assets/Hero Image.jpg"
          alt="Open Source Frontier"
          className="w-full h-full object-cover rounded-lg"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#1b1a1d] via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">

            {/* Featured */}
          <div className="absolute top-4 left-4 bg-white font-bold text-[#0092ff] whitespace-nowrap text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <span>🌟</span> Featured
          </div>

            <h1 className="text-5xl font-bold text-white mb-4">Open Source Frontier</h1>
            <p className="text-[#949fa8] text-lg mb-8">AI x WEB3 x Transparency</p>
            {/* 信息卡片组 —— 每个都有独立遮罩 */}
          <div className="flex justify-center gap-6 mb-8 text-sm md:text-base">
            {/* Registration Close */}
            <div className="bg-black/30 backdrop-blur-xs text-white px-3 py-1 rounded-md text-center">
              <div className="font-medium text-[#949fa8]">Registration Close</div>
              <div className="">12 days left</div>
            </div>

            {/* Tech Stack */}
            <div className="bg-black/30 backdrop-blur-xs text-white px-3 py-1 rounded-md text-center">
              <div className="font-medium text-[#949fa8]">Tech Stack</div>
              <div className="">All tech stacks</div>
            </div>

            {/* Level */}
            <div className="bg-black/30 backdrop-blur-xs text-white px-3 py-1 rounded-md text-center">
              <div className="font-medium text-[#949fa8]">Level</div>
              <div className="">All levels accepted</div>
            </div>

            {/* Total Prize */}
            <div className="bg-black/30 backdrop-blur-xs text-white px-3 py-1 rounded-md text-center">
              <div className="font-medium text-[#949fa8]">Total Prize</div>
              <div className="">$50,000.00 USD</div>
            </div>
          </div>

            {/* 白色按钮 */}
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`mt-8 px-6 py-2 bg-white text-[#1b1a1d] font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform ${
              isHovered ? 'scale-105' : ''
            }`}
          >
            Start Register →
          </button>
          </div>
        </div>
      </div>
  );
}