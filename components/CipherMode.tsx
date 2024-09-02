import { useState, useEffect } from "react";
import Image from "next/image";
import Coin from "../images/coin.png";
import OrbCipher from "../images/Allien Planets/Allien Planet 5.svg";
import Armadillo from "../images/Armadillo_2.svg";

// List of cipher codes and their translations
const DAILY_CIPHERS = [
  { translation: "VALIDATOR", morse: "...- .- .-.. .. -.. .- - --- .-.", bonusPoints: 2000 },
  { translation: "CONSENSUS", morse: "-.-. --- -. ... . -. ... ..- ...", bonusPoints: 2000 },
  { translation: "BLOCKCHAIN", morse: "-... .-.. --- -.-. -.- -.-. .... .- .. -. ", bonusPoints: 2000 },
  { translation: "PROOFOFWORK", morse: ".--. .-. --- --- ..-. --- ..-. .-- --- .-. -.-", bonusPoints: 2000 },
  { translation: "HASH", morse: ".... .- ... ....", bonusPoints: 2000 },
  { translation: "ALGORITHM", morse: ".- .-.. --. --- .-. .. - .... --", bonusPoints: 2000 },
  { translation: "CORDIAL", morse: "-.-. --- .-. -.. .. .- .-..", bonusPoints: 2000 },
  { translation: "COIN", morse: "-.-. --- .. -. ", bonusPoints: 2000 },
  { translation: "UP", morse: "..- .--.", bonusPoints: 2000 },
  { translation: "CHAIN", morse: "-.-. .... .- .. -. ", bonusPoints: 2000 },
  { translation: "STACK", morse: "... - .- -.-. -.-", bonusPoints: 2000 },
  { translation: "HAVE", morse: ".... .- ...- .", bonusPoints: 2000 },
  { translation: "HASHL", morse: ".... .- ... .... .-..", bonusPoints: 2000 },
  { translation: "BLOCK", morse: "-... .-.. --- -.-. -.-", bonusPoints: 2000 },
  { translation: "PROOF", morse: ".--. .-. --- --- ..-.", bonusPoints: 2000 },
  { translation: "CRYPTO", morse: "-.-. .-. -.-- .--. - ---", bonusPoints: 2000 },
  { translation: "SCALE", morse: "... -.-. .- .-.. .", bonusPoints: 2000 },
  { translation: "UNITS", morse: "..- -. .. - ...", bonusPoints: 2000 }
];

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
  const [orbImage, setOrbImage] = useState(OrbCipher);
  const [userInput, setUserInput] = useState<string>("");
  const [displayText, setDisplayText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [tapSymbol, setTapSymbol] = useState<string | null>(null);

  // Determine the daily cipher based on the current date
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const dailyCipher = DAILY_CIPHERS[dayOfYear % DAILY_CIPHERS.length]; // Cycle through cipher codes

  const { translation, morse, bonusPoints } = dailyCipher;

  // Handle tap for dot input
  const handleTap = (e: React.MouseEvent<HTMLImageElement>) => {
    handleTapClick();
    e.preventDefault();
    if (e.type === 'click') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setTapPosition({ x, y });

      const newSymbol = ".";
      setTapSymbol(newSymbol);
      updateUserInput(newSymbol);

      setShowIncrement(true);
      setTimeout(() => setShowIncrement(false), 500);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    if (e.button === 2) {
      e.preventDefault();
      handleLongPress();
    }
  };

  const handleLongPress = () => {
    const newSymbol = "-";
    setTapSymbol(newSymbol);
    updateUserInput(newSymbol);
  };

  const updateUserInput = (newSymbol: string) => {
    const updatedInput = userInput + newSymbol;
    setUserInput(updatedInput);
    setShowIncrement(true);
    setTimeout(() => setShowIncrement(false), 500);

    const currentLetter = translation[currentIndex];
    const currentLetterMorse = morseCodeMap[currentLetter];

    if (updatedInput === currentLetterMorse) {
      setDisplayText(displayText + currentLetter);
      setCurrentIndex(currentIndex + 1);
      setUserInput("");

      if (currentIndex + 1 === translation.length) {
        setUserPoints((prevPoints) => prevPoints + bonusPoints);
        setCurrentIndex(0);
        setDisplayText("");
      }
    } else if (!currentLetterMorse.startsWith(updatedInput)) {
      setUserInput("");
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
        <p className="w-1/3 break-words">{displayText}</p>
        <button className="p-1 w-1/3 flex rounded-lg bg-gradient-to-r from-indigo-500 to-pink-600 gap-1 items-center justify-center">
          <Image
            src={Coin}
            width={20}
            height={20}
            alt="Coin Icon"
            className="rounded-full"
          />
          <h5 className="text-white text-sm">+{bonusPoints}</h5>
        </button>
      </div>
      <div className="relative">
        <Image
          src={orbImage}
          width={200}
          height={200}
          onClick={handleTap}
          onMouseDown={handleMouseDown}
          onContextMenu={(e) => e.preventDefault()}
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
            filter: "url(#glow)",
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

interface CipherIncrementProps {
  symbol: string | null;
  tapCount: number;
  tapPosition: { x: number; y: number };
}

function CipherIncrement({ symbol, tapCount, tapPosition }: CipherIncrementProps) {
  if (!symbol) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: tapPosition.y - 50,
        left: tapPosition.x - 10,
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold",
      }}
    >
      {symbol}
    </div>
  );
}

const morseCodeMap: { [key: string]: string } = {
  "A": ".-",
  "B": "-...",
  "C": "-.-.",
  "D": "-..",
  "E": ".",
  "F": "..-.",
  "G": "--.",
  "H": "....",
  "I": "..",
  "J": ".---",
  "K": "-.-",
  "L": ".-..",
  "M": "--",
  "N": "-.",
  "O": "---",
  "P": ".--.",
  "Q": "--.-",
  "R": ".-.",
  "S": "...",
  "T": "-",
  "U": "..-",
  "V": "...-",
  "W": ".--",
  "X": "-..-",
  "Y": "-.--",
  "Z": "--..",
};

