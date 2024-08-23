"use client";

import Image from "next/image";
import React, { useState } from "react";
import Icon from "../icons/usericon.png";
import ProgressPage from "./Progress"; // Make sure the path is correct
import Skin from "./Skin";

// Define the prop types for UserInfo
interface UserInfoProps {
  userPoints: number;
  userName: string;
  levelIndex: number;
  levelNames: string[];
  calculateProgress: () => number;
}

export default function UserInfo({
  userPoints,
  userName,
  levelIndex,
  levelNames,
  calculateProgress,
}: UserInfoProps) {
  const [showProgressPage, setShowProgressPage] = useState(false);
  const [showSkinPage, setShowSkinPage] = useState(false);

  const handleLevelClick = () => {
    setShowProgressPage(true);
  };
  const handleSkinClick = () => {
    setShowSkinPage(true);
  };

  const handleClose = () => {
    setShowProgressPage(false);
  };
  const handleSkinClose = () => {
    setShowSkinPage(false);
  };

  return (
    <>
      <div className="flex items-center justify-between w-full p-2">
        <div className="flex items-center justify-center gap-2 h-10" onClick={handleSkinClick}>
          <Image
            src={Icon}
            width={30}
            height={30}
            alt="User Icon"
            className="h-full w-full rounded-md p-1 bg-zinc-700"
          />
          <div className="flex flex-col items-left justify-center">
            <h3 className="text-white text-sm">{userName}</h3>
            <h4 className="text-gray-400 font-bold text-sm">CEO</h4>
          </div>
        </div>
        <div className="flex items-center w-1/3">
          <div className="w-full">
            <div className="flex justify-between">
              <p
                className="text-sm text-white cursor-pointer"
                onClick={handleLevelClick}
              >
                {levelNames[levelIndex]}
              </p>
              <p
                className="text-sm text-white cursor-pointer"
                onClick={handleLevelClick}
              >
                {levelIndex + 1}{" "}
                <span className="text-[#95908a]">/ {levelNames.length}</span>
              </p>
            </div>
            <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
              <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                <div
                  className="bg-gradient-to-r from-[#90ef89] via-[#d692dd] to-[#726edd] h-2 rounded-full"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSkinPage && <Skin levelIndex={levelIndex} userPoints={userPoints} userName={userName} levelNames={levelNames} calculateProgress={calculateProgress}  onClose={handleSkinClose} />}
      {showProgressPage && <ProgressPage levelIndex={levelIndex} userPoints={userPoints} levelNames={levelNames} calculateProgress={calculateProgress} onClose={handleClose} />}
    </>
  );
}
