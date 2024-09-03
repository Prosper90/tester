import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Calender from '../icons/Star 1.svg';
import Coin from '../images/Token.svg';

interface DailyRewardProps {
  userPoints: number;
  setUserPoints: (newPoints: number | ((prevPoints: number) => number)) => void;
  onClose: () => void;
}

const DailyRewardPopup: React.FC<DailyRewardProps> = ({
  onClose,
  userPoints,
  setUserPoints,
}) => {
  const [day, setDay] = useState(1);
  const [claimedToday, setClaimedToday] = useState(false);

  useEffect(() => {
    const storedDay = localStorage.getItem('currentDay');
    const lastCollectedDate = localStorage.getItem('lastCollectedDate');
    const today = new Date().toDateString();

    if (lastCollectedDate === today) {
      // User has already claimed today's reward
      setClaimedToday(true);
    }

    if (storedDay && lastCollectedDate) {
      const lastDate = new Date(lastCollectedDate);
      const currentDate = new Date(today);
      const dayDifference = Math.floor(
        (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (dayDifference === 1) {
        // User checked in yesterday; continue to the next day
        setDay(parseInt(storedDay, 10));
      } else if (dayDifference > 1) {
        // User missed a day; reset to day 1
        setDay(1);
        localStorage.setItem('currentDay', '1');
      }
    } else {
      // No stored data, initialize day 1
      setDay(1);
      localStorage.setItem('currentDay', '1');
    }
  }, []);

  const rewards = [
    { day: 1, amount: 500 },
    { day: 2, amount: 1000 },
    { day: 3, amount: 2500 },
    { day: 4, amount: 5000 },
    { day: 5, amount: 15000 },
    { day: 6, amount: 25000 },
    { day: 7, amount: 100000 },
    { day: 8, amount: 500000 },
    { day: 9, amount: 1000000 },
    { day: 10, amount: 5000000 },
  ];

  const handleRewardClick = () => {
    if (claimedToday) return; // If already claimed today, do nothing

    const currentReward = rewards.find((reward) => reward.day === day);
    if (currentReward) {
      // Update user points with the current day's reward amount
      setUserPoints((prevPoints) => prevPoints + currentReward.amount);

      // Mark as claimed for today
      setClaimedToday(true);
      localStorage.setItem('lastCollectedDate', new Date().toDateString());

      // Increment the day and save it to local storage
      const nextDay = day + 1 > rewards.length ? 1 : day + 1; // Reset to day 1 after day 10
      setDay(nextDay);
      localStorage.setItem('currentDay', nextDay.toString());
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
            Accrue coins for logging into the game daily without skipping
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
