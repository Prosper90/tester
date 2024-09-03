import React from "react";
import Image, { StaticImageData } from "next/image";
import Coin from "../images/Token.svg"
import Arrow from "../icons/Arrow.svg";
import Icon from "../icons/usericon.png";
import Astro from "../images/Astro1.png";

interface ProgressPageProps {
    
    levelIndex: number;
    levelNames: string[];
    calculateProgress: () => number;
    userPoints: number;
    levelIcons: StaticImageData[];
    onClose: () => void;
}

const ProgressPage: React.FC<ProgressPageProps> = ({
    levelIcons,
    levelIndex,
    levelNames,
    calculateProgress,
    userPoints,
    onClose,
}) => {
    return (
        <div className="fixed inset-0 bg-black flex flex-col z-50 overflow-auto">
            {/* Header Section */}
            <div className="flex flex-row items-center justify-between w-full px-4 py-4">
                <button onClick={onClose} className="p-2">
                    <Image src={Arrow} width={20} height={20} alt="arrow" />
                </button>
                <h3 className="text-white text-2xl text-center flex-1">Progress</h3>
            </div>

            {/* Character Image and Progress Information */}
            <div className="flex flex-col items-center w-full px-4 mt-4">
                <div className="relative">
                    {/* Yellow Glow */}
                    <div className="absolute inset-0 rounded-full filter blur-3xl opacity-80 bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300"></div>

                    <Image
                        src={levelIcons[levelIndex]}
                        width={200}
                        height={200}
                        alt="Character"
                        className="relative z-10"
                    />
                </div>
                <h4 className="text-white text-center text-3xl mt-2">{levelNames[levelIndex]}</h4>
                <p className="text-gray-400 text-lg mt-1">{userPoints}</p>

                {/* Progress Bar */}
                <div className="w-full mt-4 px-8">
                    <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                        <div
                            className="bg-gradient-to-r from-[#90ef89] via-[#d692dd] to-[#726edd] h-2 rounded-full"
                            style={{ width: `${calculateProgress()}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="mt-10">
            <h3 className="text-white text-2xl text-center text-bold flex-1">Leaderboard</h3>
            </div>
            {/* User Ranking List */}
            <div className="w-full mt-8 px-4">
                {Array(15).fill(0).map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-gray-800 rounded-lg p-4 mb-2"
                    >
                        <div className="flex items-center">
                            <div className="h-12 w-12 rounded-full bg-gray-600 flex items-center justify-center">
                                <Image
                                    src={Icon}
                                    width={30}
                                    height={30}
                                    alt="User Icon"
                                />
                            </div>
                            <div className="ml-4">
                                <h4 className="text-white">Jones Doe</h4>
                                <p className="text-gray-400">Rank 1000+</p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <Image
                                src={Coin}
                                width={20}
                                height={15}
                                alt="User Icon"
                                className="w-full"
                            />
                            <p className="text-white">+05.3K</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgressPage;
