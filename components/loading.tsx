'use client'

import Image from "next/image";
import Astro from "../images/Armadillo_5.svg";
import ChestBox from "../images/Chest.svg";
import Logo from "../images/Galactic Gold Rush.svg";

export default function Loading() {
  return (
    <main className="bg-black">
      <div className="bg-[#100115] relative h-screen flex items-start justify-center loading-background">
        <Image
          src={Logo}
          className="mt-4 absolute left-10"
          width={500}
          height={500}
          alt="Company logo"
        />
        <Image
          src={Astro}
          className="absolute z-10 bottom-2 left-0"
          width={300}
          height={500}
          alt="Astronaut character"
        />
        <Image
          src={ChestBox}
          className="absolute bottom-16 right-0"
          width={200}
          height={50}
          alt="Treasure chest"
        />
      </div>
    </main>
  );
}
