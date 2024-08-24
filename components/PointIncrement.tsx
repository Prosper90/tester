// PointIncrement.tsx
import React from "react";

interface PointIncrementProps {
  tapCount: number;
  tapPosition: { x: number; y: number };
}

const PointIncrement: React.FC<PointIncrementProps> = ({ tapCount, tapPosition }) => {
  return (
    <div
      className="absolute text-white text-3xl font-bold animate-fadeUp"
      style={{
        top: tapPosition.y,
        left: tapPosition.x,
        transform: "translate(-50%, -50%)",
      }}
    >
      +{tapCount}
    </div>
  );
};

export default PointIncrement;
