import React from "react";
import Image from "next/image";
import Coin from "../images/coin.png"
import Arrow from "../icons/Arrow.png";
import Icon from "../icons/usericon.png";
import Astro from "../images/Astro1.png";

interface ProgressPageProps {
    onClose: () => void;
}

const ProgressPage: React.FC<ProgressPageProps> = ({ onClose }) => {
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
                        src={Astro}
                        width={200}
                        height={200}
                        alt="Character"
                        className="relative z-10"
                    />
                </div>
                <h4 className="text-white text-3xl mt-2">Sapphire</h4>
                <p className="text-gray-400 text-lg mt-1">7.47M / 10M</p>

                {/* Progress Bar */}
                <div className="w-full mt-4 px-8">
                    <div className="w-full h-2 bg-gray-700 rounded-full">
                        <div
                            className="h-2 bg-gradient-to-r from-green-400 via-purple-400 to-blue-400 rounded-full"
                            style={{ width: "74.7%" }} // This value should be dynamically calculated
                        ></div>
                    </div>
                </div>
            </div>

            {/* User Ranking List */}
            <div className="w-full mt-8 px-4">
                {Array(5).fill(0).map((_, index) => (
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
