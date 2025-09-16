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
      builder: 'DataGuardians',
      description: 'A blockchain-based data sovereignty protocol that gives users complete control over how their data is shared and used.',
      techStack: ['Solidity', 'React', 'IPFS'],
      submittedAt: '2024-01-14',
      lastEdited: '2 days ago',
      thumbnailUrl: 'https://placehold.co/400x400/2b3640/white?text=FairData+Protocol',
    },
    {
      id: 2,
      title: 'TransparAI',
      team: 'AlgoEthics',
      builder: 'AlgoEthics',
      description: 'Open-source AI decision transparency tool that allows users to see and understand how algorithms make recommendations and decisions.',
      techStack: ['Python', 'TensorFlow', 'Vue.js'],
      submittedAt: '2024-01-13',
      lastEdited: '3 days ago',
      thumbnailUrl: 'https://placehold.co/400x400/2b3640/white?text=TransparAI',
    },
    {
      id: 3,
      title: 'CreatorFirst',
      team: 'ContentDAO',
      builder: 'ContentDAO',
      description: 'A creator-first content platform ensuring fair revenue distribution and complete ownership of works.',
      techStack: ['Rust', 'WebAssembly', 'Svelte'],
      submittedAt: '2024-01-15',
      lastEdited: '1 day ago',
      thumbnailUrl: 'https://placehold.co/400x400/2b3640/white?text=CreatorFirst',
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
                <div className="bg-opacity-10 border border-solid border-[#2b3640] rounded-lg p-6 mb-8">
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
                    <div key={submission.id} className="bg-opacity-10 border border-solid border-[#2b3640] rounded-2xl overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 md:h-48 m-4 rounded-2xl bg-gray-800 overflow-hidden flex-shrink-0 flex items-center justify-center self-center">
                          <img
                            src={submission.thumbnailUrl}
                            alt={submission.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between min-h-48">
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1">{submission.title}</h3>
                            <p className="text-white/60 text-sm mb-3">
                              <span>Builder: {submission.builder}</span>
                              <span className="mx-2">•</span>
                              <span>Last edited: {submission.lastEdited}</span>
                            </p>

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
                          </div>

                          <div className="flex justify-end text-white/60 text-sm">
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
