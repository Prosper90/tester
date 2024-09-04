"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Coin from "../images/Token.svg";
import Stargating from "../images/Logos/Stargating.png";
import Crypto_Space from "../images/Crypto Space Logo.png";
import Youtube from "../images/Socials/youtube_2504965.svg";
import Astro_Armadillos from "../images/Logos/Astro Armadillos.png";
import Web3glossary from "../images/Logos/Web3Glossary.svg";
import Stake from "../images/Logos/Staking Astros Token.png"
import Astro_Nfts from "../images/Logos/AstrosNFTs.png"
import TG from "../images/Socials/telegram_2504941.svg";
import X from "../images/Socials/twitter_2504947.svg";
import Linkedin from "../images/Socials/linkedin_2504923.svg"
import Instagram from "../images/Socials/instagram_2504918.svg"
import Discord from "../images/Socials/discord_2504896.svg"
import Spotify from "../images/Socials/spotify.png"
import Tiktok from "../images/Socials/tiktok_2504942.svg"
import CryptoSpace from "../images/Logos/Crypto Space.png"

interface EarnProps {
  userPoints: number;
  setUserPoints: (newPoints: number | ((prevPoints: number) => number)) => void;
}

export default function Earn({ userPoints, setUserPoints }: EarnProps) {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  // Function to handle point addition and task completion
  const handleAddPoints = (taskName: string, points: number) => {
    if (!completedTasks.includes(taskName)) {
      setUserPoints((prevPoints) => prevPoints + points);
      setCompletedTasks((prevTasks) => [...prevTasks, taskName]);
    }
  };

  useEffect(() => {
    if (
      completedTasks.length === 6 // Number of tasks
    ) {
      setUserPoints((prevPoints) => prevPoints + 3000); // Add bonus points
    }
  }, [completedTasks, setUserPoints]);

  // Function to check if task is completed
  const isTaskCompleted = (taskName: string) => completedTasks.includes(taskName);

  return (
    <div className="my-4 h-full p-5">
      <h3 className="text-white text-3xl text-center font-semibold">Earn more coins</h3>
      <h4 className="text-white text-base text-center mt-2">Complete the task and earn more coins!</h4>

      {/* Astro Armadillos Adventures */}
      <h4 className="text-white text-base text-left mt-4">Astro Armadillos Universe</h4>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <a
          href="https://youtu.be/veuucMnHnWA?si=sXU86fuDxNefXoXA"
          onClick={() => handleAddPoints("astro1", 1000)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 p-2 flex flex-col items-center justify-center gap-3 rounded-xl ${isTaskCompleted("astro1") ? "bg-opacity-50" : ""}`}
        >
          <Image
            src={Youtube}
            width={50}
            height={50}
            alt="Armadillos_Adventures"
          />
          <h4 className="text-white text-center text-sm">Watch! Astro Armadillos Adventures S01E01</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+1,000</h5>
          </div>
        </a>
        <a
          href="https://youtu.be/eKLNdgL8Ynk?si=LVGoXF5Mk0mJM_Ol"
          onClick={() => handleAddPoints("astro2", 1000)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 p-2 flex flex-col items-center justify-center gap-3 rounded-xl ${isTaskCompleted("astro2") ? "bg-opacity-50" : ""}`}
        >
          <Image
            src={Youtube}
            width={50}
            height={50}
            alt="Armadillos_Adventures"
          />
          <h4 className="text-white text-center text-sm">Watch! Astro Armadillos Adventures S01E02</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+1,000</h5>
          </div>
        </a>
        <a
          href="https://youtu.be/q8N5IqAi4hU?si=EJx5BR-3sHe9V_mW"
          onClick={() => handleAddPoints("astro3", 1000)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 p-2 flex flex-col items-center justify-center gap-3 rounded-xl ${isTaskCompleted("astro3") ? "bg-opacity-50" : ""}`}
        >
          <Image
            src={Youtube}
            width={50}
            height={50}
            alt="Armadillos_Adventures"
          />
          <h4 className="text-white text-center text-sm">Watch! Astro Armadillos Adventures S01E03</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+1,000</h5>
          </div>
        </a>
        <a
          href="https://stake.astroarmadillos.io/"
          onClick={() => handleAddPoints("stake", 1000)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 p-2 flex flex-col items-center justify-center gap-3 rounded-xl ${isTaskCompleted("stake") ? "bg-opacity-50" : ""}`}
        >
          <Image
            src={Stake}
            width={100}
            height={100}
            alt="Armadillos_Adventures"
          />
          <h4 className="text-white text-center text-sm">Stake Your Tokens</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+1,000</h5>
          </div>
        </a>
        <a
          href="https://astroarmadillos.io/"
          onClick={() => handleAddPoints("astroarmadillos", 1000)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 p-2 flex flex-col items-center justify-center gap-3 rounded-xl ${isTaskCompleted("astroarmadillos") ? "bg-opacity-50" : ""}`}
        >
          <Image
            src={Astro_Armadillos}
            width={100}
            height={100}
            alt="Armadillos_Adventures"
          />
          <h4 className="text-white text-center text-sm">Visit Astro Armadillos</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+1,000</h5>
          </div>
        </a>
        <a
          href=" https://web3glossary.io/"
          onClick={() => handleAddPoints("web3glossary", 1000)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 p-2 flex flex-col items-center justify-center gap-3 rounded-xl ${isTaskCompleted("web3glossary") ? "bg-opacity-50" : ""}`}
        >
          <Image
            src={Web3glossary}
            width={100}
            height={100}
            alt="Armadillos_Adventures"
          />
          <h4 className="text-white text-center text-sm">Download a glossary</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+1,000</h5>
          </div>
        </a>
        <a
          href="https://astrosnfts.io/"
          onClick={() => handleAddPoints("astrosnfts", 1000)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 p-2 flex flex-col items-center justify-center gap-3 rounded-xl ${isTaskCompleted("astrosnfts") ? "bg-opacity-50" : ""}`}
        >
          <Image
            src={Astro_Nfts}
            width={100}
            height={100}
            alt="Armadillos_Adventures"
          />
          <h4 className="text-white text-center text-sm">Check Out cool NFTs</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+1,000</h5>
          </div>
        </a>
      </div>

      {/* Daily tasks */}
      <h4 className="text-white text-base text-left mt-4">Daily tasks</h4>
      <div className="grid grid-cols-2 gap-2 w-full mt-4">
        {/* <a
          href="https://astroarmadillos.io/"
          onClick={() => handleAddPoints("crypto", 1500)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 p-2 flex flex-col items-center justify-center w-40 gap-3 rounded-xl ${isTaskCompleted("crypto") ? "bg-opacity-50" : ""}`}
        >
          <Image src={Crypto_Space} width={100} height={100} alt="Crypto_Space" />
          <h4 className="text-white text-center text-sm">Play Astroarmadilos</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+1,500</h5>
          </div>
        </a> */}
 <a
          href="http://cryptospace.game"
          onClick={() => handleAddPoints("cryptospace", 1500)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 p-2 flex flex-col items-center justify-center w-40 gap-3 rounded-xl ${isTaskCompleted("cryptospace") ? "bg-opacity-50" : ""}`}
        >
          <Image src={CryptoSpace} width={100} height={100} alt="cryptospace" />
          <h4 className="text-white text-center text-sm">Play Crypto Space game</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+1,500</h5>
          </div>
        </a>
        <a
          href="https://stargating.io/"
          onClick={() => handleAddPoints("stargating", 1500)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 p-2 flex flex-col items-center justify-center w-40 gap-3 rounded-xl ${isTaskCompleted("stargating") ? "bg-opacity-50" : ""}`}
        >
          <Image src={Stargating} width={100} height={100} alt="Stargating" />
          <h4 className="text-white text-center text-sm">Play a game</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+1,500</h5>
          </div>
        </a>
      </div>

      {/* Task List */}
      <h4 className="text-white text-base text-left mt-4">Task list</h4>
      <div className="grid grid-cols-2 gap-2 w-full mt-4">
        <a
          href="https://t.me/stargating"
          onClick={() => handleAddPoints("telegram", 500)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 px-2 py-6 flex flex-col items-center justify-center w-40 gap-3 rounded-xl ${isTaskCompleted("telegram") ? "bg-opacity-50" : ""}`}
        >
          <Image src={TG} width={50} height={50} alt="TG" />
          <h4 className="text-white text-center text-sm">Join Our TG Channel</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+500</h5>
          </div>
        </a>

        <a
          href="https://twitter.com/AstroArmadillos"
          onClick={() => handleAddPoints("xprofile", 500)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 px-2 py-6 flex flex-col items-center justify-center w-40 gap-3 rounded-xl ${isTaskCompleted("xprofile") ? "bg-opacity-50" : ""}`}
        >
          <Image src={X} width={50} height={50} alt="X" />
          <h4 className="text-white text-center text-sm">Join Our X Profile</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+500</h5>
          </div>
        </a>
        <a
          href="https://www.linkedin.com/company/astro-armadillos"
          onClick={() => handleAddPoints("linkedin", 500)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 px-2 py-6 flex flex-col items-center justify-center w-40 gap-3 rounded-xl ${isTaskCompleted("linkedin") ? "bg-opacity-50" : ""}`}
        >
          <Image src={Linkedin} width={50} height={50} alt="TG" />
          <h4 className="text-white text-center text-sm">Follow us on Linkedin</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+500</h5>
          </div>
        </a>

        <a
          href="https://open.spotify.com/show/5AHsgsTJ7f3xNQx5CjNbwX"
          onClick={() => handleAddPoints("spotify", 500)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 px-2 py-6 flex flex-col items-center justify-center w-40 gap-3 rounded-xl ${isTaskCompleted("spotify") ? "bg-opacity-50" : ""}`}
        >
          <Image src={Spotify} width={50} height={50} alt="X" />
          <h4 className="text-white text-center text-sm">Follow Our Spotify Profile</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+500</h5>
          </div>
        </a>
        <a
          href="https://discord.com/invite/aGMTaCs4Y7"
          onClick={() => handleAddPoints("discord", 500)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 px-2 py-6 flex flex-col items-center justify-center w-40 gap-3 rounded-xl ${isTaskCompleted("discord") ? "bg-opacity-50" : ""}`}
        >
          <Image src={Discord} width={50} height={50} alt="TG" />
          <h4 className="text-white text-center text-sm">Join Our Discord Channel</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+500</h5>
          </div>
        </a>
        <a
          href=" https://www.instagram.com/astroarmadillos/"
          onClick={() => handleAddPoints("tiktok", 500)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 px-2 py-6 flex flex-col items-center justify-center w-40 gap-3 rounded-xl ${isTaskCompleted("tiktok") ? "bg-opacity-50" : ""}`}
        >
          <Image src={Tiktok} width={50} height={50} alt="X" />
          <h4 className="text-white text-center text-sm">Follow us on Tiktok</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+500</h5>
          </div>
        </a>
        <a
          href=" https://www.tiktok.com/@astroarmadillos?_t=8pQu78XQBj0&_r=1"
          onClick={() => handleAddPoints("instagram", 500)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 px-2 py-6 flex flex-col items-center justify-center w-40 gap-3 rounded-xl ${isTaskCompleted("instagram") ? "bg-opacity-50" : ""}`}
        >
          <Image src={Instagram} width={50} height={50} alt="X" />
          <h4 className="text-white text-center text-sm">Follow us on Instagram</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+500</h5>
          </div>
        </a>
      </div>
    </div>
  );
}
