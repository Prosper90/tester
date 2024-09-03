'use client';

import React, { useState } from 'react';

interface RedeemProps {
  userPoints: number;
  setUserPoints: (newPoints: number | ((prevPoints: number) => number)) => void;
}

export default function Redeem({ userPoints, setUserPoints }: RedeemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');

  const validCodes = new Set([
    'AXJ8KL', 'ZQR5TH', 'LPM3VN', 'QW7JXC', 'TY2HNB', 'UIO9ER',
    'PLM6JK', 'GHT4WF', 'BVC1QP', 'MNB7UY', 'KJH2ZX', 'REW8VS',
    'ASX9PL', 'CVB3AQ', 'MKI5OF', 'POI6JL', 'NHY2RT', 'YUJ8IE',
    'OLP4DS', 'QAZ7XC', 'WSX5DC', 'EDC9RF', 'RFV3TG', 'TGB2HU',
    'YHN8JI', 'IKL5MO', 'MLK9UP', 'OPP2QB', 'QWE6RT', 'ZXC8IU'
  ]);

  const handleRedeemClick = () => {
    setIsModalOpen(true);
    setError('');
  };

  const handleCodeSubmit = () => {
    if (validCodes.has(inputCode.toUpperCase())) {
      setUserPoints(prevPoints => prevPoints + 3000);
      setInputCode('');
      setIsModalOpen(false);
    } else {
      setError('Invalid code. Please try again.');
    }
  };

  return (
    <div className='w-full flex items-end justify-end mr-10'>
      <button
        className="bg-gradient-to-r from-indigo-600 to-purple-500 p-1 rounded"
        onClick={handleRedeemClick}
      >
        Redeem
      </button>

      {isModalOpen && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-neutral-800 rounded-t-[46px] border-t-2 border-amber-600 w-64 top-glow p-6 shadow-lg">
            
            <h2 className="text-lg text-center font-bold mb-4">Enter Your Redeem Code</h2>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="border text-black p-2 mb-4 w-full"
              placeholder="Enter code here"
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className='flex gap-1 items-center justify-center'>
            <button
              className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white p-2 rounded mr-2"
              onClick={handleCodeSubmit}
            >
              Submit
            </button>
            <button
              className="bg-gray-300 text-black p-2 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
