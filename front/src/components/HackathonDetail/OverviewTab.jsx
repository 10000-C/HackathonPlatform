import React from 'react';
import HackathonSidebar from './HackathonSidebar';

const OverviewTab = ({ hackathon }) => {
  // 确保如果hackathon不存在或者没有传入，使用默认值
  const { 
    title = 'Hackathon',
    description = 'No description available'
  } = hackathon || {};

  // 将描述分段，方便展示
  const descriptionParagraphs = description.split('\n\n');
  const introText = descriptionParagraphs[0] || '';
  const additionalText = descriptionParagraphs.slice(1).join('\n\n') || '';

  return (
    <div className="pb-16">
      {/* Page title */}
      <h2 className="text-2xl font-semibold text-white mb-8">Overview</h2>

      {/* Content grid with sidebar */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="lg:flex-grow">
          <div >
            {/* Main content area with proper styling */}
            <section className="mb-10">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
              </div>
              <div className="space-y-4">
                <p className="font-medium text-white">Calling All Builders, Dreamers, and Rule-Breakers!</p>
                <p className="text-white/80">{introText}</p>
                {additionalText && <p className="text-white/80">{additionalText}</p>}
              </div>
            </section>

            {/* Available in Prizes section */}
            <section className="mb-10">
              <div className="border-2 border-solid border-[#242425] rounded-lg p-6">
                <div className="flex flex-col">
                  <div className="flex flex-row items-center justify-between">
                    <span className="text-white/60 text-sm">Available in Prizes</span>
                    <button className="bg-[#0092FF] px-4 py-3 rounded-lg">
                      <span className="flex items-center gap-2 text-white text-sm font-bold">
                        Detail Breakdown
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.91699 7H11.0837" stroke="white" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 2.91675L11.0833 7.00008L7 11.0834" stroke="white" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </button>
                  </div>
                  <span className="text-white text-3xl font-bold mt-2 mb-6">{hackathon.prizePool}</span>
                </div>
                
                <div className="space-y-3 border-l border-[#2b3640] pl-5">
                  {hackathon.prizes && hackathon.prizes.map((prize) => (
                    <div key={prize.id} className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">{prize.title} ({prize.winners} winners)</span>
                      <span className="text-white font-bold">{prize.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Content sections with styled separators */}
            <div className="space-y-10">
              {/* Why section */}
              <section className="mb-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white">Why {hackathon.title}?</h3>
                </div>
                <p className="mb-4 font-medium text-white">Saluting the Early Rebels—Redefining Data & Collaboration</p>
                <p className="text-white/80">{hackathon.title} was born from a simple but radical belief: true innovation shouldn't be strangled by black-box algorithms or centralized gatekeepers. In an era of platform monopolies and diluted creator value, {hackathon.organizer} is rallying builders to forge a transparent, platform-agnostic, and verifiable future for data governance and the creator economy.</p>
                <div className="border-b border-[#2b3640] my-10 w-full"></div>
              </section>

              {/* Challenge areas - 从奖项中提取相关挑战 */}
              <section className="mb-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white">Challenge Areas</h3>
                </div>
                <ul className="list-disc list-inside text-white/80 space-y-3 pl-4">
                  <li>Algorithm transparency and interpretability</li>
                  <li>Data sovereignty and privacy protection</li>
                  <li>Sustainable income in the AI era</li>
                  <li>Creator-first infrastructure and anti-platform design</li>
                  <li>Identity, reputation and governance frameworks</li>
                  <li>Decentralized storytelling and public discourse tools</li>
                  <li>Human-centered AI & Web3 interactions</li>
                </ul>
                <div className="border-b border-[#2b3640] my-10 w-full"></div>
              </section>

              {/* Key dates */}
              <section className="mb-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white">Important Dates</h3>
                </div>
                <div className="space-y-3 text-white/80">
                  <p><span className="font-medium text-white">Registration Opens:</span> {new Date(hackathon.registrationStart).toLocaleDateString()}</p>
                  <p><span className="font-medium text-white">Registration Closes:</span> {new Date(hackathon.registrationEnd).toLocaleDateString()}</p>
                  <p><span className="font-medium text-white">Hackathon Start:</span> {new Date(hackathon.hackathonStart).toLocaleDateString()}</p>
                  <p><span className="font-medium text-white">Project Submission Deadline:</span> {new Date(hackathon.hackathonEnd).toLocaleDateString()}</p>
                  <p><span className="font-medium text-white">Voting Period:</span> {new Date(hackathon.votingStart).toLocaleDateString()} - {new Date(hackathon.votingEnd).toLocaleDateString()}</p>
                </div>
                <div className="border-b border-[#2b3640] my-10 w-full"></div>
              </section>

              {/* How to participate */}
              <section className="mb-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white">How to Participate</h3>
                </div>
                <ol className="list-decimal list-inside text-white/80 space-y-3 pl-4">
                  <li>Register for the hackathon</li>
                  <li>Form a team (1-5 people) or participate individually</li>
                  <li>Attend online workshops and mentoring sessions</li>
                  <li>Develop your project</li>
                  <li>Submit your project before the deadline</li>
                </ol>
              </section>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex-shrink-0">
          <div className="sticky top-0">
            <HackathonSidebar hackathon={hackathon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;