import useWindowSize from "./useWindowSize";

import { UpCircleOutlined, DeploymentUnitOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import useInterval from "./useInterval";

function getRandomInt(min = 0, max = 10) {
  return Math.floor(Math.random() * Math.floor(max) + min);
}
export default ({ tick }) => {
  const speed = getRandomInt();
  const [position, setPosition] = useState({
    x: getRandomInt(0, 50),
    y: getRandomInt(0, 50),
  });

  const [rotation, setRotation] = useState(90);
  const size = useWindowSize();

  useEffect(() => {
    const xComponent = speed * Math.cos(((rotation - 90) * Math.PI) / 180);
    const yComponent = speed * Math.sin(((rotation - 90) * Math.PI) / 180);

    const newPosition = {
      x: position.x + xComponent,
      y: position.y + yComponent,
    };
    setPosition({
      x:
        newPosition.x < 0
          ? size.width
          : newPosition.x > size.width
          ? 0
          : newPosition.x,
      y:
        newPosition.y < 0
          ? size.height
          : newPosition.y > size.height
          ? 0
          : newPosition.y,
    });
  }, [tick]);

  return (
    <DeploymentUnitOutlined
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
