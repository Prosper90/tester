import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Arrow from "../icons/Arrow.png";

// Import your icons
import AvalancheIcon from "../images/Blockchains/Avalanche.svg";
import BitcoinIcon from "../images/Blockchains/Bitcoin.svg";
import BNBChainIcon from "../images/Blockchains/BNB Chain.svg";
import CardanoIcon from "../images/Blockchains/Cardano.svg";
import COREDaoIcon from "../images/Blockchains/CORE Dao.svg";
import CosmosIcon from "../images/Blockchains/Cosmos.svg";
import EthereumIcon from "../images/Blockchains/Ethereum.svg";
import NEARIcon from "../images/Blockchains/NEAR.svg";
import NextGenIcon from "../images/Blockchains/NextGen Chain.svg";
import PolkadotIcon from "../images/Blockchains/Polkadot.svg";
import SolanaIcon from "../images/Blockchains/Solana.svg";
import TronIcon from "../images/Blockchains/Tron.svg";

interface SettingProps {
    onClose: () => void;
    onExchangerChange: (name: string, icon: StaticImageData) => void;
    selectedExchanger: string; // New prop for displaying the selected exchanger
}

const exchangers = [
    { name: "Avalanche", icon: AvalancheIcon },
    { name: "Bitcoin", icon: BitcoinIcon },
    { name: "BNB Chain", icon: BNBChainIcon },
    { name: "Cardano", icon: CardanoIcon },
    { name: "CORE Dao", icon: COREDaoIcon },
    { name: "Cosmos", icon: CosmosIcon },
    { name: "Ethereum", icon: EthereumIcon },
    { name: "NEAR", icon: NEARIcon },
    { name: "NextGen", icon: NextGenIcon },
    { name: "Polkadot", icon: PolkadotIcon },
    { name: "Solana", icon: SolanaIcon },
    { name: "Tron", icon: TronIcon },
];

const Setting: React.FC<SettingProps> = ({ onClose, onExchangerChange, selectedExchanger }) => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

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
                <div className="relative flex bg-zinc-800 px-4 py-3 rounded-lg justify-between items-center">
                    <span className="text-white text-lg">Select Network</span>
                    <div className="relative">
                    <button
                        className="text-gray-400 text-lg flex items-center"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {selectedExchanger}
                        <span className={`ml-2 transform transition-transform ${dropdownOpen ? "rotate-180" : ""}`}>
                            ▼
                        </span>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-zinc-700 rounded-md shadow-lg z-50">
                            {exchangers.map((exchanger) => (
                                <button
                                    key={exchanger.name}
                                    onClick={() => {
                                        onExchangerChange(exchanger.name, exchanger.icon);
                                        setDropdownOpen(false);
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-white hover:bg-zinc-600"
                                >
                                    <Image
                                        src={exchanger.icon}
                                        width={20}
                                        height={20}
                                        alt={exchanger.name}
                                        className="mr-2"
                                    />
                                    {exchanger.name}
                                </button>
                            ))}
                        </div>
                    )}
                     </div>
                </div>
                <div className="flex justify-between items-center bg-zinc-800 px-4 py-3 rounded-lg">
                    <span className="text-white text-lg">Delete Account</span>
                    <span className="text-gray-400 bg-red-600 px-1 rounded-md text-lg">Delete</span>
                </div>
            </div>
        </div>
    );
};

export default Setting;
