"use client";

import Image from "next/image";
import Coin from "../images/coin.png";
import Stargating from "../images/Stargating.png";
import Crypto_Space from "../images/Crypto_Space.png";
import Armadillos_Adventures from "../images/Armadillos_Adventures.png";
import TG from "../icons/TG.png";
import X from "../icons/X.png";

export default function Earn() {


    return (
        <div className="my-4 friends_background">
            <h3 className="text-white text-3xl text-center font-semibold">Earn more coins</h3>
            <h4 className="text-white text-base text-center mt-2">Complete the task and earn more coins!</h4>

            {/* Astro Armadillos Adventures */}
            <h4 className="text-white text-base text-left mt-4">Astro Armadillos Adventures</h4>
            <div className="flex flex-wrap gap-2 w-full mt-4">
                <div className="bg-neutral-800 p-2 flex flex-col items-center justify-center w-40 gap-3 rounded-xl">
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
                </div>
                <div className="bg-neutral-800 p-2 flex flex-col items-center justify-center w-40 gap-3 rounded-xl">
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
                </div>
            </div>

            {/* Daily tasks */}
            <h4 className="text-white text-base text-left mt-4">Daily tasks</h4>
            <div className="flex flex-wrap gap-2 w-full mt-4">
                <div className="bg-neutral-800 p-2 flex flex-col items-center justify-center w-40 gap-3 rounded-xl">
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
                </div>
                <div className="bg-neutral-800 p-2 flex flex-col items-center justify-center w-40 gap-3 rounded-xl">
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
                </div>
            </div>
            
            {/* Task tasks */}
            <h4 className="text-white text-base text-left mt-4">Task tasks</h4>
            <div className="flex flex-wrap gap-2 w-full mt-4">
                <div className="bg-neutral-800 px-2 py-6 flex flex-col items-center justify-center w-40 gap-3 rounded-xl">
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
                </div>
                <div className="bg-neutral-800 px-2 py-6 flex flex-col items-center justify-center w-40 gap-3 rounded-xl">
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
                </div>
            </div>
        </div>
    );
}
