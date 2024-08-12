'use client'

import WebApp from "@twa-dev/sdk";
import Image from "next/image";
import { useEffect, useState } from "react";
import Astro from "../images/Astro.png"
import ChestBox from "../images/chest_box.png"
import Logo from "../images/Logo.png"

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  is_premium: boolean;
}

export default function Sample() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData)
    }
  }, [])
  return (
    <main className="bg-black">
      {userData ? (
        <>
          <h1 className="text-2xl font-bold mb-4">User Data</h1>
          <ul>
            <li>ID: {userData.id}</li>
            <li>First Name: {userData.first_name}</li>
            <li>Last Name: {userData.last_name || 'N/A'}</li>
            <li>Username: {userData.username || 'N/A'}</li>
            <li>Language Code: {userData.language_code}</li>
            <li>Is Premium: {userData.is_premium ? 'Yes' : 'No'}</li>
          </ul>
        </>
      ) : (
        <div className="bg-[#100115] relative h-screen loading-background">
          <Image src={Logo} className="absolute top-4" width={500}
            height={500} alt="logo" />
          <Image src={Astro} className="absolute z-10 bottom-2 left-0" width={300}
            height={500} alt="astro" />
            <Image src={ChestBox} className="absolute bottom-16 right-0" width={200}
            height={50} alt="chest box" />
        </div>
      )}
    </main>
  );
}




