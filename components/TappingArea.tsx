import { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import Orb from "../images/Allien Planets/Allien Planet 3.svg";
import OrbCipher from "../images/Allien Planets/Allien Planet 5.svg";
import Fire from "../icons/Power.svg";
import Boost1 from "../icons/Rocket.svg";
import Coin from "../images/Token.svg";
import Star from "../icons/Star 1.svg";
import Diamond from "../icons/Star 2.svg";
import Clock from "../icons/Satr3.svg";
import Boost from "./Boost";
import PointIncrement from "./PointIncrement";
import DailyRewardPopup from "./DailyReward"; // Import the DailyRewardPopup component

interface TappingAreaProps {
  userPoints: number;
  setUserPoints: (newPoints: number | ((prevPoints: number) => number)) => void;
  tapCount: number;
  GalacticGoldRush: StaticImageData;
  energy: number;
  maxEnergy: number;
  multitapLevel: number;
  energyLimitLevel: number;
  increaseTapCount: () => void;
  increaseMaxEnergy: () => void;
  handleTapClick: () => void;
  setActiveTab: (tabName: string) => void;
  userToken: string;
}

const BONUS_POINTS = 2000;
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
// List of cipher codes for each day
const cipherCodes = [
  "VALIDATOR",
  "CONSENSUS",
  "BLOCKCHAIN",
  "PROOFOFWORK",
  "HASH",
  "ALGORITHM",
  "CORDIAL",
  "COIN",
  "UP",
  "CHAIN",
  "STACK",
  "HAVE",
  "HASHL",
  "BLOCK",
  "PROOF",
  "CRYPTO",
  "SCALE",
  "UNITS"
];

// Determine the current day's cipher code
const getCurrentTranslation = () => {
  const currentDate = new Date();
  const startOfEpoch = new Date(currentDate.getFullYear(), 0, 0); // Start of the year
  const dayOfYear = Math.floor((currentDate.getTime() - startOfEpoch.getTime()) / (1000 * 60 * 60 * 24));
  return cipherCodes[dayOfYear % cipherCodes.length];
};

// Morse code map for letters and digits
const morseCodeMap: { [key: string]: string } = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----."
};

