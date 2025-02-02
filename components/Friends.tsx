"use client";

import Image from "next/image";
import Invite1 from "../images/Orange Chest.svg";
import Invite2 from "../images/Red Chest.svg";
import Coin from "../images/Token.svg";
import Icon from "../icons/usericon.png";

export default function Friends() {
    // Placeholder data for friends
    const friends = [
        { name: "Alice" },
        { name: "Bob" },
    ];

    const handleInviteFriend = () => {
        // Logic to handle friend invitation
        console.log("Invite a friend clicked");
    };

    const handleInviteTelegram = () => {
        // Logic to handle Telegram invitation
        console.log("Invite in Telegram clicked");
    };

    return (
        <div className="my-4 friends_background">
            <h3 className="text-white text-3xl text-center font-semibold">Invite friends!</h3>
            <h4 className="text-white text-base text-center mt-2">You and your friend will receive bonuses</h4>
            <div className="w-full p-4 gap-4 flex flex-col">
                <div className="bg-neutral-800 p-2 flex flex-col rounded-xl gap-3">
                    <div className="flex items-center justify-center gap-3">
                        <Image
                            src={Invite1}
                            width={50}
                            height={50}
                            alt="Invite Friend"
                        />
                        <div className="flex flex-col">
                            <h4 className="text-white text-base">Invite a friend</h4>
                            <div className="flex items-center">
                                <Image
                                    src={Coin}
                                    width={20}
                                    height={20}
                                    alt="Coin"
                                />
                                <h5 className="text-white text-sm"> <span className="text-amber-400">+5,000 </span>For you & your friend</h5>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleInviteFriend}
                        className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-xl py-2 px-4 w-2/3"
                    >
                        Invite a friend
                    </button>
                </div>
                <div className="bg-neutral-800 p-2 flex flex-col rounded-xl gap-3">
                    <div className="flex items-center justify-center gap-3">
                        <Image
                            src={Invite2}
                            width={50}
                            height={50}
                            alt="Invite Friend"
                        />
                        <div className="flex flex-col">
                            <h4 className="text-white text-base">Invite a friend with Telegram</h4>
                            <div className="flex items-center">
                                <Image
                                    src={Coin}
                                    width={20}
                                    height={20}
                                    alt="Coin"
                                />
                                <h5 className="text-white text-sm"> <span className="text-amber-400">+25,000 </span>For you & your friend</h5>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleInviteTelegram}
                        className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-xl py-2 px-4 w-2/3"
                    >
                        Invite in Telegram
                    </button>
                </div>
            </div>
            <h3 className="text-indigo-600 text-lg text-center font-semibold">More Bonuses</h3>
            <h4 className="text-white text-base text-left mt-2">List of your friends</h4>
            <div className="mt-4 flex flex-col gap-4">
                {friends.map((friend, index) => (
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
                            <h4 className="text-white">{friend.name}</h4>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <Image
                            src={Coin}
                            width={20}
                            height={15}
                            alt="User Icon"
                        />
                        <p className="text-white">+05.3K</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}
