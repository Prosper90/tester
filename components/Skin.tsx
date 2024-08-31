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
import Default from "../images/Armadillo_2.svg";
import Lock from "../icons/Lock.svg";
import UserInfo from "./UserInfo";

type SkinName = "Default" | "Bronze1" | "Bronze2" | "Bronze3" | "Bronze4" | "Bronze5" | "Silver1" | "Silver2" | "Silver3" | "Silver4" | "Silver5" | "Gold1" | "Gold2" | "Gold3" | "Gold4" | "Gold5";

interface SkinProps {
  GalacticGoldRush: StaticImageData;
  setGalacticGoldRush: (newSkin: StaticImageData) => void;
  userPoints: number;
  setUserPoints: (newPoints: number | ((prevPoints: number) => number)) => void;
  userName: string;
  levelIndex: number;
  levelNames: string[];
  calculateProgress: () => number;
  onClose: () => void;
}

interface SkinImages {
  [tier: string]: StaticImageData[];
}

const skinPrices: { [key in SkinName]: number } = {
  Default: 0,
  Bronze1: 100,
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
  userPoints,
  levelIndex,
  levelNames,
  calculateProgress,
  onClose,
}) => {
  const [selectedSkin, setSelectedSkin] = useState<StaticImageData>(GalacticGoldRush);
  const [ownedSkins, setOwnedSkins] = useState<Set<SkinName>>(new Set<SkinName>(["Default"]));
  const [pendingPurchase, setPendingPurchase] = useState<SkinName | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const savedSkin = localStorage.getItem('selectedSkin');
    if (savedSkin) {
      setSelectedSkin(JSON.parse(savedSkin));
    }

    const savedOwnedSkins = localStorage.getItem('ownedSkins');
    if (savedOwnedSkins) {
      setOwnedSkins(new Set(JSON.parse(savedOwnedSkins)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedSkin', JSON.stringify(selectedSkin));
    localStorage.setItem('ownedSkins', JSON.stringify(Array.from(ownedSkins)));
  }, [selectedSkin, ownedSkins]);

  const handleSkinSelect = (skin: StaticImageData, skinName: SkinName, price: number) => {
    setSelectedSkin(skin);
    setPendingPurchase(ownedSkins.has(skinName) ? null : skinName);
  };

  const handlePurchase = () => {
    if (pendingPurchase && userPoints >= skinPrices[pendingPurchase]) {
      setShowPopup(true);
    } else {
      alert("You do not have enough points to purchase this skin.");
    }
  };

  const handleConfirmPurchase = () => {
    if (pendingPurchase) {
      setUserPoints(prev => prev - skinPrices[pendingPurchase]);
      setOwnedSkins(prev => new Set(prev).add(pendingPurchase));
      setGalacticGoldRush(selectedSkin);
      setPendingPurchase(null);
      setShowPopup(false);
    }
  };

  const handleCancelPurchase = () => {
    setShowPopup(false);
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50 overflow-auto">
      <div className="flex flex-row items-center justify-between w-full px-4 py-4">
        <button onClick={onClose} className="p-2">
          <Image src={Arrow} width={20} height={20} alt="arrow" />
        </button>
        <h3 className="text-white text-2xl text-center flex-1">Profile</h3>
      </div>

      <UserInfo
        GalacticGoldRush={GalacticGoldRush}
        setGalacticGoldRush={setGalacticGoldRush}
        levelIndex={levelIndex}
        userPoints={userPoints}
        setUserPoints={setUserPoints}
        userName={userName}
        levelNames={levelNames}
        calculateProgress={calculateProgress}
      />

      <div className="flex flex-1">
        <div className="w-1/2 flex flex-col items-center justify-center bg-gray-800">
          <Image src={selectedSkin} width={200} height={200} alt="Selected Skin" />
          <button
            onClick={pendingPurchase ? handlePurchase : () => setGalacticGoldRush(selectedSkin)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            disabled={!pendingPurchase && selectedSkin === Default}
          >
            {pendingPurchase ? (ownedSkins.has(pendingPurchase) ? "Choose" : `Purchase for ${skinPrices[pendingPurchase]} Points`) : "Choose"}
          </button>
        </div>

        <div className="w-1/2 p-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(skinImages).map(([tier, skins]) =>
              skins.map((skin: StaticImageData, index: number) => {
                const skinName = `${tier}${index + 1}` as SkinName;
                const price = skinPrices[skinName];
                const isOwned = ownedSkins.has(skinName);

                return (
                  <div
                    key={skinName}
                    className={`relative bg-gray-700 p-2 rounded-lg cursor-pointer ${
                      isOwned ? "border-2 border-blue-500" : "border-2 border-red-500"
                    }`}
                    onClick={() => handleSkinSelect(skin, skinName, price)}
                  >
                    <Image src={skin} width={50} height={50} alt={skinName} />
                    {!isOwned && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <Image src={Lock} width={20} height={20} alt="Locked" />
                        <p className="text-white">{price} Points</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-500 p-6 rounded-lg text-center">
            <h2 className="text-lg mb-4">Confirm Purchase</h2>
            <p className="mb-4 ">Are you sure you want to purchase this skin?</p>
            <button onClick={handleConfirmPurchase} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
              Confirm
            </button>
            <button onClick={handleCancelPurchase} className="px-4 py-2 bg-red-500 text-white rounded">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skin;
