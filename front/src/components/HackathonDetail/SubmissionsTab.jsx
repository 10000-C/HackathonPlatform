import { useNavigate } from 'react-router-dom';
import React from 'react';
import HackathonSidebar from './HackathonSidebar';

const SubmissionsTab = ({ hackathon }) => {
  // 从hackathon对象获取提交数据，如果不存在则使用空数组
  const navigate = useNavigate();
  const submissions = hackathon.submissions || [
    {
      id: 1,
      title: 'FairData Protocol',
      team: 'DataGuardians',
      description: 'A blockchain-based data sovereignty protocol that gives users complete control over how their data is shared and used.',
      techStack: ['Solidity', 'React', 'IPFS'],
      submittedAt: '2024-01-14',
      thumbnailUrl: 'https://placehold.co/400x225/2b3640/white?text=FairData+Protocol',
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      title: 'TransparAI',
      team: 'AlgoEthics',
      description: 'Open-source AI decision transparency tool that allows users to see and understand how algorithms make recommendations and decisions.',
      techStack: ['Python', 'TensorFlow', 'Vue.js'],
      submittedAt: '2024-01-13',
      thumbnailUrl: 'https://placehold.co/400x225/2b3640/white?text=TransparAI',
      likes: 19,
      comments: 5
    },
    {
      id: 3,
      title: 'CreatorFirst',
      team: 'ContentDAO',
      description: 'A creator-first content platform ensuring fair revenue distribution and complete ownership of works.',
      techStack: ['Rust', 'WebAssembly', 'Svelte'],
      submittedAt: '2024-01-15',
      thumbnailUrl: 'https://placehold.co/400x225/2b3640/white?text=CreatorFirst',
      likes: 31,
      comments: 12
    }
  ];

  // 根据当前日期和hackathon的结束日期判断提交期是否活跃
  const now = new Date();
  const endDate = new Date(hackathon.endDate);
  const isSubmissionPeriodActive = now <= endDate;

  return (
    <div className="pb-16">
      <h2 className="text-2xl font-semibold text-white mb-8">Submitted Projects for {hackathon.title}</h2>
      
      {/* Content grid with sidebar */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="lg:flex-grow">
          <div className="max-w-[800px]">
            <section>
              {isSubmissionPeriodActive && (
                <div className="bg-opacity-10 border-2 border-solid border-[#242425] rounded-lg p-6 mb-8">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white">Submission Guidelines</h3>
                  </div>
                  
                  <p className="text-white/80 mb-6">
                    Before submitting your project to {hackathon.title}, please ensure you include the following:
                  </p>
                  
                  <ul className="list-disc list-inside text-white/80 mb-6 space-y-2 pl-4">
                    <li>Project title and brief description</li>
                    <li>Team member information</li>
                    <li>Problem solved and target audience</li>
                    <li>Technical implementation details and tech stack used</li>
                    <li>Demo video or screenshots</li>
                    <li>Project repository link (GitHub, etc.)</li>
                    <li>Instructions on how to run/test the project</li>
                  </ul>
                  
                  <div className="flex justify-center mt-8">
                    <button className="bg-[#0092ff] text-white font-medium py-3 px-6 rounded-lg"
                    onClick={() => navigate("/create-project/" + hackathon.id)}>
                      Submit Your Project
                    </button>
                  </div>
                </div>
              )}
            </section>
            
            <section>
              {submissions.length > 0 ? (
                <div className="space-y-6">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="bg-opacity-10 border border-solid border-[#242425] rounded-lg overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-48 bg-gray-800 overflow-hidden">
                          <img 
                            src={submission.thumbnailUrl} 
                            alt={submission.title}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        
                        <div className="p-5 md:w-2/3">
                          <h3 className="text-lg font-semibold text-white mb-1">{submission.title}</h3>
                          <p className="text-white/60 text-sm mb-3">By {submission.team} • Submitted on {submission.submittedAt}</p>
                          
                          <p className="text-white/80 mb-4 line-clamp-2">
                            {submission.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {submission.techStack.map((tech) => (
                              <span key={tech} className="bg-opacity-50 text-white text-xs py-1 px-2 rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex justify-between text-white/60 text-sm">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                              {submission.likes}
                            </div>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                              </svg>
                              {submission.comments}
                            </div>
                            <button className="text-[#0092ff]">View Details</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-opacity-10 border border-solid border-[#242425] rounded-lg p-10 text-center">
                  <h2 className="text-xl font-semibold text-white mb-3">No Projects Submitted Yet</h2>
                  <p className="text-white/80 mb-6">
                    Projects will appear here after the submission period for {hackathon.title} ends on {new Date(hackathon.endDate).toLocaleDateString()}. Please submit your project before the deadline.
                  </p>
                </div>
              )}
            </section>
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

export default SubmissionsTab;
