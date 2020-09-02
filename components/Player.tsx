import useWindowSize from "./useWindowSize";

import { UpCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import useInterval from "./useInterval";

const Player = ({
  position,
  rotation,
}: {
  position: { x: number; y: number };
  rotation: number;
}) => {
  return (
    <UpCircleOutlined
      style={{
        fontSize: "48px",
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      rotate={rotation}
    />
  );
};

export default Player;
