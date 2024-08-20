"use client"; 

import Image from "next/image";
import AstroIcon from "../icons/Astro Circle.png";
import Coin from "../images/coin.png";
import Setting from "../icons/Gear.svg";

// Define the prop types
interface ProfitPerHourProps {
  pointsPerHour: number;
}

export default function ProfitPerHour({ pointsPerHour }: ProfitPerHourProps) {
  return (
    <div className="px-4 w-full">
      <div className="flex items-center justify-around rounded-full border border-zinc-500 bg-neutral-800 h-full p-2">
        <div className="w-1/3 flex items-center justify-center border-r-2 border-zinc-500">
          <Image src={AstroIcon} width={34} height={34} alt="Astro Icon" className="rounded-full" />
        </div>
        <div className="w-1/3 flex items-center justify-center border-r-2 border-zinc-500">
          <div className="flex flex-col">
            <h5 className="text-gray-400 text-xs">Profit per hour</h5>
            <div className="flex items-center justify-center gap-2">
              <Image src={Coin} width={20} height={20} alt="Coin Icon" className="rounded-full" />
              <h5 className="text-white text-sm">{pointsPerHour}</h5>
            </div>
          </div>
        </div>
        <div className="w-1/3 flex items-center justify-center">
          <Image src={Setting} width={24} height={24} alt="Settings Icon" className="rounded-full" />
        </div>
      </div>
    </div>
  );
}
