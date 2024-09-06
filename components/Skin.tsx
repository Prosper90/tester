import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Arrow from "../icons/Arrow.svg";
import Default from "../images/Skins/Armadillo_1.svg";
import AstroGirl_Normal_1 from "../images/Skins/AstroGirl_Normal_2.svg";
import Panda_Normal_1 from "../images/Skins/Panda_Normal_4.svg";
import Anne_Normal_1 from "../images/Skins/Anne_Normal_1.svg";
import SPF_Normal_1 from "../images/Skins/SPF_Normal_4.svg";
import Kayopo_Hunter_Normal from "../images/Skins/Red_Hunter_Normal_3.svg";
import Lock from "../icons/Lock.svg";
import Coin from "../images/Token.svg";

type SkinName = 
  | "Default"
  | "AstroGirl_Normal_1"
  | "Panda_Normal_1"
  | "Anne_Normal_1"
  | "SPF_Normal_1"
  | "Kayopo_Hunter_Normal";

interface SkinInfo {
  image: StaticImageData;
  title: string;
  subtitle: string;
  description: string;
  price: number;
}

interface SkinProps {
  GalacticGoldRush: StaticImageData;
  setGalacticGoldRush: (newSkin: StaticImageData) => void;
  userPoints: number;
  setUserPoints: (newPoints: number | ((prevPoints: number) => number)) => void;
  userToken: string;
  onClose: () => void;
}

const skinsData: { [key in SkinName]: SkinInfo } = {
  Default: {
    image: Default,
    title: "Astro Armadillo",
    subtitle: "The Tech-Savvy Adventurer",
    description:
      "Astro Armadillo is your go-to tech guru with a tough shell and a heart full of curiosity. Armed with clever gadgets and a sharp mind, he embarks on epic intergalactic adventures, solving cosmic puzzles and teaching valuable lessons about teamwork and friendship. His friendly, determined nature makes him a fan-favorite hero, showing that even the smallest creatures can make a big impact across the galaxy.",
    price: 0,
  },
  AstroGirl_Normal_1: {
    image: AstroGirl_Normal_1,
    title: "Astro Girl",
    subtitle: "The Sophisticated Navigator",
    description:
      "Astro Girl is a Celestara lavish planet's savvy and charming local, deeply knowledgeable about its newfound wealth. With her wit and charisma, she guides Astro through this strange new world, becoming an essential ally in unraveling the planet’s crypto mysteries. Astro Girl is more than just a sidekick; she’s a vital part of the adventure.",
    price: 8000,
  },
  Anne_Normal_1: {
    image: Anne_Normal_1,
    title: "Anne",
    subtitle: "The Loyal Mechanic",
    description:
      "Anne is the dependable and no-nonsense programmer and mechanic on Astro’s team. With a heart of gold and a knack for problem-solving, she keeps the spaceship running smoothly and is always ready with valuable insights when things get tough. Anne’s unwavering loyalty to Astro makes her the backbone of the team, especially in the most challenging situations.",
    price: 10000,
  },
  SPF_Normal_1: {
    image: SPF_Normal_1,
    title: "Scam Prankman Fried (SPF)",
    subtitle: "The Flamboyant Villain",
    description:
      "SPF is the eccentric and flashy CEO behind a new exchange, embodying greed and chaos. This flamboyant pig, with his wild style and insatiable thirst for wealth, is the mastermind of the crypto rug-pull scheme causing havoc on the planet. SPF’s larger-than-life personality and cunning nature make him a memorable and menacing antagonist.",
    price: 15000,
  },
  Kayopo_Hunter_Normal: {
    image: Kayopo_Hunter_Normal,
    title: "Kayopo Hunter",
    subtitle: "The Tribal Guardian",
    description:
      "The Kayopo Hunter is a skilled warrior from the Mẽbêngôkre, known as the Kayapó, deeply connected to the Amazon and Cerrado regions. Master hunters and navigators, they protect their land with a deep sense of tradition and honor. Adorned in intricate body paint that reflects their cultural heritage, the Kayopo Hunter stands as a powerful symbol of strength and guardianship in the game.",
    price: 25000,
  },
  Panda_Normal_1: {
    image: Panda_Normal_1,
    title: "Pink Panda",
    subtitle: "The Tough Leader",
    description:
      "Pink Panda is the enigmatic leader of an underground resistance, channeling serious mafia don vibes. Rugged and intimidating in his pink spacesuit, he rules his hidden tech base with a mix of charm and menace. With a smirk and a toothpick, Pink Panda speaks in riddles and offers help—but always at a price. Beneath his tough exterior lies a strategic mind committed to shaping the galaxy’s future with the NextGen Chain.",
    price: 50000,
  },
};

