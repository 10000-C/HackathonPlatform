import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

const JudgesStep = ({ judges, setJudges, activityId }) => {
  const [inviteEmail, setInviteEmail] = useState('');

  // 在组件开始时验证 activityId
  useEffect(() => {
    if (!activityId) {
      alert("Pleadse publish the activity first");
    }
  }, [activityId]);

  const handleGenerateInviteCode = () => {
    if (inviteEmail.trim()) {
      const mockInviteCode = 'JUDGE-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const newJudge = {
        email: inviteEmail,
        status: 'Code generated',
        type: 'pending',
        inviteCode: mockInviteCode
      };
      setJudges(prev => [...prev, newJudge]);
      setInviteEmail('');
    }
  };

  return (
    <div className="p-6">
      <div className="flex">
        <div className="flex-1">
          {judges.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Users className="text-gray-500 w-16 h-16 mb-4" />
              <p className="text-gray-400">No judges invited yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {judges.map((judge, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white">{judge.email}</span>
                      {judge.inviteCode && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-400">Invite Code: {judge.inviteCode}</span>
                          <button
                            className="text-blue-400 text-xs hover:text-blue-300"
                            onClick={() => navigator.clipboard.writeText(judge.inviteCode)}
                          >
                            Copy
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-400">{judge.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-80 ml-6 p-4 rounded">
          <h3 className="text-white font-medium mb-2">Invite Judges</h3>
          <p className="text-gray-400 text-sm mb-4">Enter judge's email to generate invite code</p>
          
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter judge's email"
              className="flex-1 bg-[#0f1011] text-white p-2 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none text-sm"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerateInviteCode()}
            />
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
              onClick={handleGenerateInviteCode}
            >
              Generate Code
            </button>
          </div>
          <p className="text-gray-400 text-xs mt-2">After generating the code, send it to the judge</p>
        </div>
      </div>
    </div>
  );
};

export default JudgesStep;