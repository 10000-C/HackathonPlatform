import React from 'react';
import HackathonSidebar from './HackathonSidebar';

const PrizesTab = ({ prizes, hackathon }) => {
  // 标准评委数据
  const defaultJudges = [
    { id: 1, name: 'Wizzy', handle: '@WizzyOnChain', avatar: 'https://i.pravatar.cc/40?img=1', color: '#3B82F6' },
    { id: 2, name: 'Doodle', handle: '@Doodlegenics', avatar: 'https://i.pravatar.cc/40?img=2', color: '#EC4899' },
    { id: 3, name: 'lynk', handle: '@lynk0x', avatar: 'https://i.pravatar.cc/40?img=3', color: '#10B981' },
  ];

  // 标准评分标准（如果没有提供）
  const defaultCriteria = [
    { name: 'Originality', maxScore: 20, description: 'Is the idea novel and imaginative? Does it offer a new take on an old problem?' },
    { name: 'Relevance to Tech Fairness', maxScore: 25, description: 'Does the project address core fairness challenges (algorithm transparency, data sovereignty, sustainable income, etc.)?' },
    { name: 'Functionality & Implementation', maxScore: 20, description: 'How well is the project executed? Is there a working demo or prototype?' },
    { name: 'Impact & Usefulness', maxScore: 20, description: 'Can this project be applied to real communities or users? Is it scalable or integrable?' },
    { name: 'Design & Clarity', maxScore: 15, description: 'Is the presentation intuitive? Is the design and documentation clear enough to be understood and used?' }
  ];

  return (
    <div className="pb-16">
      {/* Content grid with sidebar */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="lg:flex-grow">
          {/* Prize categories */}
          <div className="space-y-8">
            {prizes.map((prize, index) => (
              <div key={prize.id} className="mb-10">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  {index + 1}. {prize.title} ({prize.winners} winners)
                </h2>
                
                <div className="border border-[#2b3640] rounded-lg overflow-hidden">
                  {/* 奖项头部信息 */}
                  <div className="flex justify-between items-center p-6 border-b border-[#2b3640]">
                    <p className="text-white/60 text-base">
                      {prize.title} ({prize.winners} winners)
                    </p>
                    <p className="text-3xl font-bold text-white">{prize.amount}</p>
                  </div>
                  
                  {/* 奖项描述 */}
                  <div className="p-6 border-b border-[#2b3640] text-white/80 whitespace-pre-line">
                    {prize.description}
                  </div>
                  
                  {/* 评分标准标题 */}
                  <div className="p-6 border-b border-[#2b3640]">
                    <h3 className="text-lg font-semibold text-white mb-4">Evaluation Criteria</h3>
                    
                    {/* 列头 */}
                    <div className="grid grid-cols-12 mb-2 text-sm">
                      <div className="col-span-3 text-white/60">Name</div>
                      <div className="col-span-7 text-white/60">Description</div>
                      <div className="col-span-2 text-right text-white/60">Max Score</div>
                    </div>
                    
                    {/* 分隔线 */}
                    <div className="h-px w-full bg-[#2b3640] my-2"></div>
                    
                    {/* 评分标准行 */}
                    {(prize.criteria || defaultCriteria).map((criterion, idx) => (
                      <React.Fragment key={idx}>
                        <div className="grid grid-cols-12 py-3 text-sm">
                          <div className="col-span-3 text-white font-normal">{criterion.name}</div>
                          <div className="col-span-7 text-white/90 font-normal">{criterion.description}</div>
                          <div className="col-span-2 text-right text-white font-normal">{criterion.maxScore}</div>
                        </div>
                        {idx < (prize.criteria || defaultCriteria).length - 1 && (
                          <div className="h-px w-full bg-[#2b3640]"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  
                  {/* 投票部分 */}
                  <div className="p-6 border-b border-[#2b3640]">
                    <h3 className="text-lg font-semibold text-white mb-4">Voting</h3>
                    
                    {/* 投票信息 */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-white/60 text-sm mb-1">Voting Mode</p>
                        <p className="text-white text-base font-semibold">{prize.voting?.mode || 'Unknown'}</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm mb-1">Judging Mode</p>
                        <p className="text-white text-base font-semibold">{prize.voting?.judging || 'Unknown'}</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm mb-1">Max Votes per Judge</p>
                        <p className="text-white text-base font-semibold">{prize.voting?.maxVotesPerJudge || 'Unknown'}</p>
                      </div>
                    </div>
                    
                    {/* 分隔线 */}
                    <div className="h-px w-full bg-[#2b3640] my-4"></div>
                    
                    {/* 评委信息 */}
                    <h3 className="text-white/60 text-sm mb-4">Judges</h3>
                    <div className="grid grid-cols-3 gap-6">
                      {(prize.judges || defaultJudges).map(judge => (
                        <div key={judge.id} className="flex items-center">
                          <div 
                            className="w-10 h-10 rounded-full overflow-hidden mr-3"
                            style={{ backgroundColor: judge.color }}
                          >
                            <img src={judge.avatar} alt={judge.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">{judge.name}</p>
                            <p className="text-white/60 text-sm">{judge.handle}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="sticky top-0">
            <HackathonSidebar hackathon={hackathon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizesTab;
