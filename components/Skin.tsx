import React, { useState, useEffect } from "react";
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
  GalacticGoldRush: StaticImageData; // Default image for the game
  levelIndex: number; // Current user level index: 0 for Bronze, 1 for Silver, 2 for Gold
  levelNames: string[];
  calculateProgress: () => number;
  userPoints: number;
  setUserPoints: (newPoints: number | ((prevPoints: number) => number)) => void;
  setGalacticGoldRush: (newSkin: StaticImageData) => void; // Setter to update the global skin
  onClose: () => void;
}

interface SkinImages {
  Bronze: StaticImageData[];
  Silver: StaticImageData[];
  Gold: StaticImageData[];
}

const skinPrices: { [key: string]: number } = {
  Bronze1: 0, // Default skin is free
  Bronze2: 100,
  Bronze3: 100,
  Bronze4: 100,
  Bronze5: 100,
  Silver1: 200,
  Silver2: 200,
  Silver3: 200,
  Silver4: 200,
  Silver5: 200,
  Gold1: 300,
  Gold2: 300,
  Gold3: 300,
  Gold4: 300,
  Gold5: 300,
};

const skinImages: SkinImages = {
  Bronze: [Bronze1, Bronze2, Bronze3, Bronze4, Bronze5],
  Silver: [Silver1, Silver2, Silver3, Silver4, Silver5],
  Gold: [Gold1, Gold2, Gold3, Gold4, Gold5],
};

const Skin: React.FC<SkinProps> = ({
  GalacticGoldRush,
  setGalacticGoldRush,
  userName,
  setUserPoints,
  levelIndex,
  levelNames,
  calculateProgress,
  userPoints,
  onClose,
}) => {
  const [selectedSkin, setSelectedSkin] = useState<StaticImageData>(GalacticGoldRush);
  const [purchasedSkins, setPurchasedSkins] = useState<{ [key: string]: number[] }>(
    JSON.parse(localStorage.getItem("purchasedSkins") || "{}")
  );

  useEffect(() => {
    // Sync with localStorage to ensure data persists across sessions
    localStorage.setItem("purchasedSkins", JSON.stringify(purchasedSkins));
  }, [purchasedSkins]);

  const isSkinLocked = (skin: StaticImageData): boolean => {
    if (skin === GalacticGoldRush) return false;

    const skinLevel = Object.keys(skinImages).find((level) => skinImages[level as keyof SkinImages].includes(skin)) as keyof SkinImages;
    const index = skinImages[skinLevel].indexOf(skin);

    return levelNames.indexOf(skinLevel) > levelIndex || !isSkinUnlocked(skinLevel, index);
  };

  const isSkinUnlocked = (skinLevel: keyof SkinImages, index: number): boolean => {
    return purchasedSkins[skinLevel]?.includes(index) ?? false;
  };

  const purchaseSkin = (skin: StaticImageData): void => {
    const skinLevel = Object.keys(skinImages).find((level) => skinImages[level as keyof SkinImages].includes(skin)) as keyof SkinImages;
    const index = skinImages[skinLevel].indexOf(skin);
    const skinKey = `${skinLevel}${index + 1}`;

    if (userPoints >= skinPrices[skinKey]) {
      const updatedPurchasedSkins = {
        ...purchasedSkins,
        [skinLevel]: [...(purchasedSkins[skinLevel] || []), index],
      };
      setPurchasedSkins(updatedPurchasedSkins);
      setUserPoints(userPoints - skinPrices[skinKey]);
    } else {
      alert("Not enough points to purchase this skin.");
    }
  };

  const chooseSkin = () => {
    setGalacticGoldRush(selectedSkin);
    onClose();
  };

  const getSkinPrice = (skin: StaticImageData): number => {
    if (skin === GalacticGoldRush) return 0;
    const skinLevel = Object.keys(skinImages).find((level) => skinImages[level as keyof SkinImages].includes(skin)) as keyof SkinImages;
    const index = skinImages[skinLevel].indexOf(skin);
    const skinKey = `${skinLevel}${index + 1}`;
    return skinPrices[skinKey];
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50 overflow-auto">
      {/* Header with Close Button */}
      <div className="flex flex-row items-center justify-between w-full px-4 py-4">
        <button onClick={onClose} className="p-2">
          <Image src={Arrow} width={20} height={20} alt="arrow" />
        </button>
        <h3 className="text-white text-2xl text-center flex-1">Profile</h3>
      </div>

      {/* User Info */}
      <UserInfo
        GalacticGoldRush={GalacticGoldRush}
        setGalacticGoldRush={setGalacticGoldRush}
        userName={userName}
        levelIndex={levelIndex}
        userPoints={userPoints}
        setUserPoints={setUserPoints}
        levelNames={levelNames}
        calculateProgress={calculateProgress}
      />

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Selected Skin Display */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-gray-800">
          <Image src={selectedSkin} width={200} height={200} alt="Selected Skin" />
          {/* Show Price or Choose Button */}
          {!isSkinLocked(selectedSkin) ? (
            <button onClick={chooseSkin} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
              Choose
            </button>
          ) : (
            <div className="text-white mt-4">
              <p>Price: {getSkinPrice(selectedSkin)} Points</p>
              <button
                onClick={() => purchaseSkin(selectedSkin)}
                className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
              >
                Purchase for {getSkinPrice(selectedSkin)} Points
              </button>
            </div>
          )}
        </div>

        {/* Skins List */}
        <div className="w-1/2 p-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(skinImages).map(([skinLevel, skins]) =>
              skins.map((skin: StaticImageData, index: number) => (
                <div
                  key={`${skinLevel}-${index}`}
                  className={`relative bg-gray-700 p-2 rounded-lg cursor-pointer ${
                    selectedSkin === skin ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => !isSkinLocked(skin) && setSelectedSkin(skin)}
                >
                  <Image src={skin} width={50} height={50} alt={`Skin ${index + 1}`} />
                  {levelNames.indexOf(skinLevel) > levelIndex ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <Image src={Lock} width={50} height={50} alt="Locked Level" />
                    </div>
                  ) : isSkinLocked(skin) ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <Image src={Lock} width={20} height={20} alt="Locked" />
                    </div>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skin;
