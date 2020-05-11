import useWindowSize from "./useWindowSize";

import { UpCircleOutlined, DeploymentUnitOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import useInterval from "./useInterval";

function getRandomInt(min = 0, max = 10) {
  return Math.floor(Math.random() * Math.floor(max) + min);
}
export function useMovement(tick) {
  const speed = getRandomInt();
  const size = useWindowSize();
  const curve = Math.random() - 0.5;
  const [position, setPosition] = useState({
    x: getRandomInt(0, size.width),
    y: getRandomInt(0, size.height),
    rotation: getRandomInt(0, 180),
  });

  useEffect(() => {
    const xComponent =
      speed * Math.cos(((position.rotation - 90) * Math.PI) / 180);
    const yComponent =
      speed * Math.sin(((position.rotation - 90) * Math.PI) / 180);

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
      rotation: position.rotation + curve,
    });
  }, [tick]);

  return position;
}
