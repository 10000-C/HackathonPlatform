import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function JudgeDashboard() {
  const [activeTab, setActiveTab] = useState('project-overview');

  return (
    <div className="min-h-screen bg-[#1b1a1d] pl-[216px]">
      {/* 顶部返回链接 */}
      <div className="px-6 py-4 border-b border-[#2b3640]">
        <Link to="/hackathons" className="text-[#949fa8] hover:text-white flex items-center gap-2">
          <span>←</span>
          <span>Back to hackathons to judge</span>
        </Link>
      </div>

      {/* 内容区域 */}
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-white mb-6">Hackathons to judge</h1>
        
        {/* 黑客松卡片 */}
        <div className="bg-[#1b1a1d] border border-[#2b3640] rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl text-white">ChainSpark Hackathon</h2>
                <span className="px-2 py-1 bg-green-900/30 text-green-400 text-sm rounded">Live</span>
              </div>
              <p className="text-[#949fa8] mb-4">ChainSpark Hackathon was born from a simple but radical belief: true innovation shouldn't be strangled by black-box algorithms or centralized gatekeepers.</p>
              
              {/* 统计信息 */}
              <div className="grid grid-cols-4 gap-8 mb-4">
                <div>
                  <p className="text-[#949fa8]">Participants</p>
                  <p className="text-white font-medium">405</p>
                </div>
                <div>
                  <p className="text-[#949fa8]">Projects Submitted</p>
                  <p className="text-white font-medium">3</p>
                </div>
                <div>
                  <p className="text-[#949fa8]">Prize Cohorts</p>
                  <p className="text-white font-medium">2</p>
                </div>
                <div>
                  <p className="text-[#949fa8]">Tech Stack</p>
                  <p className="text-white font-medium">All tech stack</p>
                </div>
              </div>

              <button className="bg-[#0092ff] text-white px-4 py-2 rounded-lg hover:bg-[#0092ff]/90">
                Go to judging →
              </button>
            </div>

            {/* 右侧图片 */}
            <img 
              src="https://placehold.co/280x160/2b3640/FFFFFF" 
              alt="Hackathon" 
              className="w-[280px] h-[160px] rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}