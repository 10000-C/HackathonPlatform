import React from 'react';
import HackathonSidebar from './HackathonSidebar';

const PrizesTab = ({ prizes, hackathon }) => {
  // 标准评委数据（不再使用，以后端提供的数据为准）
  const defaultJudges = [];

  // 标准评分标准（如果没有提供）
  const defaultCriteria = [
    { name: 'Default Criteria', description: 'No evaluation criteria provided', maxScore: 100 }
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
                    
                    {prize.evaluationCriteria && prize.evaluationCriteria.length > 0 && (
                      <>
                        {/* 列头 */}
                        <div className="grid grid-cols-12 mb-2 text-sm">
                          <div className="col-span-3 text-white/60">Name</div>
                          <div className="col-span-7 text-white/60">Description</div>
                          <div className="col-span-2 text-right text-white/60">Points</div>
                        </div>
                        
                        {/* 分隔线 */}
                        <div className="h-px w-full bg-[#2b3640] my-2"></div>
                        
                        {/* 评分标准行 */}
                        {prize.evaluationCriteria.map((criterion, idx) => (
                          <React.Fragment key={idx}>
                            <div className="grid grid-cols-12 py-3 text-sm">
                              <div className="col-span-3 text-white font-normal">{criterion.name}</div>
                              <div className="col-span-7 text-white/90 font-normal">{criterion.description}</div>
                              <div className="col-span-2 text-right text-white font-normal">{criterion.points}</div>
                            </div>
                            {idx < prize.evaluationCriteria.length - 1 && (
                              <div className="h-px w-full bg-[#2b3640]"></div>
                            )}
                          </React.Fragment>
                        ))}
                      </>
                    )}
                  </div>
                  
                  {/* 评判模式 */}
                  <div className="p-6 border-b border-[#2b3640]">
                    <h3 className="text-lg font-semibold text-white mb-4">Judging</h3>
                    
                    {/* 投票信息 */}
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div>
                        <p className="text-white/60 text-sm mb-1">Judging Mode</p>
                        <p className="text-white text-base font-semibold">{prize.judgingMode}</p>
                      </div>
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
