"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import UserInfo from "@/components/UserInfo";
import ProfitPerHour from "@/components/ProfitPerHour";
import TappingArea from "@/components/TappingArea";
import Loading from "@/components/loading";
import DailyCombo from "@/components/DailyCombo";
import Balance from "@/components/Balance";
import CardTabs from "@/components/CardTabs";
import Performance from "@/components/Cards/Performance";
import Incentives from "@/components/Cards/Incentives";
import Usability from "@/components/Cards/Usability";
import Security from "@/components/Cards/Security";
import CommonTapArea from "@/components/CommonTapArea";
import Friends from "@/components/Friends";
import Earn from "@/components/Earn";
import Airdrop from "@/components/Airdrop";

type CardLevels = { [key: string]: number };

export default function Home() {
  const levelNames = [
    "Bronze", "Silver", "Gold", "Platinum", "Diamond",
    "Epic", "Legendary", "Master", "GrandMaster", "Lord"
  ];

  const levelMinPoints = [
    0, 5000, 25000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 50000000000
  ];

  const renderSharedComponents = () => (
    <>
      <UserInfo levelIndex={levelIndex} levelNames={levelNames} calculateProgress={calculateProgress} />
      <ProfitPerHour pointsPerHour={pointsPerHour} />
    </>
  );

  const [isLoading, setIsLoading] = useState(true);
  const [levelIndex, setLevelIndex] = useState(0);
  const [userPoints, setUserPoints] = useState(16000);
  const [pointsPerHour, setPointsPerHour] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [maxEnergy, setMaxEnergy] = useState(1000);
  const [activeTab, setActiveTab] = useState("exchange");
  const [cardTab, setCardTab] = useState("Performance");
  const [energyRegenRate, setEnergyRegenRate] = useState(3);
  const [energyRegenInterval, setEnergyRegenInterval] = useState(5000);
  const [tapCount, setTapCount] = useState(1);
  const [multitapLevel, setMultitapLevel] = useState(0);
  const [energyLimitLevel, setEnergyLimitLevel] = useState(0)
  const [cardLevels, setCardLevels] = useState<CardLevels>({
    "IT Team": 0,
    "Marketing": 0,
    "SEO": 0,
    "Support Team": 0,
    "Gold Rush Tube": 0,
    "Gold Rush Book": 0,
    "KYC": 0,
    "KYB": 0,
    "Legal opinion": 0,
    "SEC transparancy": 0,
    "Licence UAE": 0,
    "Licence Europe": 0,
    "Licence Asia": 0,
    "Anti money loundering": 0,
  });

  const increaseTapCount = () => {
    setTapCount((prevCount) => prevCount + 1);
    setMultitapLevel((prevLevel) => prevLevel + 1);
  };

  const increaseMaxEnergy = () => {
    setMaxEnergy((prevMax) => prevMax + 500);
    setEnergyLimitLevel((prevLevel) => prevLevel + 1);
  };

  const updateProfitPerHour = (amount: number): void => {
    setPointsPerHour((prev) => prev + amount);
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    const updateLevel = () => {
      const index = levelMinPoints.findIndex((points) => userPoints < points) - 1;
      setLevelIndex(index >= 0 ? index : levelMinPoints.length - 1);
    };
    updateLevel();
  }, [userPoints]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + energyRegenRate, maxEnergy));
    }, energyRegenInterval);
    return () => clearInterval(interval);
  }, [energyRegenRate, energyRegenInterval, maxEnergy]);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserPoints((prevPoints) => prevPoints + pointsPerHour);
    }, 3600000); // 3600000 milliseconds = 1 hour

    return () => clearInterval(interval);
  }, [pointsPerHour]);
  
  const calculateProgress = useCallback(() => {
    const prevMinPoints = levelMinPoints[levelIndex];
    const nextMinPoints = levelMinPoints[levelIndex + 1] || prevMinPoints;

    if (levelIndex >= levelNames.length - 1) {
      return 100;
    }

    const progress = ((userPoints - prevMinPoints) / (nextMinPoints - prevMinPoints)) * 100;

    return Math.min(Math.max(progress, 0), 100);
  }, [userPoints, levelIndex, levelMinPoints, levelNames.length]);

  const handleTapClick = () => {
    if (energy > 0) {
      setUserPoints((prevPoints) => prevPoints + tapCount); // Increase points by the tapCount value
      setEnergy((prevEnergy) => prevEnergy - 1);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="relative flex flex-col w-full h-full justify-center items-center bg-black text-white">
      {activeTab === 'exchange' && (
        <div className="flex flex-col gap-4 items-center justify-start h-screen pt-2 w-full">
          {renderSharedComponents()}
          <TappingArea
            userPoints={userPoints}
            setUserPoints={setUserPoints}
            tapCount={tapCount}
            energy={energy}
            maxEnergy={maxEnergy}
            // setMaxEnergy={setMaxEnergy}
            multitapLevel={multitapLevel}
            energyLimitLevel={energyLimitLevel}
            increaseTapCount={increaseTapCount}
            increaseMaxEnergy={increaseMaxEnergy}
            handleTapClick={handleTapClick}
          />
        </div>
      )}
      {activeTab === 'mine' && (
        <div className="flex flex-col gap-4 items-center justify-start h-full pt-2 w-full mb-24">
          {renderSharedComponents()}
          <DailyCombo />
          <Balance userPoints={userPoints} />
          <CardTabs cardTab={cardTab} setCardTab={setCardTab} />
          {cardTab === 'Performance' && (
            <Performance
              userPoints={userPoints}
              setUserPoints={setUserPoints}
              cardLevels={cardLevels}
              setCardLevels={setCardLevels}
              updateProfitPerHour={updateProfitPerHour}
            />
          )}
          {cardTab === 'Incentives' && (
            <Incentives
              userPoints={userPoints}
              setUserPoints={setUserPoints}
              cardLevels={cardLevels}
              setCardLevels={setCardLevels}
              updateProfitPerHour={updateProfitPerHour}
            />
          )}
          {cardTab === 'Usability' && (
            <Usability
              userPoints={userPoints}
              setUserPoints={setUserPoints}
              cardLevels={cardLevels}
              setCardLevels={setCardLevels}
              updateProfitPerHour={updateProfitPerHour}
            />
          )}
          {cardTab === 'Security' && (
            <Security
              userPoints={userPoints}
              setUserPoints={setUserPoints}
              cardLevels={cardLevels}
              setCardLevels={setCardLevels}
              updateProfitPerHour={updateProfitPerHour}
            />
          )}
          <CommonTapArea
          tapCount={tapCount}
            energy={energy}
            maxEnergy={maxEnergy}
            handleTapClick={handleTapClick}
          />
        </div>
      )}
      {activeTab === 'friends' && <Friends />}
      {activeTab === 'earn' && <Earn />}
      {activeTab === 'airdrop' && <Airdrop />}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
