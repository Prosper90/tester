'use client';

import React, { useState } from 'react';

interface RedeemProps {
  userPoints: number;
  setUserPoints: (newPoints: number | ((prevPoints: number) => number)) => void;
  userToken: string; // Pass userToken from the parent component
}

export default function Redeem({ userPoints, setUserPoints, userToken }: RedeemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');

  const handleRedeemClick = () => {
    setIsModalOpen(true);
    setError('');
  };

  const handleCodeSubmit = async () => {
    try {
      const response = await fetch('https://ggr-backend-production.up.railway.app/api/user/redeemCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({ code: inputCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserPoints(prevPoints => prevPoints + data.points); // Update points
        setInputCode('');
        setIsModalOpen(false);
      } else {
        setError(data.message); // Show error message from the backend
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
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
