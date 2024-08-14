"use client";

import Image, { StaticImageData } from "next/image";
import Central_tap from "../images/central_tap.png";
import Fire from "../icons/fire.png";
import Boost from "../icons/Boost.png";
import Coin from "../images/coin.png";
import Calender from "../icons/Calender.png";
import Lock from "../icons/Lock.png";
import Combo from "../icons/Combo.png";
import { useState } from "react";



// Define the prop types for TappingArea
interface CommonTapAreaProps {
  tapCount: number;
  energy: number;
  maxEnergy: number;
  handleTapClick: () => void;
}

export default function CommonTapArea({ tapCount, energy, maxEnergy, handleTapClick }: CommonTapAreaProps) {

  const [showIncrement, setShowIncrement] = useState(false);
  const handleTap = () => {
    handleTapClick();
    setShowIncrement(true);
    setTimeout(() => setShowIncrement(false), 500); // hide after 500ms
  };
  
  return (
    <div className="mt-10 w-full h-full">
      <div className="flex flex-col items-center justify-start h-full p-2 gap-4">

        <div className="relative">
          <Image
            src={Central_tap}
            width={200}
            height={200}
            onClick={handleTap}
            alt="Central Tap"
            className={`transition duration-200 ease-in-out rounded-full ${showIncrement ? "ring-4 ring-indigo-600 top-glow" : ""
              }`}
          />
          {showIncrement && <PointIncrement tapCount={tapCount} />}
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center gap-1">
            <Image src={Fire} width={15} height={15} alt="Fire" />
            <h4 className="text-white text-lg">{energy}/{maxEnergy}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for showing point increment
interface PointIncrementProps {
  tapCount: number;
}

function PointIncrement({ tapCount }: PointIncrementProps) {  // Destructure tapCount here
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full animate-fadeUp text-gray-500 text-2xl font-bold">
      +{tapCount}
    </div>
  );
}
