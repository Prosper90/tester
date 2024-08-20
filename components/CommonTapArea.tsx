"use client";

import Image, { StaticImageData } from "next/image";
import Central_tap from "../images/central_tap.png";
import Fire from "../icons/Power.svg";
import { useState } from "react";

// Define the prop types for CommonTapArea
interface CommonTapAreaProps {
  tapCount: number;
  energy: number;
  maxEnergy: number;
  handleTapClick: () => void;
}

export default function CommonTapArea({ tapCount, energy, maxEnergy, handleTapClick }: CommonTapAreaProps) {
  const [showIncrement, setShowIncrement] = useState(false);
  const [tapPosition, setTapPosition] = useState<{ x: number; y: number } | null>(null);

  const handleTap = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setTapPosition({ x, y });
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
            className={`transition duration-200 ease-in-out rounded-full ${showIncrement ? "ring-4 ring-indigo-600 central-glow" : ""}`}
          />
          {showIncrement && tapPosition && <PointIncrement tapCount={tapCount} position={tapPosition} />}
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

// Component for showing point increment at the tap position
interface PointIncrementProps {
  tapCount: number;
  position: { x: number; y: number };
}

function PointIncrement({ tapCount, position }: PointIncrementProps) {
  return (
    <div
      className="absolute animate-fadeUp text-white text-3xl font-bold"
      style={{ top: position.y, left: position.x, transform: 'translate(-50%, -100%)' }}
    >
      +{tapCount}
    </div>
  );
}
