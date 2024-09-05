import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Calender from '../icons/Star 1.svg';
import Coin from '../images/Token.svg';

interface DailyRewardProps {
  userPoints: number;
  setUserPoints: (newPoints: number | ((prevPoints: number) => number)) => void;
  onClose: () => void;
  userToken: string; // Assuming you have a user token for authentication
}

const DailyRewardPopup: React.FC<DailyRewardProps> = ({
  onClose,
  userPoints,
  setUserPoints,
  userToken,
}) => {
  const [day, setDay] = useState(1);
  const [claimedToday, setClaimedToday] = useState(false);
  const [rewards, setRewards] = useState<{ day: number; amount: number }[]>([]);

  useEffect(() => {
    const fetchRewardsData = async () => {
      try {
        const response = await fetch('https://ggr-backend-production.up.railway.app/api/user/getTodaysDailyReward', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (response.ok) {
          // Update component state with data from the backend
          setRewards(data.data.rewards);
          setDay(data.data.currentDay);
          setClaimedToday(data.data.claimedToday);
        } else {
          console.error('Failed to fetch daily rewards:', data.message);
        }
      } catch (error) {
        console.error('Error fetching daily rewards:', error);
      }
    };

    fetchRewardsData();
  }, [userToken]);

  const handleRewardClick = async () => {
    if (claimedToday) return; // If already claimed today, do nothing

    try {
      const response = await fetch('https://ggr-backend-production.up.railway.app/api/user/claimDailyReward', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUserPoints((prevPoints) => prevPoints + data.rewardAmount);
        setClaimedToday(true);
        setDay(data.nextDay); // Update to next day as per server response
      } else {
        console.error('Failed to claim daily reward:', data.message);
      }
    } catch (error) {
      console.error('Error claiming daily reward:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-800 rounded-t-[46px] border-t-2 border-amber-600 top-glow p-6 w-96 relative">
        <div className="flex flex-col items-center mb-4">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full filter blur-lg bg-gradient-to-r from-purple-700 via-purple-900 to-purple-800"></div>
            <Image src={Calender} alt="Daily Reward" className="w-20 relative z-10 h-20" />
          </div>
          <h2 className="text-2xl font-semibold">Daily Reward</h2>
          <p className="text-sm text-center text-gray-400 mt-1">
            Accure coins for logging into the game daily without skipping
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {rewards.map((reward, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center p-2 rounded-lg text-sm gap-2 ${
                day === reward.day ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400'
              }`}
            >
              <p className="text-center">Day {reward.day}</p>
              <Image src={Coin} width={16} height={16} alt="Coin" />
              <span>{reward.amount}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <button
            className={`bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors ${
              claimedToday ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={handleRewardClick}
            disabled={claimedToday}
          >
            {claimedToday ? 'Come Back Tomorrow' : 'Collect Reward'}
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors ml-4"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyRewardPopup;
