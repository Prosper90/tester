"use client";

import Image, { StaticImageData } from "next/image";
import Coin from "../images/Token.svg";
import ChestBox1 from "../images/ChestBox.png";
import ChestBox2 from "../images/ChestBox2.png";
import { useState, useEffect } from "react";
import { generateDailyCombos, CardCombo } from "@/utils/dailyCombo"; // Ensure CardCombo is imported from utils


// Performance Card Images
import ConsensusAlgorithms from "../images/Mining Icons/Performance/Consensus Algorithms.svg";
import NetworkDesign from "../images/Mining Icons/Performance/Network Design.svg";
import DataStructures from "../images/Mining Icons/Performance/Data Structures.svg";
import ShardTechnology from "../images/Mining Icons/Performance/Shard Technology.svg";
import ScalabilitySolutions from "../images/Mining Icons/Performance/Scalability Solutions.svg";
import FaultTolerance from "../images/Mining Icons/Performance/Fault Tolerance.svg";
import SecurityProtocols from "../images/Mining Icons/Performance/Security Protocols.svg";
import CrossChainInterop from "../images/Mining Icons/Performance/Cross-Chain Interop.svg";
import EnergyEfficiency from "../images/Mining Icons/Performance/Energy Efficiency.svg";
import LatencyReduction from "../images/Mining Icons/Performance/Latency Reduction.svg";
import HybridNetworks from "../images/Mining Icons/Performance/Hybrid Networks.svg";
import PerformanceOptimization from "../images/Mining Icons/Performance/Performance Optimization.svg";
import NodeInfrastructure from "../images/Mining Icons/Performance/Node Infrastructure.svg";
import ElasticNetwork from "../images/Mining Icons/Performance/Elastic Network.svg";

// Usability Card Images
import UserInterface from "../images/Mining Icons/Usability/User Interface.svg";
import WalletSolutions from "../images/Mining Icons/Usability/Wallet Solutions.svg";
import OnboardingGuides from "../images/Mining Icons/Usability/Onboarding Guides.svg";
import AccessibilityOptions from "../images/Mining Icons/Usability/Accessibility Options.svg";
import UserExperience from "../images/Mining Icons/Usability/User Experience.svg";
import GameElements from "../images/Mining Icons/Usability/Game Elements.svg";
import PersonalizedContent from "../images/Mining Icons/Usability/Personalized Content.svg";
import DataAnalytics from "../images/Mining Icons/Usability/Data Analytics.svg";
import UserEngagement from "../images/Mining Icons/Usability/User Engagement.svg";
import DecentralizedApps from "../images/Mining Icons/Usability/Decentralized Apps.svg";

// Incentives Card Images
import TokenEconomy from "../images/Mining Icons/Incentives/Token Economy.svg";
import GovernanceModels from "../images/Mining Icons/Incentives/Governance Models.svg";
import IncentivePrograms from "../images/Mining Icons/Incentives/Incentive Programs.svg";
import StakingRewards from "../images/Mining Icons/Incentives/Staking Rewards.svg";
import BondingMechanisms from "../images/Mining Icons/Incentives/Bonding Mechanisms.svg";
import DeFiProtocols from "../images/Mining Icons/Incentives/DeFi Protocols.svg";
import DynamicRewards from "../images/Mining Icons/Incentives/Dynamic Rewards.svg";
import CommunityBuilding from "../images/Mining Icons/Incentives/Community Building.svg";
import ActiveParticipation from "../images/Mining Icons/Incentives/Active Participation.svg";
import RewardMultiplier from "../images/Mining Icons/Incentives/Reward Multiplier.svg";

