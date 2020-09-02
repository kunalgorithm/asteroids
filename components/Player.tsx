import useWindowSize from "./useWindowSize";

import { UpCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import useInterval from "./useInterval";

const Player = ({ position, rotation }) => {
  return (
    <UpCircleOutlined
      style={{
        fontSize: "3em",
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      rotate={rotation}
    />
  );
};

export default Player;
