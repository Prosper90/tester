"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Airdrop1 from "../images/Airdrop.svg";
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { TonConnectUIProvider,TonConnectButton } from '@tonconnect/ui-react';

export default function Airdrop() {
  const [account, setAccount] = useState<string | null>(null);
  const [tonAccount, setTonAccount] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    } else {
      console.log(
        "MetaMask is not installed. Please install it to use this app."
      );
    }
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      setAccount(address);
    }
  }, [isConnected, address]);

  const handleConnectWallet = () => {
    open();
  };


  return (
    <TonConnectUIProvider manifestUrl="https://firebasestorage.googleapis.com/v0/b/astrobiatechblock.appspot.com/o/tonconnect-manifest.json?alt=media&token=e16694e5-89c0-4df1-b8b6-82c5476aa7ea">
    <div className="friends_background">
      <div className="m-4 flex flex-col items-center justify-center gap-4">
        <h3 className="text-white text-3xl text-center font-semibold">
          Airdrop Tasks
        </h3>
        <h4 className="text-white text-base text-center mt-2 px-10">
          Listing is on its way. Tasks will appear below. Complete them to
          participate in the Airdrop
        </h4>
        <Image src={Airdrop1} width={250} height={300} alt="Airdrop1" />
      
       <TonConnectButton />
        {errorMessage && (
          <p className="text-red-500 mt-4">{errorMessage}</p>
        )}
      </div>
    </div>
  </TonConnectUIProvider>
  );
}