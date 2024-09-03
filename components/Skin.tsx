import React, { useState, useEffect } from "react";
import Arrow from "../icons/Arrow.png";
import Image, { StaticImageData } from "next/image";
import Default from "../images/Armadillo_2.svg";
import AstroGirl_Normal_1 from "../images/Skins/AstroGirl_SVG/AstroGirl_Normal_1.svg";
import AstroGirl_Normal_2 from "../images/Skins/AstroGirl_SVG/AstroGirl_Normal_2.svg";
import AstroGirl_Normal_3 from "../images/Skins/AstroGirl_SVG/AstroGirl_Normal_3.svg";
import AstroGirl_Normal_4 from "../images/Skins/AstroGirl_SVG/AstroGirl_Normal_4.svg";
import AstroGirl_Normal_5 from "../images/Skins/AstroGirl_SVG/AstroGirl_Normal_5.svg";
import Panda_Normal_1 from "../images/Skins/Panda_SVG/Panda_Normal_1.svg";
import Panda_Normal_2 from "../images/Skins/Panda_SVG/Panda_Normal_2.svg";
import Panda_Normal_3 from "../images/Skins/Panda_SVG/Panda_Normal_3.svg";
import Panda_Normal_4 from "../images/Skins/Panda_SVG/Panda_Normal_4.svg";
import Panda_Normal_5 from "../images/Skins/Panda_SVG/Panda_Normal_5.svg";
import Anne_Normal_1 from "../images/Skins/Anne_SVG/Anne_Normal_1.svg";
import Anne_Normal_2 from "../images/Skins/Anne_SVG/Anne_Normal_2.svg";
import Anne_Normal_3 from "../images/Skins/Anne_SVG/Anne_Normal_3.svg";
import Anne_Normal_4 from "../images/Skins/Anne_SVG/Anne_Normal_4.svg";
import Anne_Normal_5 from "../images/Skins/Anne_SVG/Anne_Normal_5.svg";
import SPF_Normal_1 from "../images/Skins/SPF_SVG/SPF_Normal_1.svg";
import SPF_Normal_2 from "../images/Skins/SPF_SVG/SPF_Normal_2.svg";
import SPF_Normal_3 from "../images/Skins/SPF_SVG/SPF_Normal_3.svg";
import SPF_Normal_4 from "../images/Skins/SPF_SVG/SPF_Normal_4.svg";
import SPF_Normal_5 from "../images/Skins/SPF_SVG/SPF_Normal_5.svg";
import Lock from "../icons/Lock.svg";
import UserInfo from "./UserInfo";

type SkinName = "Default" | "AstroGirl_Normal_1" | "AstroGirl_Normal_2" | "AstroGirl_Normal_3" | "AstroGirl_Normal_4" | "AstroGirl_Normal_5" | "Panda_Normal_1" | "Panda_Normal_2" | "Panda_Normal_3" | "Panda_Normal_4" | "Panda_Normal_5" | "Anne_Normal_1" | "Anne_Normal_2" | "Anne_Normal_3" | "Anne_Normal_4" | "Anne_Normal_5" | "SPF_Normal_1" | "SPF_Normal_2" | "SPF_Normal_3" | "SPF_Normal_4" | "SPF_Normal_5";

interface SkinProps {
  GalacticGoldRush: StaticImageData;
  setGalacticGoldRush: (newSkin: StaticImageData) => void;
  userPoints: number;
  setUserPoints: (newPoints: number | ((prevPoints: number) => number)) => void;
  userName: string;
  levelIndex: number;
  levelNames: string[];
  levelIcons: StaticImageData[];
  calculateProgress: () => number;
  onClose: () => void;
}

interface SkinImages {
  [tier: string]: StaticImageData[];
}

const skinPrices: { [key in SkinName]: number } = {
  Default: 0,
  AstroGirl_Normal_1: 100,
  AstroGirl_Normal_2: 200,
  AstroGirl_Normal_3: 300,
  AstroGirl_Normal_4: 400,
  AstroGirl_Normal_5: 500,
  Panda_Normal_1: 100,
  Panda_Normal_2: 200,
  Panda_Normal_3: 300,
  Panda_Normal_4: 400,
  Panda_Normal_5: 500,
  Anne_Normal_1: 100,
  Anne_Normal_2: 200,
  Anne_Normal_3: 300,
  Anne_Normal_4: 400,
  Anne_Normal_5: 500,
  SPF_Normal_1: 100,
  SPF_Normal_2: 200,
  SPF_Normal_3: 300,
  SPF_Normal_4: 400,
  SPF_Normal_5: 500,
};

