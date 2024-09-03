"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Airdrop1 from "../images/Airdrop.svg";
import { ethers } from "ethers";

export default function Airdrop() {
  const [account, setAccount] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (accounts.length === 0) {
          throw new Error("No accounts found.");
        }

        console.log("Accounts:", accounts);
        setAccount(accounts[0]);

        // Create a Web3Provider with the MetaMask provider
        const provider = new ethers.JsonRpcProvider(window.ethereum);

        // Ensure the signer is properly initialized
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();

        console.log("Signer address:", signerAddress);

        if (signerAddress.toLowerCase() !== accounts[0].toLowerCase()) {
          throw new Error(
            "Signer address does not match the connected account."
          );
        }
      } catch (error) {
        // Type guard to narrow error type
        if (error instanceof Error) {
          setErrorMessage(`Failed to connect to MetaMask: ${error.message}`);
        } else {
          setErrorMessage("An unknown error occurred.");
        }
        console.error("MetaMask connection error:", error);
      }
    } else {
      setErrorMessage("MetaMask is not installed.");
    }
  };

  return (
    <div className="friends_background">
      <div className="m-4 flex flex-col items-center justify-center gap-4">
        <h3 className="text-white text-3xl text-center font-semibold">
          Airdrop Tasks
        </h3>
        <h4 className="text-white text-base text-center mt-2 px-10">
          Listing is on its way. Tasks will appear below. Complete them to
          particvipate in the Airdrop
        </h4>
        <Image src={Airdrop1} width={250} height={300} alt="Airdrop1" />
        {account ? (
          <button>Connected</button>
        ) : (
          <button
            className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-xl p-4 w-full"
            onClick={connectMetaMask}
          >
            Connect your MetaMask Wallet
          </button>
        )}
      </div>
    </div>
  );
}
