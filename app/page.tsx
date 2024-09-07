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
import BronzeSkim1 from "../images/Skins/Armadillo_1.svg";
import { StaticImageData } from "next/image";
import IconLevel1 from "../images/Achivment Levels/Blockchain Junior Developer.svg";
import IconLevel2 from "../images/Achivment Levels/Senior DeFi Coder.svg";
import IconLevel3 from "../images/Achivment Levels/Web3 Solutions Architect.svg";
import IconLevel4 from "../images/Achivment Levels/Crypto Tech Strategist.svg";
import IconLevel5 from "../images/Achivment Levels/Chief Blockchain Architect.svg";
import Redeem from "@/components/Redeem";
import WebApp from "@twa-dev/sdk";
import { motion } from "framer-motion";

type CardLevels = { [key: string]: number };

interface UserData {
  id?: string; // Match MongoDB ObjectId type if you use it; otherwise, use `string`
  telegramID?: string; // Include telegramID for completeness
  name?: string;
  uid?: string;
  email?: string;
  phoneNo?: string;
  image?: string;
  DOB?: Date;
  tier?: number;
  Amount?: number;
  energy: number;
  maxEnergy: number;
  energyLimitLevel: number;
  tapCount?: number;
  multiTapLevel?: number;
  lastClaimedRewardDate?: Date;
  currentRewardDay: number;
  referedID?: string; // MongoDB ObjectId is `string` in the JSON response
  createdAt?: Date;
  updatedAt?: Date;
  Token?: string;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.slice(1));

      const tgWebAppData = params.get("tgWebAppData");

      if (tgWebAppData) {
        const decodedData = decodeURIComponent(tgWebAppData);
        const userDataString = decodedData.split("user=")[1].split("&")[0];
        const userData = JSON.parse(decodeURIComponent(userDataString));

        const telegramID = userData.id;

        if (telegramID) {
          try {
            const response = await fetch(
              "https://ggr-backend-production.up.railway.app/api/user/login",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ telegramID }),
              }
            );

            const data = await response.json();
            if (response.ok) {
              setUserData({
                ...data.data, // Spread the rest of user data
                Token: data.Token, // Ensure the Token is set properly
              });
              setUserToken(data.Token);
              // Set the points from the fetched data
              setUserPoints(data.data.Amount || 0);
              setEnergy(data.data.energy);
              setMaxEnergy(data.data.maxEnergy);
              setMultitapLevel(data.data.multiTapLevel);
              setTapCount(data.data.tapCount);
              setEnergyLimitLevel(data.data.energyLimitLevel);
            } else {
              console.error("Failed to fetch user data:", data.message);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          } finally {
            setIsLoading(false);
          }
        } else {
          console.error("Telegram ID not found in URL fragment");
          setIsLoading(false);
        }
      } else {
        console.error("tgWebAppData not found in URL fragment");
        setIsLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      fetchUserData();
    }
  }, []);

  const userName = userData?.name || "Jones";
  const levelNames = [
    "Blockchain Junior Developer",
    "Senior DeFi Coder",
    "Web3 Solutions Architect",
    "Crypto Tech Strategist",
    "Chief Blockchain Architect",
  ];

  const levelMinPoints = [0, 60000, 120000, 420000, 780000];

  const levelIcons: StaticImageData[] = [
    IconLevel1,
    IconLevel2,
    IconLevel3,
    IconLevel4,
    IconLevel5,
  ];

  const renderSharedComponents = () => (
    <>
      <UserInfo
        GalacticGoldRush={GalacticGoldRush}
        setGalacticGoldRush={setGalacticGoldRush}
        userToken={userToken}
        levelIndex={levelIndex}
        levelIcons={levelIcons}
        userPoints={userPoints}
        setUserPoints={setUserPoints}
        userName={userName}
        levelNames={levelNames}
        calculateProgress={calculateProgress}
      />
      <Redeem
        userPoints={userPoints}
        setUserPoints={setUserPoints}
        userToken={userToken}
      />
      <ProfitPerHour pointsPerHour={pointsPerHour} />
    </>
  );
  const [userToken, setUserToken] = useState("");
  const [levelIndex, setLevelIndex] = useState(0);
  const [levelIcon, setLevelIcon] = useState<StaticImageData>(levelIcons[0]);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [GalacticGoldRush, setGalacticGoldRush] =
    useState<StaticImageData>(BronzeSkim1);
  const [pointsPerHour, setPointsPerHour] = useState(0);
  const [energy, setEnergy] = useState<number>(1000);
  const [maxEnergy, setMaxEnergy] = useState<number>(1000);
  const [activeTab, setActiveTab] = useState("protocol lab");
  const [cardTab, setCardTab] = useState("Performance");
  const [energyRegenRate, setEnergyRegenRate] = useState(3);
  const [energyRegenInterval, setEnergyRegenInterval] = useState(5000);
  const [tapCount, setTapCount] = useState<number>(1);
  const [multitapLevel, setMultitapLevel] = useState(0);
  const [energyLimitLevel, setEnergyLimitLevel] = useState(0);
  const [cardLevels, setCardLevels] = useState<CardLevels>({
    "Consensus Algorithms": 0,
    "Network Design": 0,
    "Data Structures": 0,
    "Shard Technology": 0,
    "Scalability Solutions": 0,
    "Fault Tolerance": 0,
    "Security Protocols": 0,
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
    "Blockchain Forensics": 0,
    "Reward Multiplier": 0,
  });
  // const [heightDynamic, setHeightDynamic] = useState(0); // Default padding
  // const [stillLoading, setStillLoading] = useState(true);
  // useEffect(() => {
  //   console.log(window.innerHeight, "checking something", heightDynamic);
  //   const updatePadding = () => {
  //     const calculatedHeight = window.innerHeight + 200;
  //     console.log(calculatedHeight, "checking calculated height");
  //     setHeightDynamic(calculatedHeight);
  //   };

  //   let i = 0;
  //   if (window.innerHeight + 200 !== heightDynamic) {
  //     console.log(i++, "checking of i", heightDynamic);
  //     // updatePadding();
  //     const calculatedHeight = window.innerHeight + 200;
  //     console.log(calculatedHeight, "checking calculated height");
  //     setHeightDynamic(calculatedHeight);
  //   }
  //   window.addEventListener("resize", updatePadding);
  //   return () => window.removeEventListener("resize", updatePadding);
  // }, [heightDynamic, stillLoading]);

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
      const index =
        levelMinPoints.findIndex((points) => userPoints < points) - 1;
      setLevelIndex(index >= 0 ? index : levelMinPoints.length - 1);
    };
    updateLevel();
  }, [userPoints]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) =>
        Math.min(prevEnergy + energyRegenRate, maxEnergy)
      );
    }, energyRegenInterval);
    return () => clearInterval(interval);
  }, [energyRegenRate, energyRegenInterval, maxEnergy]);

  useEffect(() => {
    const syncEnergyToBackend = async () => {
      if (userData) {
        try {
          const response = await fetch(
            "https://ggr-backend-production.up.railway.app/api/user/updateUser",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userData?.Token}`,
              },
              body: JSON.stringify({
                energy: energy,
              }),
            }
          );

          if (!response.ok) {
            console.error(
              "Failed to sync energy to backend:",
              await response.json()
            );
          }
        } catch (error) {
          console.error("Error syncing energy to backend:", error);
        }
      }
    };

    const syncInterval = setInterval(syncEnergyToBackend, energyRegenInterval);

    return () => clearInterval(syncInterval);
  }, [energy, userData, energyRegenInterval]);

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

    const progress =
      ((userPoints - prevMinPoints) / (nextMinPoints - prevMinPoints)) * 100;

    return Math.min(Math.max(progress, 0), 100);
  }, [userPoints, levelIndex, levelMinPoints, levelNames.length]);

  const handleTapClick = async () => {
    if (energy > 0) {
      const newPoints = userPoints + tapCount; // Calculate new points
      setUserPoints(newPoints); // Update local state optimistically
      const newEnergy = energy - 1;
      setEnergy(newEnergy);

      try {
        const response = await fetch(
          "https://ggr-backend-production.up.railway.app/api/user/updateUser",
          {
            method: "POST", // Use POST or PUT for updates
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userData?.Token}`, // Pass the token for authorization
            },
            body: JSON.stringify({
              Amount: newPoints, // Send new points to update
              energy: newEnergy,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error(
            "Failed to update user points and energy:",
            errorData.message
          );

          // Optionally, revert points on error
          setUserPoints((prevPoints) => prevPoints - tapCount);
          setEnergy((prevEnergy) => prevEnergy + 1);
        }
      } catch (error) {
        console.error("Error updating user points and energy:", error);

        // Optionally, revert points on error
        setUserPoints((prevPoints) => prevPoints - tapCount);
        setEnergy((prevEnergy) => prevEnergy + 1);
      }
    }
  };

  if (isLoading) return <Loading />;

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <div
      className={`relative flex flex-col w-full  justify-center items-center bg-black text-white pb-32`}
    >
      {activeTab === "protocol lab" && (
        <div className="flex flex-col gap-4 items-center justify-start pt-3 pb-36 w-full h-screen">
          {renderSharedComponents()}
          <TappingArea
            GalacticGoldRush={GalacticGoldRush}
            userPoints={userPoints}
            setUserPoints={setUserPoints}
            tapCount={tapCount}
            energy={energy}
            maxEnergy={maxEnergy}
            multitapLevel={multitapLevel}
            energyLimitLevel={energyLimitLevel}
            increaseTapCount={increaseTapCount}
            increaseMaxEnergy={increaseMaxEnergy}
            handleTapClick={handleTapClick}
            setActiveTab={setActiveTab}
            userToken={userToken}
          />
        </div>
      )}
      {activeTab === "mine" && (
        <motion.div animate={{ x: [0, 40, 0] }} variants={variants}>
          <div className="flex flex-col gap-4 items-center justify-start h-full pt-2 w-full mb-24">
            {renderSharedComponents()}
            <DailyCombo
              userPoints={userPoints}
              setUserPoints={setUserPoints}
              cardLevels={cardLevels}
              setCardLevels={setCardLevels}
            />
            <CardTabs cardTab={cardTab} setCardTab={setCardTab} />
            {cardTab === "Performance" && (
              <Performance
                userPoints={userPoints}
                setUserPoints={setUserPoints}
                cardLevels={cardLevels}
                setCardLevels={setCardLevels}
                updateProfitPerHour={updateProfitPerHour}
              />
            )}
            {cardTab === "Incentives" && (
              <Incentives
                userPoints={userPoints}
                setUserPoints={setUserPoints}
                cardLevels={cardLevels}
                setCardLevels={setCardLevels}
                updateProfitPerHour={updateProfitPerHour}
              />
            )}
            {cardTab === "Usability" && (
              <Usability
                userPoints={userPoints}
                setUserPoints={setUserPoints}
                cardLevels={cardLevels}
                setCardLevels={setCardLevels}
                updateProfitPerHour={updateProfitPerHour}
              />
            )}
            {cardTab === "Security" && (
              <Security
                userPoints={userPoints}
                setUserPoints={setUserPoints}
                cardLevels={cardLevels}
                setCardLevels={setCardLevels}
                updateProfitPerHour={updateProfitPerHour}
              />
            )}
            <motion.div animate={{ y: [0, 20, 0] }} variants={variants}>
              <Balance userPoints={userPoints} />
              <CommonTapArea
                GalacticGoldRush={GalacticGoldRush}
                tapCount={tapCount}
                energy={energy}
                maxEnergy={maxEnergy}
                handleTapClick={handleTapClick}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
      {activeTab === "friends" && (
        <motion.div animate={{ x: [0, 20, 0] }} variants={variants}>
          <Friends />
        </motion.div>
      )}
      {activeTab === "earn" && (
        <div className="mb-20">
          <motion.div animate={{ x: [0, 20, 0] }} variants={variants}>
            <Earn userPoints={userPoints} setUserPoints={setUserPoints} />
          </motion.div>
        </div>
      )}
      {activeTab === "airdrop" && (
        <motion.div animate={{ x: [0, 20, 0] }} variants={variants}>
          <Airdrop />
        </motion.div>
      )}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
