"use client"; 

import Image, {StaticImageData} from "next/image";
import Central_tap from "../images/central_tap.png";
import Fire from "../icons/fire.png";
import Boost from "../icons/Boost.png";
import Coin from "../images/coin.png";
import Calender from "../icons/Calender.png";
import Lock from "../icons/Lock.png";
import Combo from "../icons/Combo.png";



// Define the prop types for TappingArea
interface CommonTapAreaProps {
    energy: number;
    maxEnergy: number;
    handleTapClick: () => void;
  }

export default function CommonTapArea({energy, maxEnergy, handleTapClick }: CommonTapAreaProps) {
  return (
    <div className="mt-10 w-full h-full">
      <div className="flex flex-col items-center justify-start h-full p-2 gap-4">
        
        <div>
          <Image src={Central_tap} width={200} height={200} onClick={handleTapClick} alt="Central Tap" />
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <Image src={Fire} width={15} height={15} alt="Fire" />
            <h4 className="text-white text-lg">{energy}/{maxEnergy}</h4>
          </div>
          <div className="flex items-center">
            <Image src={Boost} width={45} height={45} alt="Boost" />
            <h4 className="text-white text-lg">Boost</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
