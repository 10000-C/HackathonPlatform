import React from 'react';

const HackathonTab = ({ project }) => {
  return (
    <div className="pb-16">
      <h2 className="text-2xl font-semibold text-white mb-8">Hackathon Information</h2>
      
      <div className="text-white space-y-6">
        {project?.hackathonDescription && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About the Hackathon</h3>
            <p className="text-white/80 leading-8">{project.hackathonDescription}</p>
          </div>
        )}

        {project?.participationRequirements && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Participation Requirements</h3>
            <p className="text-white/80 leading-8">{project.participationRequirements}</p>
          </div>
        )}

        {project?.hackathonName && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Hackathon Name</h3>
            <p className="text-white/80 leading-8">{project.hackathonName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HackathonTab;