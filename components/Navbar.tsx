"use client"; 

import Image, { StaticImageData } from "next/image";
import ExchangeGrey from "../icons/Menue Icons/Token Grey.svg";
import MineGrey from "../icons/Menue Icons/Mine Grey.svg";
import FriendGrey from "../icons/Menue Icons/Friends Grey.svg";
import EarnGrey from "../icons/Menue Icons/Earn Grey.svg";
import AirdropGrey from "../icons/Menue Icons/Airdrop Grey.svg";
import ExchangeWhite from "../icons/Menue Icons/Token White.svg";
import MineWhite from "../icons/Menue Icons/Mine White.svg";
import FriendWhite from "../icons/Menue Icons/Friends White.svg";
import EarnWhite from "../icons/Menue Icons/Earn White.svg";
import AirdropWhite from "../icons/Menue Icons/Airdrop White.svg";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface TabItemProps {
  greyIcon: StaticImageData;  
  whiteIcon: StaticImageData;
  label: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <div className="bottom-0 fixed w-full p-4">
      <div className="w-full bg-neutral-900 border border-black rounded-2xl">
        <div className="flex justify-around h-full p-4">
          <TabItem greyIcon={ExchangeGrey} whiteIcon={ExchangeWhite} label="Protocol Lab" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabItem greyIcon={MineGrey} whiteIcon={MineWhite} label="Mine" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabItem greyIcon={FriendGrey} whiteIcon={FriendWhite} label="Friends" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabItem greyIcon={EarnGrey} whiteIcon={EarnWhite} label="Earn" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabItem greyIcon={AirdropGrey} whiteIcon={AirdropWhite} label="Airdrop" activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </div>
  );
}

function TabItem({ greyIcon, whiteIcon, label, activeTab, setActiveTab }: TabItemProps) {
  const isActive = activeTab === label.toLowerCase();
  const icon = isActive ? whiteIcon : greyIcon;

  return (
    <div onClick={() => setActiveTab(label.toLowerCase())} className="flex w-1/5 flex-col items-center cursor-pointer gap-2">
      <Image src={icon} width={30} height={24} alt={`${label} Icon`} className="h-8" />
      <span className={`text-xs ${isActive ? "text-white" : "text-gray-400"}`}>{label}</span>
    </div>
  );
}