export default function TappingArea({
  GalacticGoldRush,
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
  userToken,
}: TappingAreaProps) {
  const [showBoost, setShowBoost] = useState(false);
  const [showIncrement, setShowIncrement] = useState(false);
  const [showDailyReward, setShowDailyReward] = useState(false); // State to control Daily Reward Popup visibility
  const [tapPosition, setTapPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isCipherMode, setIsCipherMode] = useState(false); // State to track cipher mode
  const [tapSymbol, setTapSymbol] = useState<string | null>(null); // State to track the symbol
  const [userInput, setUserInput] = useState<string>(""); // State to track user Morse code input
  const [displayText, setDisplayText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastCompletionTime, setLastCompletionTime] = useState<number | null>(null);
  const [canUseCipher, setCanUseCipher] = useState<boolean>(true); // State to control cipher mode usage
  // Calculate the current cipher translation
  const [currentTranslation, setCurrentTranslation] = useState<string>(getCurrentTranslation());

  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Retrieve the last completion time from local storage on component mount
    const storedTime = localStorage.getItem("lastCompletionTime");
    if (storedTime) {
      setLastCompletionTime(parseInt(storedTime));
      checkCipherAvailability(parseInt(storedTime));
    }

    // Cleanup on component unmount
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, []);

  const checkCipherAvailability = (storedTime: number) => {
    const currentTime = Date.now();
    if (currentTime - storedTime < ONE_DAY_IN_MS) {
      setCanUseCipher(false); // Disable cipher mode if 24 hours haven't passed
    } else {
      setCanUseCipher(true); // Enable cipher mode after 24 hours
    }
  };

  const handleBoostClick = () => {
    setShowBoost(true);
  };

  const handleDailyRewardClick = () => {
    setShowDailyReward(true); // Show the Daily Reward Popup
  };

  const closeDailyRewardPopup = () => {
    setShowDailyReward(false); // Close the Daily Reward Popup
  };

  // Handle tap or long press
  const handleTap = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTapPosition({ x, y });

    if (isCipherMode && canUseCipher) {
      handleTapClick();
      const newSymbol = ".";
      setTapSymbol(newSymbol);
      updateUserInput(newSymbol); // Use function to update input and handle logic
    
    } else if (!isCipherMode) {
      handleTapClick();
      setShowIncrement(true);
      setTimeout(() => setShowIncrement(false), 500);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    
    longPressTimer.current = setTimeout(() => {
      handleLongPress();
    }, 500); // Trigger long press after 2 seconds
    
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    
    longPressTimer.current = setTimeout(() => {
      handleLongPress();
    }, 500); // Trigger long press after 2 seconds
    
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  // Handle long press for dash
  const handleLongPress = () => {
    if (isCipherMode && canUseCipher) {
      handleTapClick();
      const newSymbol = "-";
      setTapSymbol(newSymbol);
      updateUserInput(newSymbol); // Use function to update input and handle logic
      
    // Add console log for debugging
    console.log("Long press detected!");
    }
  };

  // Update user input and check if it matches the Morse code for the current letter
  const updateUserInput = (newSymbol: string) => {
    const updatedInput = userInput + newSymbol; // Update the Morse code string
    setUserInput(updatedInput); // Update state with new input
    setShowIncrement(true);
    setTimeout(() => setShowIncrement(false), 500);

    const currentLetter = currentTranslation[currentIndex]; // Get the current letter to match
    const currentLetterMorse = morseCodeMap[currentLetter]; // Get Morse code for the current letter

    if (updatedInput === currentLetterMorse) {
      // If input matches the Morse code for the current letter
      setDisplayText((prev) => prev + currentLetter); // Update display text with the current letter
      setCurrentIndex((prev) => prev + 1); // Move to the next letter
      setUserInput(""); // Reset user input for the next letter

      // If all letters are matched, award bonus points
      if (currentIndex + 1 === currentTranslation.length) {
        setUserPoints((prevPoints) => prevPoints + BONUS_POINTS); // Add bonus points
        const completionTime = Date.now();
        localStorage.setItem("lastCompletionTime", completionTime.toString());
        setLastCompletionTime(completionTime);
        setCanUseCipher(false); // Disable cipher mode until 24 hours pass
        setCurrentIndex(0); // Reset for next round
        setDisplayText(""); // Clear display text
        setIsCipherMode(false); // Automatically switch back to normal mode
      }
    } else if (!currentLetterMorse.startsWith(updatedInput)) {
      // If the input does not match or is incorrect, reset input
      setUserInput(""); // Reset user input for the next attempt
    }
  };

  const handleDailyCipherClick = () => {
    if (canUseCipher) {
      setIsCipherMode((prev) => !prev); // Toggle cipher mode
    }
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
            <Image src={Coin} width={40} height={40} alt="Coin Icon" className="rounded-full" />
            <h5 className="text-white text-4xl">{userPoints}</h5>
          </div>
          {isCipherMode && (
            <div className="morse-code-input w-full flex items-center justify-between bg-gray-800 p-2 rounded-md text-white">
              <p className="font-bold w-1/3">Daily cipher</p>
              <p className="w-1/3 break-words">{displayText}</p> {/* Display matched letters */}
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
              src={isCipherMode ? OrbCipher : Orb} // Use the selected orb image based on the mode
              width={200}
              height={200}
              onClick={handleTap}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseLeave={handleMouseUp} // Clear the timer if the mouse leaves the element
              onContextMenu={(e) => e.preventDefault()}
              alt="Central Tap"
              className="transition duration-200 ease-in-out rounded-full"
            />
            <Image
              src={GalacticGoldRush}
              width={120}
              height={50}
              onClick={handleTap}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseLeave={handleMouseUp} // Clear the timer if the mouse leaves the element
              onContextMenu={(e) => e.preventDefault()}
              alt="Armadillo"
              style={{
                filter: showIncrement ? "url(#glow)" : "none",
              }}
              className="h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-200 ease-in-out"
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
          <div className="flex gap-2 text-sm items-center justify-evenly w-full h-20">
            <RewardCard icon={Star} label="Daily Reward" onClick={handleDailyRewardClick} /> {/* Show Daily Reward Popup on click */}
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
          userToken={userToken} 
        />
      )}

      {/* Show the Daily Reward Popup if showDailyReward is true */}
      {showDailyReward && <DailyRewardPopup userPoints={userPoints} setUserPoints={setUserPoints} onClose={closeDailyRewardPopup} />}
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