const Skin: React.FC<SkinProps> = ({
  GalacticGoldRush,
  setGalacticGoldRush,
  setUserPoints,
  userPoints,
  userToken,
  onClose,
}) => {
  const [selectedSkin, setSelectedSkin] = useState<SkinName>("Default");
  const [ownedSkins, setOwnedSkins] = useState<Set<SkinName>>(new Set<SkinName>(["Default"]));
  const [pendingPurchase, setPendingPurchase] = useState<SkinName | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const savedSkinName = localStorage.getItem("selectedSkinName");
    const savedOwnedSkins = localStorage.getItem("ownedSkins");

    if (savedSkinName) setSelectedSkin(savedSkinName as SkinName);
    if (savedOwnedSkins) setOwnedSkins(new Set(JSON.parse(savedOwnedSkins)));
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedSkinName", selectedSkin);
    localStorage.setItem("ownedSkins", JSON.stringify(Array.from(ownedSkins)));
  }, [selectedSkin, ownedSkins]);

  const handleSkinSelect = (skinName: SkinName) => {
    setSelectedSkin(skinName);
    setPendingPurchase(ownedSkins.has(skinName) ? null : skinName);
  };

  const handlePurchase = async () => {
    if (pendingPurchase && userPoints >= skinsData[pendingPurchase].price) {
      try {
        const response = await fetch("/api/user/purchaseSkin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            skinName: pendingPurchase,
            price: skinsData[pendingPurchase].price,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setUserPoints(data.remainingPoints);
          setOwnedSkins(new Set(data.ownedSkins));
          setGalacticGoldRush(skinsData[pendingPurchase].image);
          setPendingPurchase(null);
          setShowPopup(false);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error purchasing skin:", error);
      }
    } else if (pendingPurchase) {
      alert("You do not have enough points to purchase this skin.");
    }
  };

  const handleCancelPurchase = () => setShowPopup(false);

  const isActiveSkin = skinsData[selectedSkin].image === GalacticGoldRush;

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50 overflow-auto">
      <button onClick={onClose} className="mt-2 relative">
        <Image src={Arrow} width={20} height={20} alt="arrow" className="absolute ml-2 mt-2" />
        <h3 className="text-white text-2xl text-center flex-1">Skins</h3>
      </button>

      <div className="flex flex-1 bg-neutral-800 rounded-t-[46px]">
        <div className="w-1/2 flex flex-col items-start justify-start">
          <div className="flex flex-col items-center justify-center">
            <Image src={skinsData[selectedSkin].image} width={200} height={200} alt="Selected Skin" className="p-2" />
            <div className="bg-zinc-700 text-center p-2 mx-2 rounded-lg text-white mt-4">
              <h4 className="text-sm font-bold pb-2">{skinsData[selectedSkin].title}</h4>
              <p className="text-xs font-semibold">{skinsData[selectedSkin].subtitle}</p>
              <p className="text-xs mt-2">{skinsData[selectedSkin].description}</p>
              <p className="flex items-center justify-center gap-2 text-xl font-bold mt-2">
                <Image src={Coin} width={24} height={24} alt="Coin Icon" />
                {skinsData[selectedSkin].price.toLocaleString()}
              </p>
              <button
                onClick={pendingPurchase ? handlePurchase : () => setGalacticGoldRush(skinsData[selectedSkin].image)}
                className={`mt-4 px-6 py-2 rounded text-white ${
                  isActiveSkin ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-purple-500"
                }`}
                disabled={isActiveSkin}
              >
                {pendingPurchase ? "Buy" : "Choose"}
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col items-center justify-start">
          <div className="grid grid-cols-2 gap-2 mt-6">
            {Object.keys(skinsData).map((skinName) => {
              const isOwned = ownedSkins.has(skinName as SkinName);
              const isSkinActive = skinsData[skinName as SkinName].image === GalacticGoldRush;
              return (
                <div
                  key={skinName}
                  className={`relative bg-zinc-700 py-2 gap-2 flex flex-col items-center justify-center rounded-xl cursor-pointer ${
                    isOwned ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => handleSkinSelect(skinName as SkinName)}
                >
                  <Image src={skinsData[skinName as SkinName].image} width={100} height={100} alt={skinName} />
                  <h4 className="text-xs text-center">{skinsData[skinName as SkinName].title}</h4>
                  {!isOwned && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black bg-opacity-50">
                      <Image src={Lock} width={20} height={20} alt="Locked" />
                    </div>
                  )}
                  {isSkinActive && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full p-1">✓</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-neutral-800 border-t-2 border-amber-600 p-6 rounded-t-[46px] top-glow">
            <h2 className="text-purple-500 font-bold text-center text-2xl mb-4">Confirm Purchase</h2>
            <p className="text-white mb-4">
              Are you sure you want to purchase this skin for {skinsData[pendingPurchase!].price.toLocaleString()} Points?
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={handlePurchase}
                className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={handleCancelPurchase}
                className="bg-gray-600 px-4 py-2 rounded text-white"
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
