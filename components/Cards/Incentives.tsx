"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Coin from "../../images/Token.svg";
import Icon1 from "../../images/Mining Icons/Incentives/Token Economy.svg";
import Icon2 from "../../images/Mining Icons/Incentives/Governance Models.svg";
import Icon3 from "../../images/Mining Icons/Incentives/Incentive Programs.svg";
import Icon4 from "../../images/Mining Icons/Incentives/Staking Rewards.svg";
import Icon5 from "../../images/Mining Icons/Incentives/Bonding Mechanisms.svg";
import Icon6 from "../../images/Mining Icons/Incentives/DeFi Protocols.svg";
import Icon7 from "../../images/Mining Icons/Incentives/Dynamic Rewards.svg";
import Icon8 from "../../images/Mining Icons/Incentives/Community Building.svg";
import Icon9 from "../../images/Mining Icons/Incentives/Active Participation.svg";
import Icon10 from "../../images/Mining Icons/Incentives/Reward Multiplier.svg";
interface CardData {
  avtar: StaticImageData;
  title: string;
  description: string;
}

interface IncentivesProps {
  userPoints: number;
  setUserPoints: React.Dispatch<React.SetStateAction<number>>;
  cardLevels: { [key: string]: number };
  setCardLevels: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  updateProfitPerHour: (amount: number) => void;
}

const cardData: CardData[] = [
  {
    avtar: Icon1,
    title: "Token Economy",
    description: "Digital assets used within the network.",
  },
  {
    avtar: Icon6,
    title: "DeFi Protocols",
    description: "Financial services built on blockchain.",
  },
  {
    avtar: Icon2,
    title: "Governance Models",
    description: "Systems for community decision-making.",
  },
  {
    avtar: Icon4,
    title: "Staking Rewards",
    description:
      "Locking tokens to support network operations and earn rewards.",
  },
  {
    avtar: Icon7,
    title: "Dynamic Rewards",
    description: "Adaptive incentive structures.",
  },
  {
    avtar: Icon3,
    title: "Incentive Programs",
    description: "Rewards for contributing to the network.",
  },
  {
    avtar: Icon5,
    title: "Bonding Mechanisms",
    description: "Mechanisms to support token liquidity.",
  },
  {
    avtar: Icon8,
    title: "Community Building",
    description: "Engagement and participation strategies.",
  },
  {
    avtar: Icon10,
    title: "Reward Multiplier",
    description: "Multiple the rewards in the network.",
  },
  {
    avtar: Icon9,
    title: "Active Participation",
    description: "Encouragging active involvement in the network.",
  },
];

const costMap: { [key: string]: number } = {
  "Token Economy": 1300,
  "Governance Models": 1200,
  "Incentive Programs": 1000,
  "Staking Rewards": 1200,
  "Bonding Mechanisms": 1000,
  "DeFi Protocols": 1300,
  "Dynamic Rewards": 1100,
  "Community Building": 1000,
  "Reward Multiplier": 1100,
  "Active Participation": 900,
};

const maxLevelMap: { [key: string]: number } = {
  "Token Economy": 4,
  "Governance Models": 4,
  "Incentive Programs": 3,
  "Staking Rewards": 4,
  "Bonding Mechanisms": 3,
  "DeFi Protocols": 4,
  "Dynamic Rewards": 3,
  "Community Building": 3,
  "Reward Multiplier": 3,
  "Active Participation": 3,
};

const bonusMap: { [key: string]: number[] } = {
  "Token Economy": [90, 180, 270, 360],
  "Governance Models": [80, 160, 240, 320],
  "Incentive Programs": [50, 100, 150],
  "Staking Rewards": [80, 160, 240, 320],
  "Bonding Mechanisms": [50, 100, 150],
  "DeFi Protocols": [90, 180, 270, 360],
  "Dynamic Rewards": [60, 120, 180],
  "Community Building": [50, 100, 150],
  "Reward Multiplier": [50, 100, 150],
  "Active Participation": [50, 100, 150],
};

