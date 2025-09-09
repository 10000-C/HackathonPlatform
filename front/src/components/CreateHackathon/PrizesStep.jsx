import React from 'react';
import { useState } from 'react';

export default function PrizesStep({ formData, updateFormData }) {
  const [prizeData, setPrizeData] = useState({
    name: '',
    numberOfWinners: '',
    prizeAmount: '',
    description: '',
    evaluationCriteria: {
      name: '',
      points: '',
      description: ''
    },
    judgingMode: 'Judges Only'
  });

  const ShowPrizeDetails = formData.showPrizeDetails || false;

  const handleInputChange = (field, value) => {
    setPrizeData(prev => ({ ...prev, [field]: value }));
  };

  const handleEvaluationCriteriaChange = (field, value) => {
    setPrizeData(prev => ({
      ...prev,
      evaluationCriteria: { ...prev.evaluationCriteria, [field]: value }
    }));
  };

  const handleShowDetails = () => {
    updateFormData({ showPrizeDetails: !ShowPrizeDetails });
  };

  const handleAddPrizeCohort = () => {
    // 添加新的奖项组逻辑
    console.log('Adding new prize cohort');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <label className="block text-white mb-2">Enter Prize Cohort Name</label>
        <input
          type="text"
          placeholder="Enter Prize Cohort Name"
          className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
          value={prizeData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
        <button 
          className="text-blue-400 hover:text-blue-300 flex items-center mt-2"
          onClick={handleShowDetails}
        >
          <span className="mr-1">{ShowPrizeDetails ? '◢' : '▷'}</span> details
        </button>
      </div>

      {/* 显示详细信息 */}
      {ShowPrizeDetails && (
        <div className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Number of winners</label>
              <select
                className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                value={prizeData.numberOfWinners}
                onChange={(e) => handleInputChange('numberOfWinners', e.target.value)}
              >
                <option value="">Number of winners</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div>
              <label className="block text-white mb-2">Prize amount for each winner</label>
              <input
                type="text"
                placeholder="USD/tokens per winner"
                className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                value={prizeData.prizeAmount}
                onChange={(e) => handleInputChange('prizeAmount', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">Prize cohort description</label>
            <textarea
              placeholder="Prize cohort description"
              className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none h-32"
              value={prizeData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Evaluation criteria name</label>
              <input
                type="text"
                placeholder="Enter evaluation criteria name"
                className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                value={prizeData.evaluationCriteria.name}
                onChange={(e) => handleEvaluationCriteriaChange('name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-white mb-2">Number of points</label>
              <input
                type="text"
                placeholder="Enter evaluation criteria name"
                className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                value={prizeData.evaluationCriteria.points}
                onChange={(e) => handleEvaluationCriteriaChange('points', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">Evaluation criteria description</label>
            <textarea
              placeholder="Enter evaluation criteria description"
              className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none h-24"
              value={prizeData.evaluationCriteria.description}
              onChange={(e) => handleEvaluationCriteriaChange('description', e.target.value)}
            />
          </div>

          <button
            className="text-blue-400 hover:text-blue-300 text-sm"
            onClick={() => alert('Add evaluation criteria')}
          >
            + add evaluation criteria
          </button>

          <div>
            <label className="block text-white mb-2">Judging mode</label>
            <div className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425]">
              Judges Only
            </div>
          </div>
        </div>
      )}

      <button 
        className="text-blue-400 hover:text-blue-300 text-sm mt-4"
        onClick={handleAddPrizeCohort}
      >
        + add another prize cohort
      </button>
    </div>
  );
}