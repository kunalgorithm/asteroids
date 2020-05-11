import useWindowSize from "./useWindowSize";

import { UpCircleOutlined, DeploymentUnitOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import useInterval from "./useInterval";
import { useMovement } from "./useMovement";

function getRandomInt(min = 0, max = 10) {
  return Math.floor(Math.random() * Math.floor(max) + min);
}
export default ({ tick }) => {
  const position = useMovement(tick);

  // const [rotation, setRotation] = useState(getRandomInt(0, 180));

  return (
    <DeploymentUnitOutlined
      style={{
        fontSize: "3em",
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      rotate={position.rotation}
    />
  );
};
