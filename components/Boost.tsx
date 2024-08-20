"use client";

import Image from "next/image";
import { useState } from "react";
import CoinIcon from "../images/coin.png";
import Arrow from "../icons/Arrow.png";
import MultitapIcon from "../icons/Multi Tap.svg";
import EnergyLimitIcon from "../icons/Battery.svg";
import FullEnergyIcon from "../icons/Power.svg";

interface BoostProps {
    userBalance: number;
    setUserBalance: (newBalance: number) => void;
    multitapLevel: number;
    energyLimitLevel: number;
    increaseTapCount: () => void;
    increaseMaxEnergy: () => void;
    setShowBoost: (show: boolean) => void; 
}

export default function Boost({
    userBalance,
    setUserBalance,
    multitapLevel,
    energyLimitLevel,
    increaseTapCount,
    increaseMaxEnergy,
    setShowBoost,
}: BoostProps) {
    const calculatePrice = (basePrice: number, level: number) => {
        return Math.floor(basePrice * Math.pow(3.1, level));
    };

    const handleBuyMultitap = () => {
        const price = calculatePrice(10, multitapLevel);
        if (userBalance >= price) {
            setUserBalance(userBalance - price);
            increaseTapCount();
        }
    };

    const handleBuyEnergyLimit = () => {
        const price = calculatePrice(10, energyLimitLevel);
        if (userBalance >= price) {
            setUserBalance(userBalance - price);
            increaseMaxEnergy();
        }
    };

    const handleBackClick = () => {
        setShowBoost(false); 
    };

    return (
        <div className="flex flex-col items-center justify-start h-full p-4 bg-gray-950 rounded-t-[46px] border-t-2 border-indigo-600 top-glow">
            <div className="flex items-center justify-between w-full">
                <button
                    className="bg-neutral-600 text-white px-2 py-2 rounded-full"
                    onClick={handleBackClick}
                >
                    <Image src={Arrow} width={10} height={10} alt="arrow Icon" />
                </button>
                <div className="flex items-center justify-center gap-2">
                    <Image src={CoinIcon} width={24} height={24} alt="Coin Icon" />
                    <h5 className="text-white text-2xl">{userBalance.toLocaleString()}</h5>
                </div>
            </div>
            <div className="mt-4 w-full">
                <h4 className="text-gray-400 mb-2">Free daily boosters</h4>
                <div className="flex items-center justify-start p-4 bg-neutral-800 rounded-xl border border-gray-500">
                    <Image src={FullEnergyIcon} width={30} height={30} alt="Full Energy" />
                    <div className="flex flex-col ml-4">
                        <h4 className="text-white text-lg">Full Energy</h4>
                        <p className="text-gray-400 text-sm">6/6 available</p>
                    </div>
                </div>
            </div>
            <div className="mt-4 w-full">
                <h4 className="text-gray-400 mb-2">Boosters</h4>
                <div className="flex items-center justify-start p-4 bg-neutral-800 rounded-xl border border-gray-500 mb-2" onClick={handleBuyMultitap}>
                    <Image src={MultitapIcon} width={30} height={30} alt="Multitap" />
                    <div className="flex flex-col ml-4">
                        <h4 className="text-white text-lg">Multitap</h4>
                        <p className="text-gray-400 text-sm">
                            {`Level: ${multitapLevel} - Price: ${calculatePrice(10, multitapLevel).toLocaleString()} coins`}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-start p-4 bg-neutral-800 rounded-xl border border-gray-500" onClick={handleBuyEnergyLimit}>
                    <Image src={EnergyLimitIcon} width={30} height={30} alt="Energy Limit" />
                    <div className="flex flex-col ml-4">
                        <h4 className="text-white text-lg">Energy Limit</h4>
                        <p className="text-gray-400 text-sm">
                            {`Level: ${energyLimitLevel} - Price: ${calculatePrice(10, energyLimitLevel).toLocaleString()} coins`}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}