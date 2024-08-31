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
import BronzeSkim1 from "../images/Armadillo_2.svg"
import { StaticImageData } from "next/image"
import IconLevel1 from "../images/Achivment Levels/Blockchain Junior Developer.svg"
import IconLevel2 from "../images/Achivment Levels/Senior DeFi Coder.svg"
import IconLevel3 from '../images/Achivment Levels/Web3 Solutions Architect.svg'
import IconLevel4 from '../images/Achivment Levels/Crypto Tech Strategist.svg'
import IconLevel5 from '../images/Achivment Levels/Chief Blockchain Architect.svg'

type CardLevels = { [key: string]: number };


export default function Home() {
  const userName = "Jones";
  const levelNames = [
    "Blockchain Junior Developer", "Senior DeFi Coder", "Web3 Solutions Architect", "Crypto Tech Strategist", "Chief Blockchain Architect"
  ];

  const levelMinPoints = [
    0, 60000, 120000, 420000, 780000
  ];

  // Ensure the levelIcons array is typed as StaticImageData[]
  const levelIcons: StaticImageData[] = [
    IconLevel1,
    IconLevel2,
    IconLevel3,
    IconLevel4,
    IconLevel5
  ];

  const renderSharedComponents = () => (
    <>
      <UserInfo GalacticGoldRush={GalacticGoldRush} setGalacticGoldRush={setGalacticGoldRush} levelIndex={levelIndex} levelIcons={levelIcons} userPoints={userPoints} setUserPoints={setUserPoints} userName={userName} levelNames={levelNames} calculateProgress={calculateProgress} />
      <ProfitPerHour pointsPerHour={pointsPerHour} />
    </>
  );

  const [isLoading, setIsLoading] = useState(true);
  const [levelIndex, setLevelIndex] = useState(0);
  const [levelIcon, setLevelIcon]= useState<StaticImageData>(levelIcons[0]); 
  const [userPoints, setUserPoints] = useState(6000000);
  const [GalacticGoldRush, setGalacticGoldRush] = useState<StaticImageData>(BronzeSkim1);
  const [pointsPerHour, setPointsPerHour] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [maxEnergy, setMaxEnergy] = useState(1000);
  const [activeTab, setActiveTab] = useState("protocol lab");
  const [cardTab, setCardTab] = useState("Performance");
  const [energyRegenRate, setEnergyRegenRate] = useState(3);
  const [energyRegenInterval, setEnergyRegenInterval] = useState(5000);
  const [tapCount, setTapCount] = useState(1);
  const [multitapLevel, setMultitapLevel] = useState(0);
  const [energyLimitLevel, setEnergyLimitLevel] = useState(0)
  const [cardLevels, setCardLevels] = useState<CardLevels>({
    "Consensus Algorithms": 0,
    "Network Design": 0,
    "Data Structures": 0,
    "Shard Technology": 0,
    "Scalability Solutions": 0,
    "Fault Tolerance": 0,
    "Security Protocols": 0,
    "Privacy Features": 0,
    "Cross-Chain Interop": 0,
    "Energy Efficiency": 0,
    "Latency Reduction": 0,
    "Hybrid Networks": 0,
    "Performance Optimization": 0,
    "Node Infrastructure": 0,
    "Elastic Network": 0,
    "Token Economy": 0,
    "Governance Models": 0,
    "Incentive Programs": 0,
    "Staking Rewards": 0,
    "Bonding Mechanisms": 0,
    "DeFi Protocols": 0,
    "Dynamic Rewards": 0,
    "Community Building": 0,
    "Active Participation": 0,
    "User Interface": 0,
    "Wallet Solutions": 0,
    "Onboarding Guides": 0,
    "Accessibility Options": 0,
    "User Experience": 0,
    "Game Elements": 0,
    "Personalized Content": 0,
    "Data Analytics": 0,
    "User Engagement": 0,
    "Decentralized Apps": 0,
    "Threat Detection": 0,
    "Security Audits": 0,
    "Incident Response": 0,
    "Regulatory Compliance": 0,
    "Insurance Protections": 0,
    "Zero-Trust Security": 0,
    "Decentralized Protection": 0,
    "Adaptive Authentication": 0,
    "Network Monitoring": 0,
    "Identity Management": 0,
    "Data Security": 0,
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

  useEffect(() => {
    // Update levelIcon based on the current levelIndex
    setLevelIcon(levelIcons[levelIndex]);
  }, [levelIndex, levelIcons]);

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
      {activeTab === 'protocol lab' && (
        <div className="flex flex-col gap-4 mb-10 items-center justify-start h-screen pt-2 w-full">
          {renderSharedComponents()}
          <TappingArea
            GalacticGoldRush={GalacticGoldRush}
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
            setActiveTab={setActiveTab}
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
            GalacticGoldRush={GalacticGoldRush}
            tapCount={tapCount}
            energy={energy}
            maxEnergy={maxEnergy}
            handleTapClick={handleTapClick}
          />
        </div>
      )}
      {activeTab === 'friends' && <Friends />}
      {activeTab === 'earn' &&
        <div className="mb-20">
          <Earn />
        </div>}
      {activeTab === 'airdrop' && <Airdrop />}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
