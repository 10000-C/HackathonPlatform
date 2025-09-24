import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import HackathonSidebar from './HackathonSidebar';
import getDemos from '../../utils/GetDemos';

const SubmissionsTab = ({ hackathon }) => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // 从Graph获取demos列表
      const response = await getDemos(hackathon.id, null, "onlyActivity");
      const demos = response.demos;
      
      // 并行获取所有submissions的详细信息
      const submissionsPromises = demos.map(async (demo) => {
        try {
          const url = `https://gold-rational-monkey-593.mypinata.cloud/ipfs/${demo.demo_dataCID}`;
          const request = await fetch(url);
          const submissionData = await request.json();
          console.log("submissionData", submissionData);
          const imageUrl = `https://gold-rational-monkey-593.mypinata.cloud/ipfs/${submissionData.logo}`;

          return {
            id: demo.demo_demoId,
            thumbnailUrl: imageUrl,
            ...submissionData,
          };
        } catch (err) {
          console.error(`Error fetching submission ${demo.demo_demoId}:`, err);
          return null;
        }
      });

      // 等待所有请求完成并过滤掉失败的请求
      const submissionsData = (await Promise.all(submissionsPromises))
        .filter(submission => submission !== null);

      setSubmissions(submissionsData);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      setError("Failed to load submissions. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  // 根据当前日期和hackathon的结束日期判断提交期是否活跃
  useEffect(() => {
    if (hackathon && hackathon.id) {
      fetchSubmissions();
    }
  }, [hackathon?.id]);

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
              {isLoading ? (
                <div className="bg-opacity-10 border border-solid border-[#242425] rounded-lg p-10 text-center">
                  <h2 className="text-xl font-semibold text-white mb-3">Loading submissions...</h2>
                </div>
              ) : error ? (
                <div className="bg-opacity-10 border border-solid border-[#242425] rounded-lg p-10 text-center">
                  <h2 className="text-xl font-semibold text-white mb-3">Error</h2>
                  <p className="text-white/80 mb-6">{error}</p>
                </div>
              ) : submissions.length > 0 ? (
                <div className="space-y-6">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="bg-opacity-10 border border-solid border-[#2b3640] rounded-2xl overflow-hidden hover:border-[#0092ff] transition-colors duration-200">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 md:h-48 m-4 rounded-2xl bg-gray-800 overflow-hidden flex-shrink-0 flex items-center justify-center self-center">
                          {submission.logo ? (
                            <img
                              src={`https://gateway.pinata.cloud/ipfs/${submission.logo}`}
                              alt={submission.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = '/public/vite.svg'; // 设置默认图片
                                e.target.onerror = null;
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-[#1e2329] flex items-center justify-center">
                              <span className="text-white/40 text-sm">No Logo</span>
                            </div>
                          )}
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between min-h-48">
                          <div>
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="text-lg font-semibold text-white">{submission.name}</h3>
                              {submission.githubLink && (
                                <a 
                                  href={ submission.githubLink } 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-[#0092ff] hover:text-[#0092ff]/80 ml-4"
                                >
                                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                                  </svg>
                                </a>
                              )}
                            </div>

                            <p className="text-white/80 mb-4 line-clamp-2">
                              {submission.shortDescription}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {submission.techStack.map((tech) => (
                                <span 
                                  key={tech} 
                                  className="bg-[#1e2329] text-white/80 text-xs py-1.5 px-3 rounded-full border border-[#2b3640]"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-end text-white/60 text-sm">
                            <button 
                              className="text-[#0092ff] hover:text-[#0092ff]/80 transition-colors"
                              onClick={() => navigate(`/hackathons/${hackathon.id}/projects/${submission.id}`)}
                            >
                              View Details →
                            </button>
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
