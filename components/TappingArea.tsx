import Image, { StaticImageData } from "next/image";
import Armadillo from "../images/Armadillo_2.svg";
import Orb from "../images/Allien Planets/Allien Planet 3.svg";
import OrbCipher from "../images/Allien Planets/Allien Planet 5.svg";
import Fire from "../icons/Power.svg";
import Boost1 from "../icons/Rocket.svg";
import Coin from "../images/coin.png";
import Star from "../icons/Star 1.svg";
import Diamond from "../icons/Star 2.svg";
import Clock from "../icons/Satr3.svg";
import { useState } from "react";
import Boost from "./Boost";

interface TappingAreaProps {
  userPoints: number;
  setUserPoints: (newPoints: number) => void;
  tapCount: number;
  energy: number;
  maxEnergy: number;
  multitapLevel: number;
  energyLimitLevel: number;
  increaseTapCount: () => void;
  increaseMaxEnergy: () => void;
  handleTapClick: () => void;
  setActiveTab: (tabName: string) => void;
}

export default function TappingArea({
  userPoints,
  setUserPoints,
  tapCount,
  energy,
  maxEnergy,
  multitapLevel,
  energyLimitLevel,
  increaseTapCount,
  increaseMaxEnergy,
  handleTapClick,
  setActiveTab,
}: TappingAreaProps) {
  const [showBoost, setShowBoost] = useState(false);
  const [showIncrement, setShowIncrement] = useState(false);
  const [tapPosition, setTapPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [orbImage, setOrbImage] = useState(Orb); // State for the orb image

  const handleBoostClick = () => {
    setShowBoost(true);
  };

  const handleTap = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTapPosition({ x, y });

    handleTapClick();
    setShowIncrement(true);
    setTimeout(() => setShowIncrement(false), 500); // hide after 500ms
  };

  const handleDailyCipherClick = () => {
    setOrbImage(OrbCipher); // Change the orb image to the cipher version
  };

  const handleDailyComboClick = () => {
    setActiveTab("mine");
  };

  return (
    <div className="my-10 w-full h-full bg-gray-950 rounded-t-[46px] border-t-2 border-amber-600 top-glow">
      <svg style={{ display: "none" }}>
        <filter id="glow">
          <feGaussianBlur stdDeviation="15" operator="out" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>
      {!showBoost ? (
        <div className="flex flex-col items-center justify-start h-full p-2 gap-4">
          <div className="flex items-center justify-center gap-2">
            <Image src={Coin} width={34} height={34} alt="Coin Icon" className="rounded-full" />
            <h5 className="text-white text-2xl">{userPoints}</h5>
          </div>
          <div className="relative">
            <Image
              src={orbImage} // Use the orb image state
              width={200}
              height={200}
              onClick={handleTap}
              alt="Central Tap"
              className="transition duration-200 ease-in-out rounded-full"
            />
            <Image
              src={Armadillo}
              width={100}
              height={100}
              onClick={handleTap}
              alt="Armadillo"
              style={{
                filter: showIncrement ? "url(#glow)" : "none",
              }}
              className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-200 ease-in-out"
            />
            {showIncrement && <PointIncrement tapCount={tapCount} tapPosition={tapPosition} />}
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <Image src={Fire} width={15} height={15} alt="Fire" />
              <h4 className="text-white text-lg">
                {energy}/{maxEnergy}
              </h4>
            </div>
            <div className="flex items-center" onClick={handleBoostClick}>
              <Image src={Boost1} width={30} height={30} alt="Boost" />
              <h4 className="text-white text-lg">Boost</h4>
            </div>
          </div>
          <div className="flex gap-2 text-sm items-center justify-between w-full h-20">
            <RewardCard icon={Star} label="Daily Reward" />
            <RewardCard icon={Diamond} label="Daily Cipher" onClick={handleDailyCipherClick} /> {/* Attach click handler */}
            <RewardCard icon={Clock} label="Daily Combo" onClick={handleDailyComboClick} />
          </div>
        </div>
      ) : (
        <Boost
          userBalance={userPoints}
          setUserBalance={setUserPoints}
          multitapLevel={multitapLevel}
          energyLimitLevel={energyLimitLevel}
          increaseTapCount={increaseTapCount}
          increaseMaxEnergy={increaseMaxEnergy}
          setShowBoost={setShowBoost}
        />
      )}
    </div>
  );
}

// Component for showing point increment
interface PointIncrementProps {
  tapCount: number;
  tapPosition: { x: number; y: number };
}

function PointIncrement({ tapCount, tapPosition }: PointIncrementProps) {
  return (
    <div
      className="absolute text-white text-3xl font-bold animate-fadeUp"
      style={{
        top: tapPosition.y,
        left: tapPosition.x,
        transform: "translate(-50%, -50%)",
      }}
    >
      +{tapCount}
    </div>
  );
}

// Define the prop types for RewardCard
interface RewardCardProps {
  icon: StaticImageData;
  label: string;
  onClick?: () => void;
}

function RewardCard({ icon, label, onClick }: RewardCardProps) {
  return (
    <div
      className="w-1/3 h-24 bg-neutral-800 flex flex-col items-start justify-around rounded-xl border border-gray-500 p-2 shadow-inner shadow-indigo-500"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <Image src={icon} width={35} height={35} alt={label} />
      <h3 className="text-white">{label}</h3>
    </div>
  );
}
