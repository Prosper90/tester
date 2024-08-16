"use client";

import Image from "next/image";
import Airdrop1 from "../images/Airdrop.svg";

export default function Airdrop() {


    return (
        <div className="friends_background">
        <div className="m-4 flex flex-col items-center justify-center gap-4">
            <h3 className="text-white text-3xl text-center font-semibold">Airdrop Tasks</h3>
            <h4 className="text-white text-base text-center mt-2 px-10">Listing is on its way. Tasks will appear below. Complete them to particvipate in the Airdrop</h4>
            <Image
                src={Airdrop1}
                width={250}
                height={300}
                alt="Airdrop1"
            />
            <button
                className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-xl p-4 w-full"
            >
                Connect your MetaMask Wallet
            </button>
        </div>
        </div>
    );
}
