"use client";

import { useState } from "react";
import Image, {StaticImageData} from "next/image";
import Coin from "../../images/coin.png";
import Icon1 from "../../images/Mining Icons/Performance/Consensus Algorithms.svg"
import Icon2 from "../../images/Mining Icons/Performance/Network Design.svg"
import Icon3 from "../../images/Mining Icons/Performance/Data Structures.svg"
import Icon4 from "../../images/Mining Icons/Performance/Shard Technology.svg"
import Icon5 from "../../images/Mining Icons/Performance/Scalability Solutions.svg"
import Icon6 from "../../images/Mining Icons/Performance/Fault Tolerance.svg"
import Icon7 from "../../images/Mining Icons/Performance/Security Protocols.svg"
import Icon8 from "../../images/Mining Icons/Performance/Privacy Features.svg"
import Icon9 from "../../images/Mining Icons/Performance/Cross-Chain Interop.svg"
import Icon10 from "../../images/Mining Icons/Performance/Energy Efficiency.svg"
import Icon11 from "../../images/Mining Icons/Performance/Latency Reduction.svg"
import Icon12 from "../../images/Mining Icons/Performance/Hybrid Networks.svg"
import Icon13 from "../../images/Mining Icons/Performance/Performance Optimization.svg"
import Icon14 from "../../images/Mining Icons/Performance/Node Infrastructure.svg"
import Icon15 from "../../images/Mining Icons/Performance/Elastic Network.svg"

interface CardData {
  avtar: StaticImageData;
  title: string;
  description: string;
}

interface PerformanceProps {
  userPoints: number;
  setUserPoints: React.Dispatch<React.SetStateAction<number>>;
  cardLevels: { [key: string]: number };
  setCardLevels: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  updateProfitPerHour: (amount: number) => void;
}

const cardData: CardData[] = [
  {avtar:Icon1, title: "Consensus Algorithms", description: "Decision-making mechanisms for block validation." },
  {avtar:Icon2, title: "Network Design", description: "Structure and layout of the blockchain network." },
  {avtar:Icon3, title: "Data Structures", description: "Methods for organizing and storing data." },
  {avtar:Icon4, title: "Shard Technology", description: "Dividing the network into smaller partitions for efficiency." },
  {avtar:Icon5, title: "Scalability Solutions", description: "Ability to handle increasing transactions and users." },
  {avtar:Icon6, title: "Fault Tolerance", description: "Resilience against network failures or attacks." },
  {avtar:Icon7, title: "Security Protocols", description: "Measures to protect the network from threats." },
  {avtar:Icon8, title: "Privacy Features", description: "Techniques to keep user data confidential." },
  {avtar:Icon9, title: "Cross-Chain Interop", description: "Communication between different blockchain networks." },
  {avtar:Icon10, title: "Energy Efficiency", description: "Energy consumption and efficiency strategies." },
  {avtar:Icon11, title: "Latency Reduction", description: "Reducing delays in transaction processing." },
  {avtar:Icon12, title: "Hybrid Networks", description: "Combining different technologies for optimal performance." },
  {avtar:Icon13, title: "Performance Optimization", description: "Techniques for improving network performance." },
  {avtar:Icon14, title: "Node Infrastructure", description: "Types and roles of network participants." },
  {avtar:Icon15, title: "Elastic Network", description: "Ability to adjust resources based on demand." },
];

function Notification({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-transform duration-500 transform ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      {message}
      <button className="ml-4 text-white" onClick={onClose}>X</button>
    </div>
  );
}

export default function Performance({ userPoints, setUserPoints, cardLevels, setCardLevels, updateProfitPerHour }: PerformanceProps) {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const calculateCost = (level: number) => {
    switch (level) {
      case 0:
        return 5000; // Cost to purchase L1
      case 1:
        return 10000; // Cost to upgrade to L2
      case 2:
        return 20000; // Cost to upgrade to L3
      default:
        return 0;
    }
  };

  const calculateBonus = (level: number) => {
    switch (level) {
      case 1:
        return 200; // L1 Bonus
      case 2:
        return 500; // L2 Bonus
      case 3:
        return 1000; // L3 Bonus
      default:
        return 0;
    }
  };

  const handlePurchase = () => {
    if (!selectedCard) return;

    const currentLevel = cardLevels[selectedCard.title] || 0;
    const cost = calculateCost(currentLevel);

    if (userPoints >= cost && currentLevel < 3) {
      setUserPoints((prevPoints) => prevPoints - cost);

      // Update card level
      setCardLevels((prevLevels) => ({
        ...prevLevels,
        [selectedCard.title]: currentLevel + 1,
      }));

      // Apply the bonus for the new level
      const newBonus = calculateBonus(currentLevel + 1);
      updateProfitPerHour(newBonus);

      setNotification({ message: 'Purchase successful!', type: 'success' });
    } else if (currentLevel >= 3) {
      setNotification({ message: 'This card is already at the maximum level (L3).', type: 'error' });
    } else {
      setNotification({ message: 'You do not have enough points to purchase or upgrade this card.', type: 'error' });
    }
    setSelectedCard(null); // Close the modal after purchase
  };

  return (
    <div className="flex flex-wrap gap-2 w-full p-4 items-center justify-between">
      {cardData.map((card, index) => {
        const currentLevel = cardLevels[card.title] || 0;
        const currentCost = calculateCost(currentLevel);
        const currentBonus = calculateBonus(currentLevel + 1);

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
              <Image src={card.avtar} width={64} height={64} alt="Astro" className="h-full" />
              <div className="flex flex-col pt-4">
                <h3 className="text-white font-semibold text-sm">{card.title}</h3>
                <h4 className="text-gray-400 text-xs">Bonus per day</h4>
                <div className="flex items-center gap-1">
                  <Image src={Coin} width={14} height={14} alt="Coin" />
                  <span className="text-green-400 text-lg">+{currentBonus}</span>
                </div>
              </div>
            </div>

            {/* Upgrade */}
            <div className="flex bg-neutral-700 p-1">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-white text-xs">{currentLevel === 0 ? 'Purchase' : 'Upgrade'}</h3>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Image src={Coin} width={14} height={14} alt="Coin" />
                  <span className="text-yellow-400 text-xs">{currentCost.toLocaleString()}</span>
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
              <Image src={selectedCard.avtar} width={100} height={100} alt="Astro" />
              <h3 className="text-white font-semibold text-lg">{selectedCard.title}</h3>
              <p className="text-gray-400 text-sm text-center">{selectedCard.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">Bonus per Day:</span>
                <span className="text-green-400 text-lg">+{calculateBonus(cardLevels[selectedCard.title] || 0)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">{cardLevels[selectedCard.title] === 0 ? 'Purchase' : 'Upgrade'} Cost:</span>
                <span className="text-yellow-400 text-lg">{calculateCost(cardLevels[selectedCard.title] || 0).toLocaleString()}</span>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-2 px-4 rounded-xl"
                  onClick={handlePurchase}
                >
                  {cardLevels[selectedCard.title] === 0 ? 'Purchase' : 'Upgrade'}
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
