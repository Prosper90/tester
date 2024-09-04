import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import Armadillo from "../images/Armadillo_2.svg";
import Orb from "../images/Allien Planets/Allien Planet 3.svg";
import Fire from "../icons/Power.svg";

// Define the prop types for CommonTapArea
interface CommonTapAreaProps {
  GalacticGoldRush: StaticImageData;
  tapCount: number;
  energy: number;
  maxEnergy: number;
  handleTapClick: () => void;
}

export default function CommonTapArea({ GalacticGoldRush, tapCount, energy, maxEnergy, handleTapClick }: CommonTapAreaProps) {
  const [showIncrement, setShowIncrement] = useState(false);
  const [tapPosition, setTapPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleTap = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTapPosition({ x, y });

    handleTapClick();
    setShowIncrement(true);
    setTimeout(() => setShowIncrement(false), 500); // hide after 500ms
  };

  return (
    <div className="w-full h-full">
      <svg style={{ display: "none" }}>
        <filter id="glow">
          <feGaussianBlur stdDeviation="15" operator="out" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>

      <div className="flex flex-col items-center justify-start h-full p-2 gap-4">
        <div className="relative">
          <Image
            src={Orb}
            width={200}
            height={200}
            onClick={handleTap}
            alt="Central Tap"
            className="transition duration-200 ease-in-out rounded-full"
          />
          <Image
            src={GalacticGoldRush}
            width={200}
            height={100}
            onClick={handleTap}
            alt="Armadillo"
            style={{
              filter: showIncrement ? "url(#glow)" : "none",
            }}
            className="h-full absolute top-1/2 transform -translate-y-1/2 transition duration-200 ease-in-out"
          />
          {showIncrement && <PointIncrement tapCount={tapCount} tapPosition={tapPosition} />}
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
  tapPosition: { x: number; y: number };
}

function PointIncrement({ tapCount, tapPosition }: PointIncrementProps) {
  return (
    <div
      className="absolute animate-fadeUp text-white text-3xl font-bold"
      style={{ top: tapPosition.y, left: tapPosition.x, transform: 'translate(-50%, -100%)' }}
    >
      +{tapCount}
    </div>
  );
}
