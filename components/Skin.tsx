import React, { useState } from "react";
import Arrow from "../icons/Arrow.png";
import Image, { StaticImageData } from "next/image";
import Bronze1 from "../images/Skins/Bronze/Bronze_0001.png";
import Bronze2 from "../images/Skins/Bronze/Bronze_0002.png";
import Bronze3 from "../images/Skins/Bronze/Bronze_0003.png";
import Bronze4 from "../images/Skins/Bronze/Bronze_0004.png";
import Bronze5 from "../images/Skins/Bronze/Bronze_0005.png";
import Silver1 from "../images/Skins/Silver/Silver_0001.png";
import Silver2 from "../images/Skins/Silver/Silver_0002.png";
import Silver3 from "../images/Skins/Silver/Silver_0003.png";
import Silver4 from "../images/Skins/Silver/Silver_0004.png";
import Silver5 from "../images/Skins/Silver/Silver_0005.png";
import Gold1 from "../images/Skins/Gold/Gold_0001.png";
import Gold2 from "../images/Skins/Gold/Gold_0002.png";
import Gold3 from "../images/Skins/Gold/Gold_0003.png";
import Gold4 from "../images/Skins/Gold/Gold_0004.png";
import Gold5 from "../images/Skins/Gold/Gold_0005.png";
import UserInfo from "./UserInfo";

interface SkinProps {
  userName: string;
  levelIndex: number;
  levelNames: string[];
  calculateProgress: () => number;
  onClose: () => void;
}

const skinImages: StaticImageData[] = [
  Bronze1, Bronze2, Bronze3, Bronze4, Bronze5,
  Silver1, Silver2, Silver3, Silver4, Silver5,
  Gold1, Gold2, Gold3, Gold4, Gold5,
];

const Skin: React.FC<SkinProps> = ({ userName, levelIndex, levelNames, calculateProgress, onClose }) => {
  const [selectedSkin, setSelectedSkin] = useState<StaticImageData>(Bronze1);

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      {/* Header Section */}
      <div className="flex flex-row items-center justify-between w-full px-4 py-4">
        <button onClick={onClose} className="p-2">
          <Image src={Arrow} width={20} height={20} alt="arrow" />
        </button>
        <h3 className="text-white text-2xl text-center flex-1">Profile</h3>
      </div>

      <UserInfo
        levelIndex={levelIndex}
        userName={userName}
        levelNames={levelNames}
        calculateProgress={calculateProgress}
      />

      <h3 className="text-white text-2xl text-center flex-1">Skins</h3>

      <div className="flex flex-row w-full h-full overflow-hidden">
        {/* Fixed Left Display Area */}
        <div className="w-1/2 flex items-center justify-center bg-black">
          <Image src={selectedSkin} width={200} height={200} alt="Selected Skin" />
        </div>

        {/* Scrollable Right Side */}
        <div className="w-1/2 h-full overflow-y-auto p-4">
          <div className="flex flex-wrap items-center justify-center gap-1">
            {skinImages.map((skin, index) => (
              <div
                key={index}
                className="bg-zinc-700 p-2 rounded-lg cursor-pointer"
                onClick={() => setSelectedSkin(skin)}
              >
                <Image src={skin} width={50} height={40} alt={`Skin ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skin;
