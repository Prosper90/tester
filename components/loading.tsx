'use client'

import Image from "next/image";
import Astro from "../images/Armadillo_5.svg";
import ChestBox from "../images/chest_box2.png";
import Logo from "../images/Logo.png";

export default function Loading() {
  return (
    <main className="bg-black">
      <div className="bg-[#100115] relative h-screen loading-background">
        <Image
          src={Logo}
          className="absolute top-4 left-1/2 transform -translate-x-1/2"
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
