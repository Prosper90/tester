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
import Lock from "../icons/Lock.svg";
import UserInfo from "./UserInfo";

interface SkinProps {
  userName: string;
  levelIndex: number;
  levelNames: string[];
  calculateProgress: () => number;
  userPoints: number;
  onClose: () => void;
}

interface SkinImages {
  Bronze: StaticImageData[];
  Silver: StaticImageData[];
  Gold: StaticImageData[];
}

const skinPrices: number[] = [0, 100, 100, 100, 100]; // First skin free, others cost 100 points

const skinImages: SkinImages = {
  Bronze: [Bronze1, Bronze2, Bronze3, Bronze4, Bronze5],
  Silver: [Silver1, Silver2, Silver3, Silver4, Silver5],
  Gold: [Gold1, Gold2, Gold3, Gold4, Gold5],
};

const Skin: React.FC<SkinProps> = ({
  userName,
  levelIndex,
  levelNames,
  calculateProgress,
  userPoints,
  onClose,
}) => {
  const [selectedSkin, setSelectedSkin] = useState<StaticImageData | null>(null);
  const [points, setPoints] = useState<number>(userPoints);
  const [purchasedSkins, setPurchasedSkins] = useState<{
    [key: string]: number[];
  }>(JSON.parse(localStorage.getItem("purchasedSkins") || "{}"));

  const isSkinLocked = (skinLevel: string, index: number): boolean => {
    const skinLevelIndex = levelNames.indexOf(skinLevel);
    return (
      skinLevelIndex > levelIndex ||
      (index > 0 && !isSkinUnlocked(skinLevel, index))
    );
  };

  const isSkinUnlocked = (skinLevel: string, index: number): boolean => {
    return purchasedSkins[skinLevel]?.includes(index);
  };

  const purchaseSkin = (skinLevel: string, index: number) => {
    if (points >= skinPrices[index]) {
      const updatedPurchasedSkins = { ...purchasedSkins };
      if (!updatedPurchasedSkins[skinLevel]) updatedPurchasedSkins[skinLevel] = [];
      updatedPurchasedSkins[skinLevel].push(index);
      setPurchasedSkins(updatedPurchasedSkins);
      localStorage.setItem("purchasedSkins", JSON.stringify(updatedPurchasedSkins));
      setPoints(points - skinPrices[index]);
    } else {
      alert("Not enough points to purchase this skin.");
    }
  };

  const renderSkinBox = (skin: StaticImageData, skinLevel: string, index: number) => {
    const skinLevelIndex = levelNames.indexOf(skinLevel);

    if (skinLevelIndex > levelIndex) {
      return (
        <div
          key={`${skinLevel}-${index}`}
          className="relative bg-zinc-700 p-2 rounded-lg"
        >
          <div className="flex items-center justify-center h-full">
            <Image src={Lock} width={50} height={50} alt="Locked" />
          </div>
          <div className="absolute top-1 right-1 text-xs text-white bg-black px-2 py-1 rounded">
            Level {skinLevelIndex + 1} Required
          </div>
        </div>
      );
    }

    return (
      <div
        key={`${skinLevel}-${index}`}
        className="relative bg-zinc-700 p-2 rounded-lg cursor-pointer"
        onClick={() => {
          if (!isSkinLocked(skinLevel, index)) {
            setSelectedSkin(skin);
          } else if (index > 0 && !isSkinUnlocked(skinLevel, index)) {
            purchaseSkin(skinLevel, index);
          }
        }}
      >
        <Image src={skin} width={50} height={40} alt={`Skin ${skinLevel} ${index + 1}`} />
        {skinPrices[index] > 0 && (
          <div className="absolute bottom-1 right-1 text-xs text-white bg-black px-2 py-1 rounded">
            {skinPrices[index]} Points
          </div>
        )}
        {isSkinLocked(skinLevel, index) && (
          <div className="absolute top-0 right-0 p-1">
            <Image src={Lock} width={15} height={15} alt="Locked" />
          </div>
        )}
      </div>
    );
  };

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
        userPoints={userPoints}
        userName={userName}
        levelNames={levelNames}
        calculateProgress={calculateProgress}
      />

      <h3 className="text-white text-2xl text-center flex-1">Skins</h3>

      <div className="flex flex-row w-full h-full overflow-hidden">
        {/* Fixed Left Display Area */}
        <div className="w-1/2 flex items-center justify-center bg-black relative">
          {selectedSkin ? (
            <Image src={selectedSkin} width={200} height={200} alt="Selected Skin" />
          ) : (
            <div className="text-white text-center">Select a Skin</div>
          )}
          {selectedSkin && isSkinLocked(
            Object.keys(skinImages)[levelIndex] as keyof typeof skinImages,
            skinImages[Object.keys(skinImages)[levelIndex] as keyof typeof skinImages].indexOf(selectedSkin)
          ) && (
            <div className="absolute top-0 right-0 p-1">
              <Image src={Lock} width={20} height={20} alt="Locked" />
            </div>
          )}
        </div>

        {/* Scrollable Right Side */}
        <div className="w-1/2 h-full overflow-y-auto p-4">
          <div className="flex flex-wrap items-center justify-center gap-1">
            {Object.keys(skinImages).map((skinLevel) =>
              skinImages[skinLevel as keyof typeof skinImages].map((skin, index) =>
                renderSkinBox(skin, skinLevel, index)
              )
            )}
          </div>
        </div>
      </div>

      {/* Purchase Button */}
      {selectedSkin && isSkinLocked(
        Object.keys(skinImages)[levelIndex] as keyof typeof skinImages,
        skinImages[Object.keys(skinImages)[levelIndex] as keyof typeof skinImages].indexOf(selectedSkin)
      ) && (
        <div className="flex items-center justify-center bg-black p-4">
          <button
            onClick={() =>
              purchaseSkin(
                Object.keys(skinImages)[levelIndex] as keyof typeof skinImages,
                skinImages[Object.keys(skinImages)[levelIndex] as keyof typeof skinImages].indexOf(selectedSkin)
              )
            }
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Purchase for {skinPrices[
              skinImages[Object.keys(skinImages)[levelIndex] as keyof typeof skinImages].indexOf(selectedSkin)
            ]} Points
          </button>
        </div>
      )}
    </div>
  );
};

export default Skin;
