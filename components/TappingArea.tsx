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
import PointIncrement from "./PointIncrement";

interface TappingAreaProps {
  userPoints: number;
  setUserPoints: (newPoints: number | ((prevPoints: number) => number)) => void;
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

const MORSE_CODE = "...- .- .-.. .. -.. .- - --- .-.";
const TRANSLATION = "VALIDATOR";
const BONUS_POINTS = 2000;

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
  const [isCipherMode, setIsCipherMode] = useState(false); // State to track cipher mode
  const [tapSymbol, setTapSymbol] = useState<string | null>(null); // State to track the symbol
  const [userInput, setUserInput] = useState<string>(""); // State to track user Morse code input

  const handleBoostClick = () => {
    setShowBoost(true);
  };

  // Handle tap or long press
  const handleTap = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTapPosition({ x, y });

    if (isCipherMode) {
      const newSymbol = ".";
      setTapSymbol(newSymbol);
      setUserInput((prevInput) => prevInput + newSymbol); // Append the new symbol
      setShowIncrement(true);
      setTimeout(() => setShowIncrement(false), 500);

      // Check if the Morse code matches
      if (userInput + newSymbol === MORSE_CODE) {
        setUserPoints((prevPoints) => prevPoints + BONUS_POINTS); // Add bonus points
        setUserInput(""); // Reset user input after awarding points
      }
    } else {
      handleTapClick();
      setShowIncrement(true);
      setTimeout(() => setShowIncrement(false), 500);
    }
  };

  // Handle long press for dash
  const handleLongPress = () => {
    if (isCipherMode) {
      const newSymbol = "-";
      setTapSymbol(newSymbol);
      setUserInput((prevInput) => prevInput + newSymbol); // Append the new symbol
      setShowIncrement(true);
      setTimeout(() => setShowIncrement(false), 500);

      // Check if the Morse code matches
      if (userInput + newSymbol === MORSE_CODE) {
        setUserPoints((prevPoints) => prevPoints + BONUS_POINTS); // Add bonus points
        setUserInput(""); // Reset user input after awarding points
      }
    }
  };

  const handleDailyCipherClick = () => {
    setIsCipherMode(!isCipherMode); // Toggle cipher mode
    setOrbImage((prevImage: StaticImageData) => (prevImage === Orb ? OrbCipher : Orb));
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
          {isCipherMode && (
            <div className="morse-code-input w-full flex items-center justify-between bg-gray-800 p-2 rounded-md text-white">
              {/* Make this div more prominent */}
              <p className="font-bold w-1/3">Daily cipher</p>
              <p className="w-1/3 break-words">{userInput}</p>
              <button className="p-1 w-1/3 flex rounded-lg bg-gradient-to-r from-indigo-500 to-pink-600 gap-1 items-center justify-center">
                <Image
                  src={Coin}
                  width={20}
                  height={20}
                  alt="Coin Icon"
                  className="rounded-full"
                />
                <h5 className="text-white text-sm">+2,000</h5>
              </button>
            </div>
          )}
          <div className="relative">
            <Image
              src={orbImage} // Use the orb image state
              width={200}
              height={200}
              onClick={handleTap}
              onContextMenu={(e) => e.preventDefault()} // Prevent context menu on right click
              onMouseDown={(e) => {
                if (e.button === 2) handleLongPress(); // Right click for long press
              }}
              alt="Central Tap"
              className="transition duration-200 ease-in-out rounded-full"
            />
            <Image
              src={Armadillo}
              width={100}
              height={100}
              onClick={handleTap}
              onContextMenu={(e) => e.preventDefault()} // Prevent context menu on right click
              onMouseDown={(e) => {
                if (e.button === 2) handleLongPress(); // Right click for long press
              }}
              alt="Armadillo"
              style={{
                filter: showIncrement ? "url(#glow)" : "none",
              }}
              className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-200 ease-in-out"
            />
            {showIncrement && (
              isCipherMode ? (
                <CipherIncrement symbol={tapSymbol} tapCount={tapCount} tapPosition={tapPosition} />
              ) : (
                <PointIncrement tapCount={tapCount} tapPosition={tapPosition} />
              )
            )}
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

// CipherIncrement Component
interface CipherIncrementProps {
  symbol: string | null;
  tapCount: number;
  tapPosition: { x: number; y: number };
}

function CipherIncrement({ symbol, tapPosition }: CipherIncrementProps) {
  return (
    <div
      className="absolute text-white text-7xl font-bold animate-fadeUp"
      style={{
        top: tapPosition.y,
        left: tapPosition.x,
        transform: "translate(-50%, -50%)",
      }}
    >
      {symbol}
    </div>
  );
}

// RewardCard Component
interface RewardCardProps {
  icon: StaticImageData;
  label: string;
  onClick?: () => void; // Optional click handler
}

function RewardCard({ icon, label, onClick }: RewardCardProps) {
  return (
    <div
      className="flex flex-col items-center cursor-pointer hover:opacity-75 border-gray-500 rounded-lg p-2 bg-gray-800 shadow-inner shadow-indigo-500"
      onClick={onClick}
    >
      <Image src={icon} width={50} height={50} alt={label} />
      <p className="text-white text-xs">{label}</p>
    </div>
  );
}
