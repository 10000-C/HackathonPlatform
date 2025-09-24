import React from 'react';
import HackathonSidebar from './HackathonSidebar';

const JudgesTab = ({ prizes, hackathon }) => {
  // Extract unique judges from all prizes
  const getAllJudges = () => {
    const judgeMap = new Map();
    
    prizes.forEach(prize => {
      prize.judges.forEach(judge => {
        if (!judgeMap.has(judge.handle)) {
          judgeMap.set(judge.handle, judge);
        }
      });
    });
    
    return Array.from(judgeMap.values());
  };
  
  const judges = getAllJudges();
  
  return (
    <div className="pb-16">
      <h2 className="text-2xl font-semibold text-white mb-8">Judges & Judging Process</h2>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="lg:flex-grow">
          <div className="max-w-[800px]">
            <section className="mb-10">
              <div className="bg-[#2b3640] bg-opacity-10 border border-[#2b3640] rounded-lg p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white">Meet Our Judges</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {judges.map((judge) => (
                    <div key={judge.handle} className="flex">
                      <div className="w-16 h-16 rounded-full bg-gray-700 mr-4 overflow-hidden">
                        <img src={judge.avatar || 'https://via.placeholder.com/64'} alt={judge.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{judge.name}</h3>
                        <p className="text-white/60 mb-2">{judge.handle}</p>
                        <p className="text-white/80">
                          {judge.bio || `${judge.name} is a judge for our hackathon who will review projects and select the best works.`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            <section>
              <div className="bg-[#2b3640] bg-opacity-10 border border-[#2b3640] rounded-lg p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white">Judging Process</h3>
                </div>
                
                <h4 className="text-lg font-medium text-white mb-4">Process Overview</h4>
                
                <ol className="list-decimal list-inside text-white/80 space-y-3 pl-4 mb-6">
                  <li>After all project submissions close, judges will have 5 days to review all submitted works.</li>
                  <li>Each judge will score projects based on the evaluation criteria.</li>
                  <li>Judges can leave feedback to help participants understand the strengths and areas for improvement.</li>
                  <li>All judge scores will be aggregated, and the highest-scoring projects will receive awards.</li>
                  <li>Results will be announced after the judging period ends.</li>
                </ol>
                
                <h4 className="text-lg font-medium text-white mb-4">Judging Criteria</h4>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-white font-medium">Originality (20%)</p>
                    <p className="text-white/60 text-sm mt-1">Is the idea novel? Does it offer a new take on an old problem?</p>
                  </div>
                  
                  <div>
                    <p className="text-white font-medium">Relevance to Tech Fairness (25%)</p>
                    <p className="text-white/60 text-sm mt-1">Does the project address core fairness challenges?</p>
                  </div>
                  
                  <div>
                    <p className="text-white font-medium">Functionality & Implementation (20%)</p>
                    <p className="text-white/60 text-sm mt-1">How well is the project executed? Is there a working demo or prototype?</p>
                  </div>
                  
                  <div>
                    <p className="text-white font-medium">Impact & Usefulness (20%)</p>
                    <p className="text-white/60 text-sm mt-1">Can this project be applied to real communities or users?</p>
                  </div>
                  
                  <div>
                    <p className="text-white font-medium">Design & Clarity (15%)</p>
                    <p className="text-white/60 text-sm mt-1">Is the presentation intuitive? Is the design and documentation clear?</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-medium text-white mb-4">Judging Timeline</h4>
                
                <div className="space-y-3 text-white/80">
                  <p><span className="font-medium">Project Submission Deadline:</span> January 15, 2024</p>
                  <p><span className="font-medium">Judging Period:</span> January 16 - 20, 2024</p>
                  <p><span className="font-medium">Winners Announced:</span> January 25, 2024</p>
                </div>
              </div>
            </section>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="sticky top-24">
            <HackathonSidebar hackathon={hackathon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgesTab;
