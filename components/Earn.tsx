"use client";

import Image from "next/image";
import Coin from "../images/coin.png";
import Stargating from "../images/Stargating Logo V5.png";
import Crypto_Space from "../images/Crypto Space Logo.png";
import Armadillos_Adventures from "../images/Armadillos_Adventures_2.png";
import TG from "../icons/Telegram.svg";
import X from "../icons/X.svg";

interface EarnProps {
    userPoints: number;
    setUserPoints: (newPoints: number | ((prevPoints: number) => number)) => void;
}

export default function Earn({ userPoints, setUserPoints }: EarnProps) {
    // Function to handle point addition
    const handleAddPoints = (points: number) => {
        setUserPoints(prevPoints => prevPoints + points);
    };

    return (
        <div className="my-4 friends_background">
            <h3 className="text-white text-3xl text-center font-semibold">Earn more coins</h3>
            <h4 className="text-white text-base text-center mt-2">Complete the task and earn more coins!</h4>

            {/* Astro Armadillos Adventures */}
            <h4 className="text-white text-base text-left mt-4">Astro Armadillos Adventures</h4>
            <div className="flex flex-wrap gap-2 w-full mt-4">
                <a href="https://example.com/astro1" onClick={() => handleAddPoints(100000)} target="_blank" rel="noopener noreferrer" className="bg-neutral-800 p-2 flex flex-col items-center justify-center w-40 gap-3 rounded-xl">
                    <Image
                        src={Armadillos_Adventures}
                        width={100}
                        height={100}
                        alt="Armadillos_Adventures"
                    />
                    <h4 className="text-white text-center text-sm">Watch! Astro Armadillos Adventures S01E01</h4>
                    <div className="flex items-center">
                        <Image
                            src={Coin}
                            width={20}
                            height={20}
                            alt="Coin"
                        />
                        <h5 className="text-white text-sm">+100,000</h5>
                    </div>
                </a>
                <a href="https://example.com/astro2" onClick={() => handleAddPoints(100000)} target="_blank" rel="noopener noreferrer" className="bg-neutral-800 p-2 flex flex-col items-center justify-center w-40 gap-3 rounded-xl">
                    <Image
                        src={Armadillos_Adventures}
                        width={100}
                        height={100}
                        alt="Armadillos_Adventures"
                    />
                    <h4 className="text-white text-center text-sm">Watch! Astro Armadillos Adventures S01E02</h4>
                    <div className="flex items-center">
                        <Image
                            src={Coin}
                            width={20}
                            height={20}
                            alt="Coin"
                        />
                        <h5 className="text-white text-sm">+100,000</h5>
                    </div>
                </a>
            </div>

            {/* Daily tasks */}
            <h4 className="text-white text-base text-left mt-4">Daily tasks</h4>
            <div className="flex flex-wrap gap-2 w-full mt-4">
                <a href="https://example.com/crypto" onClick={() => handleAddPoints(100000)} target="_blank" rel="noopener noreferrer" className="bg-neutral-800 p-2 flex flex-col items-center justify-center w-40 gap-3 rounded-xl">
                    <Image
                        src={Crypto_Space}
                        width={100}
                        height={100}
                        alt="Crypto_Space"
                    />
                    <h4 className="text-white text-center text-sm">Play Crypto Space</h4>
                    <div className="flex items-center">
                        <Image
                            src={Coin}
                            width={20}
                            height={20}
                            alt="Coin"
                        />
                        <h5 className="text-white text-sm">+100,000</h5>
                    </div>
                </a>
                <a href="https://example.com/stargating" onClick={() => handleAddPoints(100000)} target="_blank" rel="noopener noreferrer" className="bg-neutral-800 p-2 flex flex-col items-center justify-center w-40 gap-3 rounded-xl">
                    <Image
                        src={Stargating}
                        width={100}
                        height={100}
                        alt="Stargating"
                    />
                    <h4 className="text-white text-center text-sm">Play Stargating</h4>
                    <div className="flex items-center">
                        <Image
                            src={Coin}
                            width={20}
                            height={20}
                            alt="Coin"
                        />
                        <h5 className="text-white text-sm">+100,000</h5>
                    </div>
                </a>
            </div>

            {/* Task tasks */}
            <h4 className="text-white text-base text-left mt-4">Task tasks</h4>
            <div className="flex flex-wrap gap-2 w-full mt-4">
                <a href="https://example.com/telegram" onClick={() => handleAddPoints(100000)} target="_blank" rel="noopener noreferrer" className="bg-neutral-800 px-2 py-6 flex flex-col items-center justify-center w-40 gap-3 rounded-xl">
                    <Image
                        src={TG}
                        width={50}
                        height={50}
                        alt="TG"
                    />
                    <h4 className="text-white text-center text-sm">Join Our TG Channel</h4>
                    <div className="flex items-center">
                        <Image
                            src={Coin}
                            width={20}
                            height={20}
                            alt="Coin"
                        />
                        <h5 className="text-white text-sm">+100,000</h5>
                    </div>
                </a>
                <a href="https://example.com/xprofile" onClick={() => handleAddPoints(100000)} target="_blank" rel="noopener noreferrer" className="bg-neutral-800 px-2 py-6 flex flex-col items-center justify-center w-40 gap-3 rounded-xl">
                    <Image
                        src={X}
                        width={50}
                        height={50}
                        alt="X"
                    />
                    <h4 className="text-white text-center text-sm">Join Our X Profile</h4>
                    <div className="flex items-center">
                        <Image
                            src={Coin}
                            width={20}
                            height={20}
                            alt="Coin"
                        />
                        <h5 className="text-white text-sm">+100,000</h5>
                    </div>
                </a>
            </div>
        </div>
    );
}
