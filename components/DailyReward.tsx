import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Calender from '../icons/Star 1.svg';
import Coin from '../images/Token.svg';

interface DailyRewardProps {
  userPoints: number;
  setUserPoints: (newPoints: number | ((prevPoints: number) => number)) => void;
  onClose: () => void;
  userToken: string; // Pass user token to authenticate API requests
}

const DailyRewardPopup: React.FC<DailyRewardProps> = ({
  onClose,
  userPoints,
  setUserPoints,
  userToken,
}) => {
  const [day, setDay] = useState(1);
  const [claimedToday, setClaimedToday] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [dailyRewards, setDailyRewards] = useState<{ day: number; amount: number }[]>([]);
  const [claimedDays, setClaimedDays] = useState<number[]>([]); // Track claimed days

  useEffect(() => {
    // Initialize rewards for all days
    const initialRewards = [
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

    const fetchDailyReward = async () => {
      try {
        const response = await fetch('https://ggr-backend-production.up.railway.app/api/user/getTodaysDailyReward', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
        });

        const data = await response.json();
        console.log('Fetched daily reward data:', data); // Debugging line

        if (response.ok) {
          setClaimedToday(data.data.claimedToday);
          setDay(data.data.currentDay);

          // Update daily rewards with fetched data
          if (data.data.rewards && Array.isArray(data.data.rewards)) {
            const fetchedRewards = data.data.rewards.reduce((acc: any, reward: any) => {
              acc[reward.rewardDay - 1] = { day: reward.rewardDay, amount: reward.amount };
              return acc;
            }, [...initialRewards]);

            setDailyRewards(fetchedRewards);
            console.log('Mapped rewards:', fetchedRewards); // Debugging line
          } else {
            console.error('Rewards data is not in the expected format:', data.data.rewards);
            setDailyRewards(initialRewards); // Fallback to initial rewards
          }

          // If the user has claimed today, mark the day as claimed
          if (data.data.claimedToday) {
            setClaimedDays((prev) => [...prev, data.data.currentDay]);
          }

        } else {
          console.error('Failed to fetch daily rewards:', data.message);
          setDailyRewards(initialRewards); // Fallback to initial rewards
        }
      } catch (error) {
        console.error('Error fetching daily rewards:', error);
        setDailyRewards(initialRewards); // Fallback to initial rewards
      }
    };

    fetchDailyReward();
  }, [userToken]);

  const handleRewardClick = async () => {
    if (claimedToday) return; // If already claimed today, do nothing

    try {
      const response = await fetch('https://ggr-backend-production.up.railway.app/api/user/claimDailyReward', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });

      const data = await response.json();
      console.log('Claim reward response:', data); // Debugging line

      if (response.ok) {
        // Update user points with the current day's reward amount
        const rewardForToday = dailyRewards.find(reward => reward.day === day);
        if (rewardForToday) {
          setUserPoints((prevPoints) => prevPoints + rewardForToday.amount);
        }
        setClaimedToday(true); // Mark as claimed for today
        setClaimedDays((prev) => [...prev, day]); // Add to claimed days
        setDay(data.data.nextDay); // Update to next reward day
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
            Accrue coins for logging into the game daily without skipping
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {dailyRewards.map((reward, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center p-2 rounded-lg text-sm gap-2 ${
                claimedDays.includes(reward.day) ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400'
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
