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
interface TappingAreaProps {
    userPoints: number;
    energy: number;
    maxEnergy: number;
    handleTapClick: () => void;
  }
  
  // Define the prop types for RewardCard
  interface RewardCardProps {
    icon: StaticImageData;  
    label: string;
  }

export default function TappingArea({ userPoints, energy, maxEnergy, handleTapClick }: TappingAreaProps) {
  return (
    <div className="my-10 w-full h-full bg-gray-950 rounded-t-[46px] border-t-2 border-indigo-600 top-glow">
      <div className="flex flex-col items-center justify-start h-full p-2 gap-4">
        <div className="flex items-center justify-center gap-2">
          <Image src={Coin} width={34} height={34} alt="Coin Icon" className="rounded-full" />
          <h5 className="text-white text-2xl">{userPoints}</h5>
        </div>
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
        <div className="flex gap-2 text-sm items-center justify-between w-full h-20">
          <RewardCard icon={Calender} label="Daily Reward" />
          <RewardCard icon={Lock} label="Daily Cipher" />
          <RewardCard icon={Combo} label="Daily Combo" />
        </div>
      </div>
    </div>
  );
}

function RewardCard({ icon, label }: RewardCardProps) {
  return (
    <div className="w-1/3 h-24 bg-neutral-800 flex flex-col items-start justify-around rounded-xl border border-gray-500 p-2 shadow-inner shadow-indigo-500">
      <Image src={icon} width={35} height={35} alt={label} />
      <h3 className="text-white">{label}</h3>
    </div>
  );
}