const skinImages: SkinImages = {
  AstroGirl_Normal: [AstroGirl_Normal_1, AstroGirl_Normal_2, AstroGirl_Normal_3, AstroGirl_Normal_4, AstroGirl_Normal_5],
  Panda_Normal: [Panda_Normal_1, Panda_Normal_2, Panda_Normal_3, Panda_Normal_4, Panda_Normal_5],
  Anne_Normal: [Anne_Normal_1, Anne_Normal_2, Anne_Normal_3, Anne_Normal_4, Anne_Normal_5],
  SPF_Normal: [SPF_Normal_1, SPF_Normal_2, SPF_Normal_3, SPF_Normal_4, SPF_Normal_5],
};

const Skin: React.FC<SkinProps> = ({
  GalacticGoldRush,
  setGalacticGoldRush,
  userName,
  setUserPoints,
  userPoints,
  levelIndex,
  levelNames,
  levelIcons,
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
    } else if (pendingPurchase) {
      alert("You do not have enough points to purchase this skin.");
    }
  };

  const handleConfirmPurchase = () => {
    if (pendingPurchase && userPoints >= skinPrices[pendingPurchase]) {
      setUserPoints(prev => prev - skinPrices[pendingPurchase]);
      setOwnedSkins(prev => new Set([...Array.from(prev), pendingPurchase])); // Convert Set to Array
      setGalacticGoldRush(selectedSkin);
      setPendingPurchase(null);
      setShowPopup(false);
    }
  };

  const handleCancelPurchase = () => {
    setShowPopup(false);
  };

  const isActiveSkin = selectedSkin === GalacticGoldRush;

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50 overflow-auto">
      <div className="flex flex-row items-center justify-between w-full px-4 py-4">
        <button onClick={onClose} className="p-2">
          <Image src={Arrow} width={20} height={20} alt="arrow" />
        </button>
        <h3 className="text-white text-2xl text-center flex-1">Skins</h3>
        <button className="p-2 text-white">All</button>
      </div>

      <div className="flex flex-1">
        {/* Left Sidebar for Skins Menu */}
        <div className="w-1/2 flex flex-col items-start justify-start bg-gray-900 p-4">
          <button className="text-white text-center mb-4">Skin</button>
          {/* Display Selected Skin */}
          <div className="flex flex-col items-center">
            <Image src={selectedSkin} width={200} height={200} alt="Selected Skin" />
            <div className="text-center bg-gray-800 p-2 rounded-lg text-white mt-4">
              <h4 className="text-lg font-bold">Anne</h4>
              <p className="text-xs text-justify">
                Anne, the trusted programmer and mechanic, is a dependable problem-solver with a heart of gold.
                Her practical approach ensures the spaceship runs smoothly, and her loyalty to Astro shines through in her unwavering support during tough situations.
              </p>
              <p className="text-xl font-bold mt-2">
                <span role="img" aria-label="coin">🪙</span> 1,000
              </p>
            </div>
            <button
              onClick={pendingPurchase ? handlePurchase : () => setGalacticGoldRush(selectedSkin)}
              className="mt-4 px-6 py-2 rounded-full bg-purple-500 text-white"
              disabled={isActiveSkin}
            >
              {pendingPurchase ? "Buy" : "Choose"}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-1/2 flex flex-col items-center justify-start p-4">
          <button className="text-white">All</button>
          {/* List of Skins */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {Object.entries(skinImages).map(([tier, skins]) =>
              skins.map((skin: StaticImageData, index: number) => {
                const skinName = `${tier}_${index + 1}` as SkinName; // Ensure consistent format
                const price = skinPrices[skinName];
                const isOwned = ownedSkins.has(skinName);

                return (
                  <div
                    key={skinName}
                    className={`relative bg-gray-700 p-2 rounded-lg cursor-pointer ${
                      isOwned ? "border-2 border-blue-500" : "border-2 border-gray-500"
                    }`}
                    onClick={() => handleSkinSelect(skin, skinName, price)}
                  >
                    <Image src={skin} width={50} height={100} alt={skinName} />
                    {!isOwned && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <Image src={Lock} width={10} height={10} alt="Locked" />
                      </div>
                    )}
                    {isActiveSkin && <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full p-1">✓</div>}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-neutral-800 border-t-2 border-amber-600 p-6 rounded-t-[46px] top-glow">
            <h2 className="text-purple-500 font-bold text-center text-2xl mb-4">Confirm Purchase</h2>
            <p className="text-white mb-4">
              Are you sure you want to purchase this skin for {skinPrices[pendingPurchase!]} Points?
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleConfirmPurchase}
                className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-4 py-2 rounded-full"
              >
                Yes
              </button>
              <button
                onClick={handleCancelPurchase}
                className="bg-gray-600 px-4 py-2 rounded-full text-white"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skin;
