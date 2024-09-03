"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Coin from "../images/Token.svg";
import Stargating from "../images/Stargating Logo V5.png";
import Crypto_Space from "../images/Crypto Space Logo.png";
import Armadillos_Adventures from "../images/Armadillos_Adventures_2.png";
import TG from "../icons/Telegram.svg";
import X from "../icons/X.svg";

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
    <div className="my-4 h-full friends_background">
      <h3 className="text-white text-3xl text-center font-semibold">Earn more coins</h3>
      <h4 className="text-white text-base text-center mt-2">Complete the task and earn more coins!</h4>

      {/* Astro Armadillos Adventures */}
      <h4 className="text-white text-base text-left mt-4">Astro Armadillos Adventures</h4>
      <div className="flex flex-wrap gap-2 w-full mt-4">
        <a
          href="https://youtu.be/veuucMnHnWA?si=sXU86fuDxNefXoXA"
          onClick={() => handleAddPoints("astro1", 1000)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 p-2 flex flex-col items-center justify-center w-40 gap-3 rounded-xl ${isTaskCompleted("astro1") ? "bg-opacity-50" : ""}`}
        >
          <Image
            src={Armadillos_Adventures}
            width={100}
            height={100}
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
          className={`bg-neutral-800 p-2 flex flex-col items-center justify-center w-40 gap-3 rounded-xl ${isTaskCompleted("astro2") ? "bg-opacity-50" : ""}`}
        >
          <Image
            src={Armadillos_Adventures}
            width={100}
            height={100}
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
          onClick={() => handleAddPoints("astro2", 1000)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 p-2 flex flex-col items-center justify-center w-40 gap-3 rounded-xl ${isTaskCompleted("astro2") ? "bg-opacity-50" : ""}`}
        >
          <Image
            src={Armadillos_Adventures}
            width={100}
            height={100}
            alt="Armadillos_Adventures"
          />
          <h4 className="text-white text-center text-sm">Watch! Astro Armadillos Adventures S01E03</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+1,000</h5>
          </div>
        </a>
      </div>

      {/* Daily tasks */}
      <h4 className="text-white text-base text-left mt-4">Daily tasks</h4>
      <div className="flex flex-wrap gap-2 w-full mt-4">
        <a
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
        </a>

        <a
          href="https://example.com/stargating"
          onClick={() => handleAddPoints("stargating", 1500)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 p-2 flex flex-col items-center justify-center w-40 gap-3 rounded-xl ${isTaskCompleted("stargating") ? "bg-opacity-50" : ""}`}
        >
          <Image src={Stargating} width={100} height={100} alt="Stargating" />
          <h4 className="text-white text-center text-sm">Play Stargating</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+1,500</h5>
          </div>
        </a>
      </div>

      {/* Task List */}
      <h4 className="text-white text-base text-left mt-4">Task list</h4>
      <div className="flex flex-wrap gap-2 w-full mt-4">
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
          <Image src={TG} width={50} height={50} alt="TG" />
          <h4 className="text-white text-center text-sm">Connect us on Linkedin</h4>
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
          <Image src={X} width={50} height={50} alt="X" />
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
          <Image src={TG} width={50} height={50} alt="TG" />
          <h4 className="text-white text-center text-sm">Join Our Discord Channel</h4>
          <div className="flex items-center">
            <Image src={Coin} width={20} height={20} alt="Coin" />
            <h5 className="text-white text-sm">+500</h5>
          </div>
        </a>

        <a
          href=" https://www.instagram.com/astroarmadillos/"
          onClick={() => handleAddPoints("instagram", 500)}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-neutral-800 px-2 py-6 flex flex-col items-center justify-center w-40 gap-3 rounded-xl ${isTaskCompleted("instagram") ? "bg-opacity-50" : ""}`}
        >
          <Image src={X} width={50} height={50} alt="X" />
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
