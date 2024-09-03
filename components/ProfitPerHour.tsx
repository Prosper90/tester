"use client"; 

import Image, { StaticImageData } from "next/image";
import Coin from "../images/coin.png";
import SettingIcon from "../icons/Gear.svg";
import { useState } from "react";
import Setting from "./Setting";
import AvalancheIcon from "../images/Blockchains/Avalanche.svg"; // Default icon or one of your choice

// Define the prop types
interface ProfitPerHourProps {
  pointsPerHour: number;
}

export default function ProfitPerHour({ pointsPerHour }: ProfitPerHourProps) {
  const [showSettingPage, setShowSettingPage] = useState(false);
  const [selectedExchanger, setSelectedExchanger] = useState<string>("Avalanche");
  const [selectedExchangerIcon, setSelectedExchangerIcon] = useState<string | StaticImageData>(AvalancheIcon);

  const handleSettingClick = () => {
    setShowSettingPage(true);
  };
  
  const handleClose = () => {
    setShowSettingPage(false);
  };

  const handleExchangerChange = (name: string, icon: StaticImageData) => {
    setSelectedExchanger(name);
    setSelectedExchangerIcon(icon);
    setShowSettingPage(false);
  };

  return (
    <div className="px-4 w-full">
      <div className="flex items-center justify-around rounded-full border border-zinc-500 bg-neutral-800 h-full p-2">
        <div className="w-1/3 flex items-center justify-center border-r-2 border-zinc-500">
          <Image src={selectedExchangerIcon} width={34} height={34} alt="Exchanger Icon" className="rounded-full" />
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
          <Image src={SettingIcon} width={24} height={24} alt="Settings Icon" className="rounded-full cursor-pointer" onClick={handleSettingClick} />
        </div>
      </div>
      {showSettingPage && (
        <Setting
          onClose={handleClose}
          onExchangerChange={handleExchangerChange}
          selectedExchanger={selectedExchanger}  // Pass down the selected exchanger
        />
      )}
    </div>
  );
}
