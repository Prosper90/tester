"use client";

import Image, { StaticImageData } from "next/image";
import Coin from "../images/coin.png";
import ChestBox1 from "../images/ChestBox.png"
import ChestBox2 from "../images/chest_box.png"


export default function DailyCombo() {
    return (
        <div className="pt-2 w-full bg-gray-950 rounded-t-[46px] border-t-2 border-indigo-600 top-glow">
            <div className="w-full p-4">
                <div className="bg-neutral-800 p-2 rounded-xl flex flex-col gap-4 items-center">
                    <div className="flex items-center justify-between w-full">
                        <h3 className="text-white">Daily Combo</h3>
                        <button className="p-2 flex rounded-lg bg-gradient-to-r from-indigo-500 to-pink-600 gap-1 items-center justify-center">
                            <Image
                                src={Coin}
                                width={20}
                                height={20}
                                alt="Coin Icon"
                                className="rounded-full"
                            />
                            <h5 className="text-white text-sm">+2,000,000</h5>
                        </button>
                    </div>
                    <div className="flex justify-between gap-1 w-full">
                        <div className="w-1/3 h-24 bg-neutral-700 flex flex-col items-center justify-around rounded-xl border border-gray-500 p-2 shadow-inner shadow-indigo-500">
                            <Image
                                src={ChestBox1}
                                width={90}
                                height={90}
                                alt="Calender"
                            />
                        </div>
                        <div className="w-1/3 h-24 bg-neutral-700 flex flex-col items-center justify-around rounded-xl border border-gray-500 p-2 shadow-inner shadow-indigo-500">
                            <Image
                                src={ChestBox1}
                                width={90}
                                height={90}
                                alt="Lock"
                            />
                        </div>
                        <div className="w-1/3 h-24 bg-neutral-700 flex flex-col items-center justify-around rounded-xl border border-gray-500 p-2 shadow-inner shadow-indigo-500">
                            <Image
                                src={ChestBox2}
                                width={70}
                                height={70}
                                alt="Combo"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