// Security Card Images
import ThreatDetection from "../images/Mining Icons/Security/Threat Detection.svg";
import SecurityAudits from "../images/Mining Icons/Security/Security Audits.svg";
import IncidentResponse from "../images/Mining Icons/Security/Incident Response.svg";
import RegulatoryCompliance from "../images/Mining Icons/Security/Regulatory Compliance.svg";
import InsuranceProtections from "../images/Mining Icons/Security/Insurance Protections.svg";
import ZeroTrustSecurity from "../images/Mining Icons/Security/Zero-Trust Security.svg";
import DecentralizedProtection from "../images/Mining Icons/Security/Decentralized Protection.svg";
import AdaptiveAuthentication from "../images/Mining Icons/Security/Adaptive Authentication.svg";
import NetworkMonitoring from "../images/Mining Icons/Security/Network Monitoring.svg";
import IdentityManagement from "../images/Mining Icons/Security/Identity Management.svg";
import DataSecurity from "../images/Mining Icons/Security/Data Security.svg";
import BlockchainForensics from "../images/Mining Icons/Security/Blockchain Forensics.svg";

interface DailyComboProps {
  userPoints: number;
  setUserPoints: React.Dispatch<React.SetStateAction<number>>;
  cardLevels: { [key: string]: number };
  setCardLevels: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
}

