"use client";

import { useState } from "react";

interface CardTabsProps {
  cardTab: string;
  setCardTab: (tab: string) => void;
}

interface TabItemProps {
  label: string;
  cardTab: string;
  setCardTab: (tab: string) => void;
}

export default function CardTabs({ cardTab, setCardTab }: CardTabsProps) {
  return (
    <div className="relative w-full">
      <div className="w-full border-b border-gray-400">
        <div className="flex justify-around h-full p-4">
          <TabItem label="PR&Team" cardTab={cardTab} setCardTab={setCardTab} />
          <TabItem label="Legal" cardTab={cardTab} setCardTab={setCardTab} />
          <TabItem label="Markets" cardTab={cardTab} setCardTab={setCardTab} />
          <TabItem label="Special" cardTab={cardTab} setCardTab={setCardTab} />
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 h-1 bg-indigo-600 transition-transform duration-300"
        style={{
          width: "20%", // Adjust width based on number of tabs
          transform: `translateX(${tabPosition(cardTab)}%)`
        }}
      />
    </div>
  );
}

function TabItem({ label, cardTab, setCardTab }: TabItemProps) {
  return (
    <div
      onClick={() => setCardTab(label)}
      className={`relative flex w-1/4 flex-col items-center cursor-pointer gap-2 ${cardTab === label ? 'text-indigo-600' : 'text-gray-400'}`}
    >
      <span className="text-sm">{label}</span>
    </div>
  );
}

function tabPosition(tab: string) {
  switch (tab) {
    case "PR&Team":
      return 0;
    case "Legal":
      return 100;
    case "Markets":
      return 200;
    case "Special":
      return 300;
    default:
      return 0;
  }
}
