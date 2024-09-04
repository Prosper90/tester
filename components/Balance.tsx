"use client";

import Image, { StaticImageData } from "next/image";
import Coin from "../images/Token.svg";

// Define the prop types for Balance
interface BalanceProps {
    userPoints: number;
}

export default function Balance({ userPoints }: BalanceProps) {
    return (
        <div className="flex mt-4 items-center justify-center gap-2">
            <Image
                src={Coin}
                width={40}
                height={40}
                alt="Coin Icon"
                className="rounded-full"
            />
            <h5 className="text-white text-4xl">{userPoints}</h5>
        </div>
    );
}


