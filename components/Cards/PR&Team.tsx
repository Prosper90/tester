"use client";

import { useState } from "react";
import Image from "next/image";
import Astro from "../../images/Astro1.png";
import Coin from "../../images/coin.png";

interface CardData {
  title: string;
  baseProfit: number;
  baseUpgradeCost: number;
  levelRequired: number;
  description: string;
  requiredCard?: { title: string; level: number };
  extraCost?: number; // Added extraCost for additional points required
}

interface PrteamProps {
  userPoints: number;
  setUserPoints: React.Dispatch<React.SetStateAction<number>>;
  cardLevels: { [key: string]: number };
  setCardLevels: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  updateProfitPerHour: (amount: number) => void;
}

const cardData: CardData[] = [
  { title: "SEO", baseProfit: 100, baseUpgradeCost: 1000, levelRequired: 0, description: "Improve your search engine rankings." },
  { title: "Marketing", baseProfit: 70, baseUpgradeCost: 1000, levelRequired: 0, description: "Enhance your marketing strategies." },
  { title: "IT Team", baseProfit: 240, baseUpgradeCost: 2000, levelRequired: 0, description: "Strengthen your IT infrastructure." },
  { title: "Support Team", baseProfit: 70, baseUpgradeCost: 750, levelRequired: 0, description: "Boost customer support efficiency." },
  { title: "Gold Rush Tube", baseProfit: 90, baseUpgradeCost: 500, levelRequired: 0, description: "Create and share video content.", requiredCard: { title: "Gold Rush Book", level: 5 }, extraCost: 500 },
  { title: "Gold Rush Book", baseProfit: 70, baseUpgradeCost: 500, levelRequired: 0, description: "Build your social media presence." },
];

export default function Prteam({ userPoints, setUserPoints, cardLevels, setCardLevels, updateProfitPerHour }: PrteamProps) {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const calculateCost = (baseCost: number, level: number) => {
    const levelMultiplier = 1.15; // 15% increase per level
    return Math.round(baseCost * Math.pow(levelMultiplier, level));
  };

  const calculateProfit = (baseProfit: number, level: number) => {
    const profitMultiplier = 1.10; // 10% increase per level
    return Math.round(baseProfit * Math.pow(profitMultiplier, level));
  };

  const handlePurchase = () => {
    if (!selectedCard) return;

    const currentLevel = cardLevels[selectedCard.title] || 0;
    const cost = calculateCost(selectedCard.baseUpgradeCost, currentLevel);

    // Check for additional requirements
    if (selectedCard.requiredCard) {
      const requiredCardLevel = cardLevels[selectedCard.requiredCard.title] || 0;
      if (requiredCardLevel < selectedCard.requiredCard.level) {
        alert(`You need ${selectedCard.requiredCard.title} at level ${selectedCard.requiredCard.level} to purchase this card.`);
        return;
      }
    }

    if (userPoints >= cost && currentLevel < 15) {
      setUserPoints((prevPoints) => prevPoints - cost);

      // Update card level
      setCardLevels((prevLevels) => ({
        ...prevLevels,
        [selectedCard.title]: currentLevel + 1,
      }));

      // Calculate the increased profit
      const newProfit = calculateProfit(selectedCard.baseProfit, currentLevel);
      updateProfitPerHour(newProfit);
    } else if (currentLevel >= 15) {
      alert("This card is already at the maximum level.");
    } else {
      alert(`You do not have enough points or level to purchase this card.`);
    }
    setSelectedCard(null); // Close the modal after purchase
  };

  return (
    <div className="flex flex-wrap gap-2 w-full p-4 items-center justify-between">
      {cardData.map((card, index) => {
        const currentLevel = cardLevels[card.title] || 0;
        const currentCost = calculateCost(card.baseUpgradeCost, currentLevel);
        const currentProfit = calculateProfit(card.baseProfit, currentLevel);

        return (
          <div
            key={index}
            className="relative flex flex-col rounded-2xl bg-neutral-800 py-4 gap-2 w-40 cursor-pointer"
            onClick={() => setSelectedCard(card)} // Set selected card on click
          >
            {/* Level Badge */}
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs px-2 py-1 rounded-tr-lg rounded-bl-lg">
              LvL {currentLevel}
            </div>

            {/* Astro Image and Card Details */}
            <div className="flex items-center gap-2">
              <Image src={Astro} width={64} height={64} alt="Astro" className="h-full" />
              <div className="flex flex-col pt-4">
                <h3 className="text-white font-semibold text-sm">{card.title}</h3>
                <h4 className="text-gray-400 text-xs">Profit per hour</h4>
                <div className="flex items-center gap-1">
                  <Image src={Coin} width={14} height={14} alt="Coin" />
                  <span className="text-green-400 text-lg">+{currentProfit}</span>
                </div>
              </div>
            </div>

            {/* Upgrade  */}

            
          {/* Upgrade  */}
          <div className="flex bg-neutral-700 p-1">
            {card.requiredCard && card.extraCost ? (
              <div className="flex items-center justify-between w-full">
                <h3 className="text-white text-xs w-2/3">{card.requiredCard.title}: LvL {card.requiredCard.level}</h3>
                <div className="flex items-center justify-center gap-1 mt-1">
                <Image src={Coin} width={14} height={14} alt="Coin" />
                <span className="text-yellow-400 text-xs">{currentCost.toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <h3 className="text-white text-xs">Upgrade</h3>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Image src={Coin} width={14} height={14} alt="Coin" />
                  <span className="text-yellow-400 text-xs">{currentCost.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
            {/* <div className="flex bg-neutral-700 p-1">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-white text-xs">Upgrade</h3>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Image src={Coin} width={14} height={14} alt="Coin" />
                  <span className="text-yellow-400 text-xs">{currentCost.toLocaleString()}</span>
                </div>
              </div>
            </div> */}
          </div>
        );
      })}

      {/* Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-neutral-800 rounded-t-[46px] border-t-2 border-indigo-600 top-glow p-6 w-96 relative">
            <div className="flex flex-col items-center gap-4">
              <Image src={Astro} width={100} height={100} alt="Astro" />
              <h3 className="text-white font-semibold text-lg">{selectedCard.title}</h3>
              <p className="text-gray-400 text-sm text-center">{selectedCard.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">Profit per hour</span>
                <div className="flex items-center gap-1">
                  <Image src={Coin} width={14} height={14} alt="Coin" />
                  <span className="text-green-400 text-lg">
                    +{calculateProfit(selectedCard.baseProfit, cardLevels[selectedCard.title] || 0)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Image src={Coin} width={14} height={14} alt="Coin" />
                <span className="text-yellow-500 text-2xl font-semibold">
                  {calculateCost(selectedCard.baseUpgradeCost, cardLevels[selectedCard.title] || 0).toLocaleString()}
                </span>
              </div>
              <button
                onClick={handlePurchase}
                className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-2 px-4 rounded-xl w-full text-center mt-4"
              >
                Go ahead
              </button>
              <button
                onClick={() => setSelectedCard(null)}
                className="bg-gray-600 text-white py-2 px-4 rounded-xl w-full text-center mt-2"
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
