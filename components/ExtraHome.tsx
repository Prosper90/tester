'use client';

import Loading from "@/components/loading";
import Image from "next/image";
import { useState, useEffect } from "react";
import Icon from "../icons/icon.png";
import AstroIcon from "../icons/astro_icon.png";
import Coin from "../images/coin.png";
import Setting from "../icons/setting.png";
import Central_tap from "../images/central_tap.png"
import Fire from "../icons/fire.png"
import Boost from "../icons/Boost.png"
import Calender from "../icons/Calender.png"
import Lock from "../icons/Lock.png"
import Combo from "../icons/Combo.png"
import Exchange from "../icons/Exchange.png"
import Mine from "../icons/Mine.png"
import Friend from "../icons/Friends.png"
import Earn from "../icons/Earn.png"
import Airdrop from "../icons/AirDrop.png"
import ChestBox1 from "../images/ChestBox.png"
import ChestBox2 from "../images/chest_box.png"

export default function Home() {
  const levelNames = [
    "Bronze", "Silver", "Gold", "Platinum", "Diamond",
    "Epic", "Legendary", "Master", "GrandMaster", "Lord"
  ];

  const levelMinPoints = [
    0, 5000, 25000, 100000, 1000000,
    2000000, 10000000, 50000000, 100000000, 1000000000
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [levelIndex, setLevelIndex] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const [pointsPerHour, setpointsPerHour] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [maxEnergy, setMaxEnergy] = useState(1000);
  const [activeTab, setActiveTab] = useState<'exchange' | 'mine' | 'friends' | 'earn' | 'airdrop'>('exchange');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const currentLevel = levelMinPoints.findIndex((minPoints, index) =>
      userPoints >= minPoints && (index === levelMinPoints.length - 1 || userPoints < levelMinPoints[index + 1])
    );
    setLevelIndex(currentLevel);

    return () => clearTimeout(timer);
  }, [userPoints]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => {
        if (prevEnergy < maxEnergy) {
          return Math.min(prevEnergy + 3, maxEnergy);
        }
        return prevEnergy;
      });
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [maxEnergy]);

  const calculateProgress = () => {
    if (levelIndex >= levelNames.length - 1) return 100;
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    const progress = ((userPoints - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  const handleTapClick = () => {
    if (energy > 0) {
      setUserPoints(userPoints + 1);
      setEnergy(energy - 1);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <main className="bg-gradient-to-b from-black to-gray-950 h-screen w-full">
      {/* Navbar */}
      <div className="bottom-0 fixed w-full p-4">
        <div className="w-full bg-neutral-800 rounded-2xl">
          <div className="flex justify-around h-full p-4">
            <div onClick={() => setActiveTab('exchange')} className="flex w-1/5 flex-col items-center cursor-pointer gap-2">
              <Image
                src={Exchange}
                width={34}
                height={34}
                alt="Exchange Icon"
                className="rounded-full"
              />
              <span className="text-white text-xs">Exchange</span>
            </div>
            <div onClick={() => setActiveTab('mine')} className="flex w-1/5 flex-col items-center cursor-pointer gap-2">
              <Image
                src={Mine}
                width={34}
                height={34}
                alt="Mine Icon"
                className="rounded-full"
              />
              <span className="text-white text-xs">Mine</span>
            </div>
            <div onClick={() => setActiveTab('friends')} className="flex w-1/5 flex-col items-center cursor-pointer gap-2">
              <Image
                src={Friend}
                width={34}
                height={34}
                alt="Friends Icon"
                className="rounded-full"
              />
              <span className="text-white text-xs">Friends</span>
            </div>
            <div onClick={() => setActiveTab('earn')} className="flex w-1/5 flex-col items-center cursor-pointer gap-2">
              <Image
                src={Earn}
                width={34}
                height={34}
                alt="Earn Icon"
                className="rounded-full"
              />
              <span className="text-white text-xs">Earn</span>
            </div>
            <div onClick={() => setActiveTab('airdrop')} className="flex w-1/5 flex-col items-center cursor-pointer gap-2">
              <Image
                src={Airdrop}
                width={24}
                height={24}
                alt="Airdrop Icon"
                className="rounded-full"
              />
              <span className="text-white text-xs">Airdrop</span>
            </div>
          </div>
        </div>
      </div>
      {/* Other Pages */}
      {activeTab === 'exchange' && (
        <div className="flex flex-col gap-4 items-center justify-start h-screen pt-2">
          {/* Username & Level */}
          <div className="flex items-center justify-between w-full p-2">
            <div className="flex items-center justify-center gap-2 h-10">
              <Image
                src={Icon}
                width={34}
                height={34}
                alt="User Icon"
                className="h-full w-full rounded-xl"
              />
              <div className="flex flex-col justify-center">
                <h3 className="text-white text-sm">Username</h3>
                <h4 className="text-gray-400 font-bold text-sm">CEO</h4>
              </div>
            </div>
            <div className="flex items-center w-1/3">
              <div className="w-full">
                <div className="flex justify-between">
                  <p className="text-sm text-white">{levelNames[levelIndex]}</p>
                  <p className="text-sm text-white">
                    {levelIndex + 1} <span className="text-[#95908a]">/ {levelNames.length}</span>
                  </p>
                </div>
                <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                  <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                    <div
                      className="bg-gradient-to-r from-[#90ef89] via-[#d692dd] to-[#726edd] h-2 rounded-full"
                      style={{ width: `${calculateProgress()}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Profit per hour */}
          <div className="px-4 w-full">
            <div className="flex items-center justify-around rounded-full border border-zinc-500 bg-neutral-800 h-full p-2">
              <div className="w-1/3 flex items-center justify-center border-r-2 border-zinc-500">
                <Image
                  src={AstroIcon}
                  width={34}
                  height={34}
                  alt="Astro Icon"
                  className="rounded-full"
                />
              </div>
              <div className="w-1/3 flex items-center justify-center border-r-2 border-zinc-500">
                <div className="flex flex-col">
                  <h5 className="text-gray-400 text-xs">Profit per hour</h5>
                  <div className="flex items-center justify-center gap-2">
                    <Image
                      src={Coin}
                      width={20}
                      height={20}
                      alt="Coin Icon"
                      className="rounded-full"
                    />
                    <h5 className="text-white text-sm">{pointsPerHour}</h5>
                  </div>
                </div>
              </div>
              <div className="w-1/3 flex items-center justify-center">
                <Image
                  src={Setting}
                  width={24}
                  height={24}
                  alt="Settings Icon"
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
          {/* Tapping area */}
          <div className="pt-2 w-full h-full bg-gray-950 rounded-t-[46px] border-t-2 border-indigo-600 top-glow">
            <div className="flex flex-col items-center justify-start h-full p-2 gap-4">
              <div className="flex items-center justify-center gap-2">
                <Image
                  src={Coin}
                  width={34}
                  height={34}
                  alt="Coin Icon"
                  className="rounded-full"
                />
                <h5 className="text-white text-2xl">{userPoints}</h5>
              </div>
              <div>
                <Image
                  src={Central_tap}
                  width={200}
                  height={200}
                  onClick={handleTapClick}
                  alt="centraltap"
                />
              </div>
              {/* energy and boost */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1">
                  <Image
                    src={Fire}
                    width={15}
                    height={15}
                    alt="fire"
                  />
                  <h4 className="text-white text-lg">{energy}/{maxEnergy}</h4>
                </div>
                <div className="flex items-center">
                  <Image
                    src={Boost}
                    width={45}
                    height={45}
                    alt="fire"
                  />
                  <h4 className="text-white text-lg">Boost</h4>
                </div>
              </div>
              {/* daily rewards and games */}
              <div className="flex gap-2 items-center justify-between w-full h-20">
                <div className="w-1/3 h-24 bg-neutral-800 flex flex-col items-start justify-around rounded-xl border border-gray-500 p-2 shadow-inner shadow-indigo-500">
                  <Image
                    src={Calender}
                    width={35}
                    height={35}
                    alt="Calender"
                  />
                  <h3 className="text-white">Daily Reward</h3>
                </div>
                <div className="w-1/3 h-24 bg-neutral-800 flex flex-col items-start justify-around rounded-xl border border-gray-500 p-2 shadow-inner shadow-indigo-500">
                  <Image
                    src={Lock}
                    width={35}
                    height={35}
                    alt="Lock"
                  />
                  <h3 className="text-white text-sm">Daily Cipher</h3>
                </div>
                <div className="w-1/3 h-24 bg-neutral-800 flex flex-col items-start justify-around rounded-xl border border-gray-500 p-2 shadow-inner shadow-indigo-500">
                  <Image
                    src={Combo}
                    width={35}
                    height={35}
                    alt="Combo"
                  />
                  <h3 className="text-white text-sm">Daily Combo</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'mine' && (
        <div className="flex flex-col gap-4 items-center justify-start h-full pt-2">
          {/* Username & Level */}
          <div className="flex items-center justify-between w-full p-2">
            <div className="flex items-center justify-center gap-2 h-10">
              <Image
                src={Icon}
                width={34}
                height={34}
                alt="User Icon"
                className="h-full w-full rounded-xl"
              />
              <div className="flex flex-col justify-center">
                <h3 className="text-white text-sm">Username</h3>
                <h4 className="text-gray-400 font-bold text-sm">CEO</h4>
              </div>
            </div>
            <div className="flex items-center w-1/3">
              <div className="w-full">
                <div className="flex justify-between">
                  <p className="text-sm text-white">{levelNames[levelIndex]}</p>
                  <p className="text-sm text-white">
                    {levelIndex + 1} <span className="text-[#95908a]">/ {levelNames.length}</span>
                  </p>
                </div>
                <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                  <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                    <div
                      className="bg-gradient-to-r from-[#90ef89] via-[#d692dd] to-[#726edd] h-2 rounded-full"
                      style={{ width: `${calculateProgress()}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Profit per hour */}
          <div className="px-4 w-full">
            <div className="flex items-center justify-around rounded-full border border-zinc-500 bg-neutral-800 h-full p-2">
              <div className="w-1/3 flex items-center justify-center border-r-2 border-zinc-500">
                <Image
                  src={AstroIcon}
                  width={34}
                  height={34}
                  alt="Astro Icon"
                  className="rounded-full"
                />
              </div>
              <div className="w-1/3 flex items-center justify-center border-r-2 border-zinc-500">
                <div className="flex flex-col">
                  <h5 className="text-gray-400 text-xs">Profit per hour</h5>
                  <div className="flex items-center justify-center gap-2">
                    <Image
                      src={Coin}
                      width={20}
                      height={20}
                      alt="Coin Icon"
                      className="rounded-full"
                    />
                    <h5 className="text-white text-sm">{pointsPerHour}</h5>
                  </div>
                </div>
              </div>
              <div className="w-1/3 flex items-center justify-center">
                <Image
                  src={Setting}
                  width={24}
                  height={24}
                  alt="Settings Icon"
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
          {/* Daily Combo */}
          <div className="pt-2 w-full bg-gray-950 rounded-t-[46px] border-t-2 border-indigo-600 top-glow">
            <div className="w-full p-4">
              <div className="bg-neutral-800 p-2 rounded-xl flex flex-col gap-4 items-center">
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-white">Daily Combo</h3>
                  <button className="p-2 flex rounded-lg bg-gradient-to-r from-indigo-500 to-pink-600 gap-1 items-center justify-center">
                    <Image
                      src={Coin}
                      width={20}
                      height={20}
                      alt="Coin Icon"
                      className="rounded-full"
                    />
                    <h5 className="text-white text-sm">+2,000,000</h5>
                  </button>
                </div>
                <div className="flex justify-between gap-1 w-full">
                  <div className="w-1/3 h-24 bg-neutral-700 flex flex-col items-center justify-around rounded-xl border border-gray-500 p-2 shadow-inner shadow-indigo-500">
                    <Image
                      src={ChestBox1}
                      width={90}
                      height={90}
                      alt="Calender"
                    />
                  </div>
                  <div className="w-1/3 h-24 bg-neutral-700 flex flex-col items-center justify-around rounded-xl border border-gray-500 p-2 shadow-inner shadow-indigo-500">
                    <Image
                      src={ChestBox1}
                      width={90}
                      height={90}
                      alt="Lock"
                    />
                  </div>
                  <div className="w-1/3 h-24 bg-neutral-700 flex flex-col items-center justify-around rounded-xl border border-gray-500 p-2 shadow-inner shadow-indigo-500">
                    <Image
                      src={ChestBox2}
                      width={70}
                      height={70}
                      alt="Combo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* balance */}
          <div className="flex mt-4 items-center justify-center gap-2">
            <Image
              src={Coin}
              width={34}
              height={34}
              alt="Coin Icon"
              className="rounded-full"
            />
            <h5 className="text-white text-2xl">{userPoints}</h5>
          </div>
        </div>
      )}
      {activeTab === 'friends' && (
        <div className="pt-2 w-full bg-gray-950 rounded-t-[46px] border-t-2 border-indigo-600 top-glow">
          <div className="flex flex-col items-center justify-between h-full p-2 gap-4">
            <h2 className="text-white text-2xl">Friends Page Content</h2>
            {/* Your Friends page content goes here */}
          </div>
        </div>
      )}
      {activeTab === 'earn' && (
        <div className="pt-2 w-full bg-gray-950 rounded-t-[46px] border-t-2 border-indigo-600 top-glow">
          <div className="flex flex-col items-center justify-between h-full p-2 gap-4">
            <h2 className="text-white text-2xl">Earn Page Content</h2>
            {/* Your Earn page content goes here */}
          </div>
        </div>
      )}
      {activeTab === 'airdrop' && (
        <div className="pt-2 w-full bg-gray-950 rounded-t-[46px] border-t-2 border-indigo-600 top-glow">
          <div className="flex flex-col items-center justify-between h-full p-2 gap-4">
            <h2 className="text-white text-2xl">Airdrop Page Content</h2>
            {/* Your Airdrop page content goes here */}
          </div>
        </div>
      )}
    </main>
  );
}