// Helper function to get the correct image based on card title
const getImageForCard = (title: string): StaticImageData => {
    switch (title) {
      // Performance
      case "Consensus Algorithms": return ConsensusAlgorithms;
      case "Network Design": return NetworkDesign;
      case "Data Structures": return DataStructures;
      case "Shard Technology": return ShardTechnology;
      case "Scalability Solutions": return ScalabilitySolutions;
      case "Fault Tolerance": return FaultTolerance;
      case "Security Protocols": return SecurityProtocols;
      case "Cross-Chain Interop": return CrossChainInterop;
      case "Energy Efficiency": return EnergyEfficiency;
      case "Latency Reduction": return LatencyReduction;
      case "Hybrid Networks": return HybridNetworks;
      case "Performance Optimization": return PerformanceOptimization;
      case "Node Infrastructure": return NodeInfrastructure;
      case "Elastic Network": return ElasticNetwork;
  
      // Usability
      case "User Interface": return UserInterface;
      case "Wallet Solutions": return WalletSolutions;
      case "Onboarding Guides": return OnboardingGuides;
      case "Accessibility Options": return AccessibilityOptions;
      case "User Experience": return UserExperience;
      case "Game Elements": return GameElements;
      case "Personalized Content": return PersonalizedContent;
      case "Data Analytics": return DataAnalytics;
      case "User Engagement": return UserEngagement;
      case "Decentralized Apps": return DecentralizedApps;
  
      // Incentives
      case "Token Economy": return TokenEconomy;
      case "Governance Models": return GovernanceModels;
      case "Incentive Programs": return IncentivePrograms;
      case "Staking Rewards": return StakingRewards;
      case "Bonding Mechanisms": return BondingMechanisms;
      case "DeFi Protocols": return DeFiProtocols;
      case "Dynamic Rewards": return DynamicRewards;
      case "Community Building": return CommunityBuilding;
      case "Reward Multiplier": return RewardMultiplier;
      case "Active Participation": return ActiveParticipation;
  
      // Security
      case "Threat Detection": return ThreatDetection;
      case "Security Audits": return SecurityAudits;
      case "Incident Response": return IncidentResponse;
      case "Regulatory Compliance": return RegulatoryCompliance;
      case "Insurance Protections": return InsuranceProtections;
      case "Zero-Trust Security": return ZeroTrustSecurity;
      case "Decentralized Protection": return DecentralizedProtection;
      case "Adaptive Authentication": return AdaptiveAuthentication;
      case "Network Monitoring": return NetworkMonitoring;
      case "Identity Management": return IdentityManagement;
      case "Data Security": return DataSecurity;
      case "BlockchainForensics": return BlockchainForensics;
      
      default: return ChestBox2; // default image in case of an error
    }
  };

  function Notification({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
    return (
      <div
        className={`fixed top-4 right-4 max-w-sm p-4 rounded-xl shadow-lg z-50 transition-all duration-300 transform ${
          type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        } ${
          type === 'success'
            ? 'hover:bg-green-600 hover:shadow-2xl hover:scale-105'
            : 'hover:bg-red-600 hover:shadow-2xl hover:scale-105'
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
              type === 'success' ? 'bg-green-700' : 'bg-red-700'
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

export default function DailyCombo({ userPoints, setUserPoints, cardLevels, setCardLevels }: DailyComboProps) {
  const [dailyCombos, setDailyCombos] = useState<CardCombo[][]>([]);
  const [currentCombo, setCurrentCombo] = useState<CardCombo[]>([]);
  const [purchasedCards, setPurchasedCards] = useState<boolean[]>([false, false, false]); // Track purchase status
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const combos = generateDailyCombos();
    setDailyCombos(combos);

    // Calculate the index for today's combo
    const today = new Date();
    const dayOfMonth = today.getDate();
    const comboIndex = (dayOfMonth - 1) % 20; // Use modulo to cycle through 15 days

    setCurrentCombo(combos[comboIndex]);
  }, []);

  const handlePurchase = (index: number) => {
    const card = currentCombo[index];
    const cardTitle = card.title;
    const cardLevel = card.level;
    const cardCost = calculateCardCost(cardTitle, cardLevel);
  
    if (userPoints >= cardCost && !purchasedCards[index]) {
      // Deduct points from userPoints
      setUserPoints((prev) => prev - cardCost);
  
      // Update the card level
      setCardLevels((prevLevels) => ({
        ...prevLevels,
        [cardTitle]: (prevLevels[cardTitle] || 0) + 1, // Increment level
      }));
  
      // Mark this card as purchased
      setPurchasedCards((prev) => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
  
      // Show a success notification
      setNotification({ message: `Purchased ${cardTitle}!`, type: 'success' });
  
      // Check if all three cards have been purchased
      if (purchasedCards.filter(Boolean).length === 2) { // This should check for 2 already true
        setUserPoints((prev) => prev + 10000); // Award 10,000 points
        setNotification({ message: 'All cards purchased! +10,000 points awarded!', type: 'success' });
      }
    } else {
      setNotification({ message: 'Not enough points to purchase this card.', type: 'error' });
    }
  };
  

  const calculateCardCost = (cardTitle: string, level: number) => {
    // Implement your cost calculation logic here
    // For example, base cost * (level + 1)
    return 1000 * (level + 1); // Example calculation
  };

  return (
    <div className="pt-2 w-full bg-gray-950 rounded-t-[46px] border-t-2 border-amber-600 top-glow">
      <div className="w-full p-4">
        <div className="bg-neutral-800 p-2 rounded-xl flex flex-col gap-4 items-center">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-white">Daily Combo</h3>
            <button className="p-2 flex rounded-lg bg-gradient-to-r from-indigo-500 to-pink-600 gap-1 items-center justify-center">
              <Image
                src={Coin}
                width={20}
                height={20}
                alt="Coin Icon"
                className="rounded-full"
              />
              <h5 className="text-white text-sm">+10,000</h5>
            </button>
          </div>
          <div className="flex justify-between gap-1 w-full">
  {currentCombo.slice(0, 3).map((card, index) => ( // Ensure only three cards
    <div
      key={index}
      className="w-1/3 h-24 bg-neutral-700 flex flex-col items-center justify-around rounded-xl border border-gray-500 p-2 shadow-inner shadow-indigo-500 relative cursor-pointer"
      onClick={() => handlePurchase(index)} // Trigger purchase on click
    >
      {purchasedCards[index] ? (
        <>
          <Image
            src={getImageForCard(card.title)} // Use helper function to get the correct image
            width={70}
            height={70}
            alt={card.title}
          />
          <div className="absolute top-1 right-1 bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            Lv{card.level}
          </div>
        </>
      ) : (
        <>
          <Image
            src={ChestBox1}
            width={70}
            height={70}
            alt="Chest"
          />
          <div className="absolute top-1 right-1 bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            ?
          </div>
        </>
      )}
    </div>
  ))}
</div>

        </div>
      </div>

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
