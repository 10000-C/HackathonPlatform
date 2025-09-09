import React from 'react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function PrizesStep({ formData, updateFormData }) {
  const [prizeCohorts, setPrizeCohorts] = useState([{
    id: 1,
    name: '',
    numberOfWinners: '',
    prizeAmount: '',
    description: '',
    evaluationCriteria: [{
      name: '',
      points: '',
      description: ''
    }],
    judgingMode: 'Judges Only',
    showDetails: false
  }]);

  const ShowPrizeDetails = formData.showPrizeDetails || false;

  const handleInputChange = (cohortIndex, field, value) => {
    setPrizeCohorts(prev => {
      const newCohorts = [...prev];
      newCohorts[cohortIndex] = { ...newCohorts[cohortIndex], [field]: value };
      updateFormData({ prizeCohorts: newCohorts });
      return newCohorts;
    });
  };

  const handleEvaluationCriteriaChange = (cohortIndex, criteriaIndex, field, value) => {
    setPrizeCohorts(prev => {
      const newCohorts = [...prev];
      const newCriteria = [...newCohorts[cohortIndex].evaluationCriteria];
      newCriteria[criteriaIndex] = { ...newCriteria[criteriaIndex], [field]: value };
      newCohorts[cohortIndex] = { ...newCohorts[cohortIndex], evaluationCriteria: newCriteria };
      updateFormData({ prizeCohorts: newCohorts });
      return newCohorts;
    });
  };

  const handleAddEvaluationCriteria = (cohortIndex) => {
    const newCohorts = [...prizeCohorts];
    newCohorts[cohortIndex].evaluationCriteria.push({
      name: '',
      points: '',
      description: ''
    });
    setPrizeCohorts(newCohorts);
    updateFormData({ prizeCohorts: newCohorts });
  };

  const handleAddPrizeCohort = () => {
    setPrizeCohorts(prev => {
      const newCohorts = [...prev, {
        id: prev.length + 1,
        name: '',
        numberOfWinners: '',
        prizeAmount: '',
        description: '',
        evaluationCriteria: [{
          name: '',
          points: '',
          description: ''
        }],
        judgingMode: 'Judges Only',
        showDetails: false
      }];
      updateFormData({ prizeCohorts: newCohorts });
      return newCohorts;
    });
  };

  const toggleShowDetails = (cohortIndex) => {
    setPrizeCohorts(prev => {
      const newCohorts = [...prev];
      newCohorts[cohortIndex] = { 
        ...newCohorts[cohortIndex], 
        showDetails: !newCohorts[cohortIndex].showDetails 
      };
      return newCohorts;
    });
  };

  const handleDeleteCohort = (cohortIndex) => {
    setPrizeCohorts(prev => {
      // 如果只剩一个cohort，不允许删除
      if (prev.length <= 1) {
        return prev;
      }
      const newCohorts = prev.filter((_, index) => index !== cohortIndex);
      updateFormData({ prizeCohorts: newCohorts });
      return newCohorts;
    });
  };

  return (
    <div className="p-6">
      {prizeCohorts.map((cohort, cohortIndex) => (
        <div key={cohort.id} className="mb-8 p-4 border border-[#242425] rounded">
          <div className="border-b border-gray-700 pb-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 pr-4">
                <label className="block text-white mb-2">Enter Prize Cohort Name</label>
                <input
                  type="text"
                  placeholder="Enter Prize Cohort Name"
                  className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                  value={cohort.name}
                  onChange={(e) => handleInputChange(cohortIndex, 'name', e.target.value)}
                />
              </div>
              {prizeCohorts.length > 1 && (
                <button 
                  onClick={() => handleDeleteCohort(cohortIndex)}
                  className="text-red-400 hover:text-red-300 mt-8"
                >
                  Delete
                </button>
              )}
            </div>
            <button 
              className="text-blue-400 hover:text-blue-300 flex items-center"
              onClick={() => toggleShowDetails(cohortIndex)}
            >
              <ChevronDown className={`mr-1 transform ${cohort.showDetails ? 'rotate-180' : ''} transition-transform duration-200`} />
              details
            </button>
          </div>

          {/* 显示详细信息 */}
          {cohort.showDetails && (
        <div className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Number of winners</label>
              <select
                className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                value={cohort.numberOfWinners}
                onChange={(e) => handleInputChange(cohortIndex, 'numberOfWinners', e.target.value)}
              >
                <option value="">Number of winners</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div>
              <label className="block text-white mb-2">Prize amount for each winner</label>
              <input
                type="text"
                placeholder="USD/tokens per winner"
                className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                value={cohort.prizeAmount}
                onChange={(e) => handleInputChange(cohortIndex, 'prizeAmount', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">Prize cohort description</label>
            <textarea
              placeholder="Prize cohort description"
              className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none h-32"
              value={cohort.description}
              onChange={(e) => handleInputChange(cohortIndex, 'description', e.target.value)}
            />
          </div>

          {cohort.evaluationCriteria.map((criteria, criteriaIndex) => (
            <div key={criteriaIndex} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Evaluation criteria name</label>
                  <input
                    type="text"
                    placeholder="Enter evaluation criteria name"
                    className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                    value={criteria.name}
                    onChange={(e) => handleEvaluationCriteriaChange(cohortIndex, criteriaIndex, 'name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Number of points</label>
                  <input
                    type="text"
                    placeholder="Enter evaluation criteria points"
                    className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                    value={criteria.points}
                    onChange={(e) => handleEvaluationCriteriaChange(cohortIndex, criteriaIndex, 'points', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2">Evaluation criteria description</label>
                <textarea
                  placeholder="Enter evaluation criteria description"
                  className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none h-24"
                  value={criteria.description}
                  onChange={(e) => handleEvaluationCriteriaChange(cohortIndex, criteriaIndex, 'description', e.target.value)}
                />
              </div>
              {criteriaIndex > 0 && (
                <button
                  className="text-red-400 hover:text-red-300 text-sm"
                  onClick={() => {
                    const newCohorts = [...prizeCohorts];
                    newCohorts[cohortIndex].evaluationCriteria = cohort.evaluationCriteria.filter((_, i) => i !== criteriaIndex);
                    setPrizeCohorts(newCohorts);
                    updateFormData({ prizeCohorts: newCohorts });
                  }}
                >
                  Remove this criteria
                </button>
              )}
              <hr className="border-[#242425] my-4" />
            </div>
          ))}

          <button
            className="text-blue-400 hover:text-blue-300 text-sm"
            onClick={() => handleAddEvaluationCriteria(cohortIndex)}
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
      </div>
    ))}

    <button 
      className="text-blue-400 hover:text-blue-300 text-sm mt-4"
      onClick={handleAddPrizeCohort}
    >
      + add another prize cohort
    </button>
  </div>
  );
}