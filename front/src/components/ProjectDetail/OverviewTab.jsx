import React from 'react';

const OverviewTab = ({ project }) => {
  // 确保如果project不存在或者没有传入，使用默认值
  const {
    name = 'Project Name',
    logo = null,
    shortDescription = 'No short description available',
    fullDescription = 'No full description available',
    progressDescription = 'No progress information available',
    fundraisingStatus = 'No fundraising status available',
    githubLink = '',
    techStack = [],
    sectors = [],
    hackathonDescription = '',
    participationRequirements = '',
    videoLink = '',
    teamLeader = ''
  } = project || {};

  return (
    <div className="pb-16">
      {/* Back button */}
      {/* <div className="mb-6">
        <button className="flex items-center gap-2 text-white/60 hover:text-white/80 text-sm">
          <svg width="18" height="18" viewBox="0 0 18 18" className="border border-[#949FA8] rounded p-0.5">
            <path d="M12.75 9L5.25 9" stroke="#949FA8" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12.75L5.25 9L9 5.25" stroke="#949FA8" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to ChainSpark Hackathon Projects
        </button>
      </div> */}

      {/* Project logo */}
      <div className="mb-8">
        {logo ? (
          <img src={logo} alt={name} className="w-24 h-24 rounded-lg object-cover" />
        ) : (
          <div className="w-24 h-24 rounded-lg bg-[#0F1011] flex items-center justify-center">
            <span className="text-white font-medium">Logo</span>
          </div>
        )}
      </div>


      {/* Content grid with sidebar */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 max-w-4xl">
          {/* Project Name */}
          <h1 className="text-[32px] font-semibold text-white mb-4 leading-none">{name}</h1>

          {/* Project description */}
          <p className="text-lg text-white mb-16 leading-8 max-w-[805px]">{fullDescription}</p>

          {/* Tech Stack and Sectors */}
          {/* <div className="mb-8">
            <h3 className="text-white/60 text-sm mb-4">Sector</h3>
            <div className="flex flex-wrap gap-2">
              {sectors.length > 0 ? (
                sectors.map((sector, index) => (
                  <div key={index} className="bg-[#2F2F2F] px-3 py-2 rounded text-white text-sm">
                    {sector}
                  </div>
                ))
              ) : (
                techStack.map((tech, index) => (
                  <div key={index} className="bg-[#2F2F2F] px-3 py-2 rounded text-white text-sm">
                    {tech}
                  </div>
                ))
              )} */}
              {/* Default tags if no sectors or tech stack */}
              {/* {sectors.length === 0 && techStack.length === 0 && (
                <>
                  <div className="bg-[#2F2F2F] px-3 py-2 rounded text-white text-sm">SocialFi</div>
                  <div className="bg-[#2F2F2F] px-3 py-2 rounded text-white text-sm">Infra</div>
                  <div className="bg-[#2F2F2F] px-3 py-2 rounded text-white text-sm">GameFi</div>
                  <div className="bg-[#2F2F2F] px-3 py-2 rounded text-white text-sm">NFT</div>
                  <div className="bg-[#2F2F2F] px-3 py-2 rounded text-white text-sm">AI</div>
                  <div className="bg-[#2F2F2F] px-3 py-2 rounded text-white text-sm">DeFi</div>
                </>
              )}
            </div>
          </div> */}

          {/* Video buttons */}
          <div className="flex gap-4 mb-4 mt-16">
            {videoLink ? (
              <a 
                href={videoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#0092FF] px-4 py-2 rounded-lg text-white font-semibold text-base hover:bg-[#0082e6] transition-colors inline-flex items-center gap-2"
              >
                Demo Video
                <svg width="14" height="14" viewBox="0 0 14 14" className="text-white">
                  <path d="M2.91699 7H11.0837" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 2.91675L11.0833 7.00008L7 11.0834" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </a>
            ) : (
              <button className="bg-[#0092FF] px-4 py-2 rounded-lg text-white font-semibold text-base opacity-50 cursor-not-allowed">
                Demo Video
              </button>
            )}
            {/* <button className="border border-[#2B3740] px-4 py-2 rounded-lg text-white font-semibold text-base">
              Pitch Video
            </button> */}
          </div>
          <div className="border-b border-[#2b3640] mb-8 w-full"></div>

          {/* Video player placeholder */}
          {/* <div className="bg-[#0F1011] rounded-lg mb-8 h-[477px] flex items-center justify-center relative">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <svg width="20" height="18" viewBox="0 0 20 18" className="ml-1">
                <polygon points="0,0 20,9 0,18" fill="#0F1011" />
              </svg>
            </div>
          </div> */}

          {/* Progress During Hackathon */}
          {progressDescription && (
            <section className="mb-10">
              <h3 className="text-lg font-semibold text-white mb-4">Progress During Hackathon</h3>
              <p className="text-white leading-8">{progressDescription}</p>
            </section>
          )}

          {/* Fundraising Status */}
          {fundraisingStatus && (
            <section className="mb-10">
              <h3 className="text-lg font-semibold text-white mb-4">Fundraising Status</h3>
              <p className="text-white leading-8">{fundraisingStatus}</p>
            </section>
          )}

          {/* Hackathon Description */}
          {hackathonDescription && (
            <section className="mb-10">
              <h3 className="text-lg font-semibold text-white mb-4">About the Hackathon</h3>
              <p className="text-white leading-8">{hackathonDescription}</p>
            </section>
          )}

          {/* Participation Requirements */}
          {participationRequirements && (
            <section className="mb-10">
              <h3 className="text-lg font-semibold text-white mb-4">Participation Requirements</h3>
              <p className="text-white leading-8">{participationRequirements}</p>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="border border-[#2B3740] rounded-lg p-6">
            {teamLeader && (
              <div className="border-b border-[#2B3740] pb-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60 text-sm">Team Leader</span>
                </div>
                <span className="text-white text-sm">{teamLeader}</span>
              </div>
            )}

            {githubLink && (
              <div className="border-b border-[#2B3740] pb-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60 text-sm">Github link</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0092FF] text-sm font-medium hover:underline"
                  >
                    github.com
                  </a>
                  <svg width="14" height="14" viewBox="0 0 14 14" className="text-[#0092FF]">
                    <path d="M2.91699 7H11.0837" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 2.91675L11.0833 7.00008L7 11.0834" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            )}

            <div className="text-white/60 text-sm mb-4">Sector</div>
            <div className="flex flex-wrap gap-2">
              {sectors.length > 0 ? (
                sectors.map((sector, index) => (
                  <div key={index} className="bg-[#2F2F2F] px-3 py-2 rounded text-white text-sm">
                    {sector}
                  </div>
                ))
              ) : (
                techStack.slice(0, 6).map((tech, index) => (
                  <div key={index} className="bg-[#2F2F2F] px-3 py-2 rounded text-white text-sm">
                    {tech}
                  </div>
                ))
              )}
              {/* Default tags if no sectors or tech stack */}
              {sectors.length === 0 && techStack.length === 0 && (
                <>
                  <div className="bg-[#2F2F2F] px-3 py-2 rounded text-white text-sm">SocialFi</div>
                  <div className="bg-[#2F2F2F] px-3 py-2 rounded text-white text-sm">Infra</div>
                  <div className="bg-[#2F2F2F] px-3 py-2 rounded text-white text-sm">GameFi</div>
                  <div className="bg-[#2F2F2F] px-3 py-2 rounded text-white text-sm">NFT</div>
                  <div className="bg-[#2F2F2F] px-3 py-2 rounded text-white text-sm">AI</div>
                  <div className="bg-[#2F2F2F] px-3 py-2 rounded text-white text-sm">DeFi</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;