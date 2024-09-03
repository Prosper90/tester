"use client";

import { useState } from "react";
import Image, {StaticImageData} from "next/image";
import Coin from "../../images/Token.svg";
import Icon1 from "../../images/Mining Icons/Security/Threat Detection.svg"
import Icon2 from "../../images/Mining Icons/Security/Security Audits.svg"
import Icon3 from "../../images/Mining Icons/Security/Incident Response.svg"
import Icon4 from "../../images/Mining Icons/Security/Regulatory Compliance.svg"
import Icon5 from "../../images/Mining Icons/Security/Insurance Protections.svg"
import Icon6 from "../../images/Mining Icons/Security/Zero-Trust Security.svg"
import Icon7 from "../../images/Mining Icons/Security/Decentralized Protection.svg"
import Icon8 from "../../images/Mining Icons/Security/Adaptive Authentication.svg"
import Icon9 from "../../images/Mining Icons/Security/Network Monitoring.svg"
import Icon10 from "../../images/Mining Icons/Security/Identity Management.svg"
import Icon11 from "../../images/Mining Icons/Security/Data Security.svg"
import Icon12 from "../../images/Mining Icons/Security/Blockchain Forensics.svg"
interface CardData {
  avtar: StaticImageData;
  title: string;
  description: string;
}

interface SecurityProps {
  userPoints: number;
  setUserPoints: React.Dispatch<React.SetStateAction<number>>;
  cardLevels: { [key: string]: number };
  setCardLevels: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  updateProfitPerHour: (amount: number) => void;
}

const cardData: CardData[] = [
  {avtar:Icon1, title: "Threat Detection", description: "Identifying and mitigating potential risks." },
  {avtar:Icon7, title: "Decentralized Protection", description: "Distributed security measures." },
  {avtar:Icon2, title: "Security Audits", description: "Regular security checks and assessments." },
  {avtar:Icon12, title: "Blockchain Forensics", description: ""},
  {avtar:Icon6, title: "Zero-Trust Security", description: "Strict access control principles." },
  {avtar:Icon4, title: "Regulatory Compliance", description: "Adhering to legal and regulatory requirements." },
  {avtar:Icon9, title: "Network Monitoring", description: "Continuous oversight of network activity." },
  {avtar:Icon10, title: "Identity Management", description: "Managing user identities securely." },
  {avtar:Icon11, title: "Data Security", description: "Protecting and managing information." },
  {avtar:Icon3, title: "Incident Response", description: "Plans for addressing security incidents." },
  {avtar:Icon8, title: "Adaptive Authentication", description: "Authentication based on user risk profiles." },
  {avtar:Icon5, title: "Insurance Protections", description: "Protection against losses or failures." },
];


const costMap: { [key: string]: number } = {
  "Threat Detection": 1300,
  "Security Audits": 1200,
  "Incident Response": 1000,
  "Regulatory Compliance": 1100,
  "Insurance Protections": 1000,
  "Blockchain Forensics": 1200,
  "Zero-Trust Security": 1200,
  "Decentralized Protection": 1300,
  "Adaptive Authentication": 1000,
  "Network Monitoring": 1100,
  "Identity Management": 1100,
  "Data Security": 1100,
};

const maxLevelMap: { [key: string]: number } = {
  "Threat Detection": 4,
  "Security Audits": 4,
  "Incident Response": 3,
  "Regulatory Compliance": 3,
  "Blockchain Forensics": 4,
  "Insurance Protections": 3,
  "Zero-Trust Security": 4,
  "Decentralized Protection": 4,
  "Adaptive Authentication": 3,
  "Network Monitoring": 3,
  "Identity Management": 3,
  "Data Security": 3,
};

const bonusMap: { [key: string]: number[] } = {
  "Threat Detection": [90, 180, 270, 360],
  "Security Audits": [80, 160, 240, 320],
  "Incident Response": [50, 100, 150],
  "Regulatory Compliance": [60, 120, 180],
  "Blockchain Forensics": [80,160,240,320],
  "Insurance Protections": [50, 100, 150],
  "Zero-Trust Security": [80, 160, 240, 320],
  "Decentralized Protection": [90, 180, 270, 360],
  "Adaptive Authentication": [50, 100, 150],
  "Network Monitoring": [60, 120, 180],
  "Identity Management": [60, 120, 180],
  "Data Security": [60, 120, 180],
};

function Notification({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-transform duration-500 transform ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}
    >
      {message}
      <button className="ml-4 text-white" onClick={onClose}>X</button>
    </div>
  );
}

export default function Security({ userPoints, setUserPoints, cardLevels, setCardLevels, updateProfitPerHour }: SecurityProps) {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

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

      setNotification({ message: 'Purchase successful!', type: 'success' });
    } else if (currentLevel >= maxLevel) {
      setNotification({ message: 'This card is already at the maximum level.', type: 'error' });
    } else {
      setNotification({ message: 'You do not have enough points to purchase or upgrade this card.', type: 'error' });
    }
    setSelectedCard(null); // Close the modal after purchase
  };

  return (
    <div className="flex flex-wrap gap-2 w-full p-4 items-center justify-between">
      {cardData.map((card, index) => {
        const currentLevel = cardLevels[card.title] || 0;
        const maxLevel = maxLevelMap[card.title];
        const cost = calculateCost(card.title, currentLevel);
        const bonus = calculateBonus(card.title, currentLevel);
        const atMaxLevel = currentLevel >= maxLevel;

        return (
          <div
            key={index}
            className={`relative flex flex-col rounded-2xl bg-neutral-800 py-4 gap-2 w-40 cursor-pointer shadow-lg${atMaxLevel ? 'opacity-50' : ''}`}
            onClick={() => !atMaxLevel && setSelectedCard(card)} // Set selected card on click
          >
            {atMaxLevel && (
              <div className="absolute inset-0 bg-black opacity-60 flex items-center justify-center text-lg text-white font-bold rounded-lg">
                
              </div>
            )}
            {/* Level Badge */}
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs px-2 py-1 rounded-tr-lg rounded-bl-lg">
              LvL {currentLevel}
            </div>

            {/* Astro Image and Card Details */}
            <div className="flex items-center gap-2">
              <Image src={card.avtar} width={64} height={64} alt="Astro" className="h-full" />
              <div className="flex flex-col pt-4">
                <h3 className="text-white font-semibold text-sm">{card.title}</h3>
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
                <h3 className="text-white text-xs">{currentLevel === 0 ? 'Purchase' : 'Upgrade'}</h3>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Image src={Coin} width={14} height={14} alt="Coin" />
                  <span className="text-yellow-400 text-xs">{cost.toLocaleString()}</span>
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
                <span className="text-green-400 text-lg">+{calculateBonus(selectedCard.title, (cardLevels[selectedCard.title] || 0))}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">{cardLevels[selectedCard.title] === 0 ? 'Purchase' : 'Upgrade'} Cost:</span>
                <span className="text-yellow-400 text-lg">{calculateCost(selectedCard.title, cardLevels[selectedCard.title] || 0)}</span>
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
