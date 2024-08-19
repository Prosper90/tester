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
          <TabItem label="Performance" cardTab={cardTab} setCardTab={setCardTab} />
          <TabItem label="Incentives" cardTab={cardTab} setCardTab={setCardTab} />
          <TabItem label="Usability" cardTab={cardTab} setCardTab={setCardTab} />
          <TabItem label="Security" cardTab={cardTab} setCardTab={setCardTab} />
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 h-1 bg-indigo-600 transition-transform duration-300"
        style={{
          width: "25%", // Adjust width based on number of tabs
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
      className={`relative flex w-1/4 text-center flex-col items-center cursor-pointer ${cardTab === label ? 'text-indigo-600' : 'text-gray-400'}`}
    >
      <span className="text-sm">{label}</span>
    </div>
  );
}

function tabPosition(tab: string) {
  switch (tab) {
    case "Performance":
      return 0;
    case "Incentives":
      return 100;
    case "Usability":
      return 200;
    case "Security":
      return 300;
    default:
      return 0;
  }
}
