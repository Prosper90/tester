"use client";

import Image from "next/image";
import { useState } from "react";
import CoinIcon from "../images/Token.svg";
import Arrow from "../icons/Arrow.svg";
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
    userToken: string; // Added to pass the user's JWT token
}

export default function Boost({
    userBalance,
    setUserBalance,
    multitapLevel,
    energyLimitLevel,
    increaseTapCount,
    increaseMaxEnergy,
    setShowBoost,
    userToken, // Destructure userToken from props
}: BoostProps) {
    const calculatePrice = (basePrice: number, level: number) => {
        return Math.floor(basePrice * Math.pow(3.1, level));
    };

    const handleBuyMultitap = async () => {
        try {
            const response = await fetch('https://ggr-backend-production.up.railway.app/api/user/buyMultitapBoost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}` // Use userToken passed as prop
                }
            });

            const data = await response.json();
            if (response.ok) {
                setUserBalance(data.data.Amount); // Update balance from the backend response
                increaseTapCount(); // Update tap count or multitap level
            } else {
                alert(data.message || 'Failed to purchase boost');
            }
        } catch (error) {
            console.error('Error purchasing multitap boost:', error);
            alert('An error occurred while purchasing multitap boost.');
        }
    };

    const handleBuyEnergyLimit = async () => {
        try {
            const response = await fetch('https://ggr-backend-production.up.railway.app/api/user/buyEnergyLimitBoost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}` // Use userToken passed as prop
                }
            });

            const data = await response.json();
            if (response.ok) {
                setUserBalance(data.data.Amount); // Update balance from the backend response
                increaseMaxEnergy(); // Update max energy or energy limit level
            } else {
                alert(data.message || 'Failed to purchase boost');
            }
        } catch (error) {
            console.error('Error purchasing energy limit boost:', error);
            alert('An error occurred while purchasing energy limit boost.');
        }
    };

    const handleBackClick = () => {
        setShowBoost(false);
    };

    return (
        <div className="flex flex-col items-center justify-start h-full p-4 bg-gray-950 rounded-t-[46px] border-t-2 border-indigo-600 top-glow">
            <div className="flex items-center justify-between w-full">
                <button
                    onClick={handleBackClick}
                    aria-label="Go back"
                >
                    <Image src={Arrow} width={20} height={20} alt="Back" />
                </button>
                <div className="flex items-center justify-center gap-2">
                    <Image src={CoinIcon} width={24} height={24} alt="Coin" />
                    <h5 className="text-white text-2xl">{userBalance.toLocaleString()}</h5>
                </div>
            </div>
            <div className="mt-4 w-full">
                <h4 className="text-gray-400 mb-2">Free daily boosters</h4>
                <div className="flex items-center justify-start p-4 bg-neutral-800 rounded-xl border border-gray-500">
                    <Image src={FullEnergyIcon} width={30} height={30} alt="Full Energy Booster" />
                    <div className="flex flex-col ml-4">
                        <h4 className="text-white text-lg">Full Energy</h4>
                        <p className="text-gray-400 text-sm">6/6 available</p>
                    </div>
                </div>
            </div>
            <div className="mt-4 w-full">
                <h4 className="text-gray-400 mb-2">Boosters</h4>
                <div className="flex items-center justify-start p-4 bg-neutral-800 rounded-xl border border-gray-500 mb-2" onClick={handleBuyMultitap}>
                    <Image src={MultitapIcon} width={30} height={30} alt="Multitap Booster" />
                    <div className="flex flex-col ml-4">
                        <h4 className="text-white text-lg">Multitap</h4>
                        <p className="text-gray-400 flex gap-1 items-center text-sm">
                            <Image src={CoinIcon} width={15} height={15} alt="Coin" /> {calculatePrice(10, multitapLevel).toLocaleString()} Level {multitapLevel}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-start p-4 bg-neutral-800 rounded-xl border border-gray-500" onClick={handleBuyEnergyLimit}>
                    <Image src={EnergyLimitIcon} width={30} height={30} alt="Energy Limit Booster" />
                    <div className="flex flex-col ml-4">
                        <h4 className="text-white text-lg">Energy Limit</h4>
                        <p className="text-gray-400 flex gap-1 items-center text-sm">
                            <Image src={CoinIcon} width={15} height={15} alt="Coin" /> {calculatePrice(10, energyLimitLevel).toLocaleString()} Level {energyLimitLevel}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
