// components/JudgesStep.jsx
import React, { useState } from 'react';
import { Users, Link } from 'lucide-react';

const JudgesStep = ({ judges, setJudges }) => {
  const [inviteEmail, setInviteEmail] = useState('');

  const handleSendInvite = () => {
    if (inviteEmail.trim()) {
      const newJudge = {
        email: inviteEmail,
        status: 'Invite pending',
        type: 'pending'
      };
      setJudges(prev => [...prev, newJudge]);
      setInviteEmail('');
    }
  };

  const handleCopyLink = () => {
    const inviteLink = 'https://hackx.com/invite/aousdh...123fnf';
    navigator.clipboard.writeText(inviteLink)
      .then(() => console.log('Link copied to clipboard'))
      .catch(err => console.error('Failed to copy link:', err));
  };

  const handleJudgeStatusChange = (index, newStatus) => {
    setJudges(prev => prev.map((judge, i) => 
      i === index ? { ...judge, status: newStatus } : judge
    ));
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
                    <span className="text-white">{judge.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm ${judge.type === 'pending' ? 'text-gray-400' : 'text-white'}`}>
                      {judge.status}
                    </span>
                    {judge.type === 'confirmed' && (
                      <select 
                        className="bg-[#0f1011] text-white text-sm rounded px-2 py-1"
                        value={judge.status}
                        onChange={(e) => handleJudgeStatusChange(index, e.target.value)}
                      >
                        <option value="Judge">Judge</option>
                        <option value="Lead Judge">Lead Judge</option>
                        <option value="Technical Judge">Technical Judge</option>
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-80 ml-6 p-4 rounded">
          <h3 className="text-white font-medium mb-2">Invite to judge hackathon</h3>
          <p className="text-gray-400 text-sm mb-4">Invite judges via invite link or email</p>
          
          <div className="mb-4">
            <div className="flex items-center justify-between bg-[#0f1011] p-2 rounded">
              <div className="flex items-center space-x-2">
                <Link className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-xs">https://hackx.com/invite/aousdh...123fnf</span>
              </div>
              <button 
                className="text-blue-400 text-xs hover:text-blue-300"
                onClick={handleCopyLink}
              >
                Copy Link
              </button>
            </div>
          </div>

          <div className="text-center text-gray-400 text-sm mb-4">or</div>

          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter Email"
              className="flex-1 bg-[#0f1011] text-white p-2 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none text-sm"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendInvite()}
            />
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
              onClick={handleSendInvite}
            >
              Send Invite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgesStep;