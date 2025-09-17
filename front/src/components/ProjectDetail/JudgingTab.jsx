import React from 'react';

const JudgingTab = ({ project }) => {
  return (
    <div className="pb-16">
      <h2 className="text-2xl font-semibold text-white mb-8">Judging Information</h2>
      
      <div className="text-white space-y-6">
        <div className="bg-[#1f1f23] border border-[#2b3740] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Evaluation Criteria</h3>
          <ul className="space-y-2 text-white/80">
            <li>• Innovation and Creativity</li>
            <li>• Technical Implementation</li>
            <li>• User Experience</li>
            <li>• Business Value</li>
            <li>• Presentation Quality</li>
          </ul>
        </div>

        <div className="bg-[#1f1f23] border border-[#2b3740] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Submission Status</h3>
          <p className="text-white/80">Project submitted successfully and is under review.</p>
        </div>

        <div className="bg-[#1f1f23] border border-[#2b3740] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Judge Feedback</h3>
          <p className="text-white/80">Feedback will be available after the judging period ends.</p>
        </div>
      </div>
    </div>
  );
};

export default JudgingTab;