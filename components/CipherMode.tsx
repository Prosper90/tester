import { useState } from "react";
import Image from "next/image";
import Coin from "../images/coin.png";
import OrbCipher from "../images/Allien Planets/Allien Planet 5.svg";
import Armadillo from "../images/Armadillo_2.svg";

// Morse code constants
const MORSE_CODE = "...- .- .-.. .. -.. .- - --- .-."; // Morse code for "VALIDATOR"
const TRANSLATION = "VALIDATOR";
const BONUS_POINTS = 2000;

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

interface CipherModeProps {
  userPoints: number;
  setUserPoints: (newPoints: number | ((prevPoints: number) => number)) => void;
  tapCount: number;
  handleTapClick: () => void;
}

export default function CipherMode({
  userPoints,
  setUserPoints,
  tapCount,
  handleTapClick,
}: CipherModeProps) {
  const [showIncrement, setShowIncrement] = useState(false);
  const [tapPosition, setTapPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [orbImage, setOrbImage] = useState(OrbCipher); // State for the orb image
  const [userInput, setUserInput] = useState<string>(""); // State to track user Morse code input
  const [displayText, setDisplayText] = useState<string>(""); // State to track the display text
  const [currentIndex, setCurrentIndex] = useState<number>(0); // State to track the current letter index
  const [tapSymbol, setTapSymbol] = useState<string | null>(null); // State to track the symbol

  // Handle tap for dot input
  const handleTap = (e: React.MouseEvent<HTMLImageElement>) => {
    handleTapClick();
    e.preventDefault(); // Prevent default action to avoid any unwanted behavior
    if (e.type === 'click') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setTapPosition({ x, y });

      const newSymbol = ".";
      setTapSymbol(newSymbol);
      updateUserInput(newSymbol);

      setShowIncrement(true);
      setTimeout(() => setShowIncrement(false), 500); // Ensure timeout matches animation duration
    }
  };

  // Handle mouse down to distinguish between left and right click
  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    if (e.button === 2) {
      // Right-click for dash
      e.preventDefault(); // Prevent default context menu
      handleLongPress();
    }
  };

  // Handle long press for dash input
  const handleLongPress = () => {
    const newSymbol = "-";
    setTapSymbol(newSymbol);
    updateUserInput(newSymbol);
  };

  // Update user input and check if it matches the Morse code for the current letter
  const updateUserInput = (newSymbol: string) => {
    const updatedInput = userInput + newSymbol; // Update the Morse code string
    setUserInput(updatedInput); // Update state with new input
    setShowIncrement(true);
    setTimeout(() => setShowIncrement(false), 500);

    const currentLetter = TRANSLATION[currentIndex]; // Get the current letter to match
    const currentLetterMorse = morseCodeMap[currentLetter]; // Get Morse code for the current letter

    if (updatedInput === currentLetterMorse) {
      // If input matches the Morse code for the current letter
      setDisplayText(displayText + currentLetter); // Update display text with the current letter
      setCurrentIndex(currentIndex + 1); // Move to the next letter
      setUserInput(""); // Reset user input for the next letter

      // If all letters are matched, award bonus points
      if (currentIndex + 1 === TRANSLATION.length) {
        setUserPoints((prevPoints) => prevPoints + BONUS_POINTS); // Add bonus points
        setCurrentIndex(0); // Reset for next round
        setDisplayText(""); // Clear display text
      }
    } else if (!currentLetterMorse.startsWith(updatedInput)) {
      // If the input does not match or is incorrect, reset input
      setUserInput(""); // Reset user input for the next attempt
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-full p-2 gap-4">
      <div className="flex items-center justify-center gap-2">
        <Image
          src={Coin}
          width={34}
          height={34}
          alt="Coin Icon"
          className="rounded-full"
        />
        <h5 className="text-white text-2xl">{userPoints}</h5>
      </div>
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
      <div className="relative">
        <Image
          src={orbImage}
          width={200}
          height={200}
          onClick={handleTap}
          onMouseDown={handleMouseDown} // Add mouse down handler to detect right click
          onContextMenu={(e) => e.preventDefault()} // Prevent context menu on right click
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
            filter:  "url(#glow)" ,
          }}
          className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-200 ease-in-out"
        />
        {showIncrement && (
          <CipherIncrement
            symbol={tapSymbol}
            tapCount={tapCount}
            tapPosition={tapPosition}
          />
        )}
      </div>
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
        top: `${tapPosition.y}px`,
        left: `${tapPosition.x}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {symbol}
    </div>
  );
}
