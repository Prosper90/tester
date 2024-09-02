import React from "react";
import Image from "next/image";
import Arrow from "../icons/Arrow.png";

interface SettingProps {
    onClose: () => void;
}

const Setting: React.FC<SettingProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black flex flex-col z-50 overflow-auto">
            <div className="flex flex-row items-center justify-between w-full px-4 py-4">
                <button onClick={onClose} className="p-2">
                    <Image src={Arrow} width={20} height={20} alt="arrow" />
                </button>
                <h3 className="text-white text-2xl text-center flex-1">Setting</h3>
            </div>
            {/* Settings Options */}
            <div className="flex flex-col space-y-4 px-4 mt-4">
                {/* <div className="flex justify-between items-center bg-zinc-800 px-4 py-3 rounded-lg">
                    <span className="text-white text-lg">Select Exchanger</span>
                    <span className="text-gray-400 text-lg">Binance</span>
                </div> */}
                <div className="flex justify-between items-center bg-zinc-800 px-4 py-3 rounded-lg">
                    <span className="text-white text-lg">Delete Account</span>
                    <span className="text-gray-400 bg-red-600 px-1 rounded-md text-lg">Delete</span>
                </div>
            </div>
        </div>
    );
};

export default Setting;