function Notification({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed top-4 right-0 w-full max-w-sm p-4 rounded-xl shadow-lg z-50 transition-all duration-300 transform ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      } ${
        type === "success"
          ? "hover:bg-green-600 hover:shadow-2xl hover:scale-105"
          : "hover:bg-red-600 hover:shadow-2xl hover:scale-105"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm font-medium">{message}</p>
          </div>
        </div>
        <button
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            type === "success" ? "bg-green-700" : "bg-red-700"
          }`}
          onClick={onClose}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Incentive({
  userPoints,
  setUserPoints,
  cardLevels,
  setCardLevels,
  updateProfitPerHour,
}: IncentivesProps) {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const calculateCost = (cardTitle: string, level: number) => {
    const baseCost = costMap[cardTitle];
    if (level === 0) return baseCost;
    return baseCost * (level + 1);
  };

  const calculateBonus = (cardTitle: string, level: number) => {
    return bonusMap[cardTitle][level] || 0;
  };

  const handlePurchase = () => {
    if (!selectedCard) return;

    const currentLevel = cardLevels[selectedCard.title] || 0;
    const maxLevel = maxLevelMap[selectedCard.title];
    const cost = calculateCost(selectedCard.title, currentLevel);

    if (userPoints >= cost && currentLevel < 3) {
      setUserPoints((prevPoints) => prevPoints - cost);

      // Update card level
      setCardLevels((prevLevels) => ({
        ...prevLevels,
        [selectedCard.title]: currentLevel + 1,
      }));

      // Apply the bonus for the new level
      const newBonus = calculateBonus(selectedCard.title, currentLevel);
      updateProfitPerHour(newBonus);

      setNotification({ message: "Purchase successful!", type: "success" });
    } else if (currentLevel >= maxLevel) {
      setNotification({
        message: "This card is already at the maximum level.",
        type: "error",
      });
    } else {
      setNotification({
        message:
          "You do not have enough points to purchase or upgrade this card.",
        type: "error",
      });
    }
    setSelectedCard(null); // Close the modal after purchase
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
      {cardData.map((card, index) => {
        const currentLevel = cardLevels[card.title] || 0;
        const maxLevel = maxLevelMap[card.title];
        const cost = calculateCost(card.title, currentLevel);
        const bonus = calculateBonus(card.title, currentLevel);
        const atMaxLevel = currentLevel >= maxLevel;

        return (
          <div
            key={index}
            className={`relative flex flex-col rounded-2xl bg-neutral-800 py-4 gap-2 w-44 sm:w-40 cursor-pointer shadow-lg${
              atMaxLevel ? "opacity-50" : ""
            }`}
            onClick={() => !atMaxLevel && setSelectedCard(card)} // Set selected card on click
          >
            {atMaxLevel && (
              <div className="absolute inset-0 bg-black opacity-60 flex items-center justify-center text-lg text-white font-bold rounded-lg"></div>
            )}
            {/* Level Badge */}
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs px-2 py-1 rounded-tr-lg rounded-bl-lg">
              LvL {currentLevel}
            </div>

            {/* Astro Image and Card Details */}
            <div className="flex items-center gap-2">
              <Image
                src={card.avtar}
                width={64}
                height={64}
                alt="Astro"
                className="h-full"
              />
              <div className="flex flex-col pt-4">
                <h3 className="text-white font-semibold text-sm">
                  {card.title}
                </h3>
                <h4 className="text-gray-400 text-xs">Bonus per hour</h4>
                <div className="flex items-center gap-1">
                  <Image src={Coin} width={14} height={14} alt="Coin" />
                  <span className="text-green-400 text-lg">+{bonus}</span>
                </div>
              </div>
            </div>

            {/* Upgrade */}
            <div className="flex bg-neutral-700 p-1">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-white text-xs">
                  {currentLevel === 0 ? "Purchase" : "Upgrade"}
                </h3>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Image src={Coin} width={14} height={14} alt="Coin" />
                  <span className="text-yellow-400 text-xs">
                    {cost.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-neutral-800 rounded-t-[46px] border-t-2 border-amber-600 top-glow p-6 w-96 relative">
            <div className="flex flex-col items-center gap-4">
              <Image
                src={selectedCard.avtar}
                width={100}
                height={100}
                alt="Astro"
              />
              <h3 className="text-white font-semibold text-lg">
                {selectedCard.title}
              </h3>
              <p className="text-gray-400 text-sm text-center">
                {selectedCard.description}
              </p>
              <div className="flex bg-neutral-600 items-center gap-2 border rounded-full p-2">
                <span className="text-white text-xs">Profit per hour:</span>
                <span className="text-green-400 text-xs">
                  +
                  {calculateBonus(
                    selectedCard.title,
                    cardLevels[selectedCard.title] || 0
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">
                  {cardLevels[selectedCard.title] === 0
                    ? "Purchase"
                    : "Upgrade"}{" "}
                  Cost:
                </span>
                <span className="text-yellow-400 text-lg">
                  {calculateCost(
                    selectedCard.title,
                    cardLevels[selectedCard.title] || 0
                  )}
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-2 px-4 rounded-xl"
                  onClick={handlePurchase}
                >
                  {cardLevels[selectedCard.title] === 0
                    ? "Purchase"
                    : "Upgrade"}
                </button>
                <button
                  className="bg-gray-600 text-white py-2 px-4 rounded-xl"
                  onClick={() => setSelectedCard(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
