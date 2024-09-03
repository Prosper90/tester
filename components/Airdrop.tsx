"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Airdrop1 from "../images/Airdrop.svg";
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';

export default function Airdrop() {
  const [account, setAccount] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    } else {
      setErrorMessage(
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
        {account ? (
          <>
 <button
            className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-xl p-4 w-full">              {account.substring(0, 6) + "..." + account.substring(account.length - 4)}
            </button>
            <p className="text-white mt-4">Coming Soon</p>
          </>
        ) : (
          <button
            className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-xl p-4 w-full"
            onClick={handleConnectWallet}
          >
            Connect your Wallet
          </button>
        )}
        {errorMessage && (
          <p className="text-red-500 mt-4">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
