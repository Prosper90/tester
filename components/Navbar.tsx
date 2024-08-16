"use client"; 

import Image, { StaticImageData } from "next/image";
import Exchange from "../icons/Menue Icons/Token Grey.svg";
import Mine from "../icons/Menue Icons/Mine Grey.svg";
import Friend from "../icons/Menue Icons/Friends Grey.svg";
import Earn from "../icons/Menue Icons/Earn Grey.svg";
import Airdrop from "../icons/Menue Icons/Airdrop Grey.svg";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface TabItemProps {
  icon: StaticImageData;  
  label: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <div className="bottom-0 fixed w-full p-4">
      <div className="w-full bg-neutral-900 border border-black rounded-2xl">
        <div className="flex justify-around h-full p-4">
          <TabItem icon={Exchange} label="Exchange" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabItem icon={Mine} label="Mine" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabItem icon={Friend} label="Friends" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabItem icon={Earn} label="Earn" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabItem icon={Airdrop} label="Airdrop" activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </div>
  );
}

function TabItem({ icon, label, activeTab, setActiveTab }: TabItemProps) {
  return (
    <div onClick={() => setActiveTab(label.toLowerCase())} className="flex w-1/5 flex-col items-center cursor-pointer gap-2">
      <Image src={icon} width={30} height={24} alt={`${label} Icon`} className="rounded-full h-8" />
      <span className={`text-xs ${activeTab === label.toLowerCase() ? "text-white" : "text-gray-400"}`}>{label}</span>
    </div>
  );
}
