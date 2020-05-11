import useWindowSize from "./useWindowSize";

import { UpCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import useInterval from "./useInterval";

export default ({ keysDown, tick }) => {
  const [position, setPosition] = useState({
    x: 50,
    y: 100,
    speed: 10,
    rotation: 90,
  });

  const size = useWindowSize();
  useEffect(() => {
    const xComponent =
      position.speed * Math.cos(((position.rotation - 90) * Math.PI) / 180);
    const yComponent =
      position.speed * Math.sin(((position.rotation - 90) * Math.PI) / 180);
    if (keysDown["ArrowUp"]) {
      const newPosition = {
        x: position.x + xComponent,
        y: position.y + yComponent,
      };
      setPosition({
        ...position,
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
    }

    if (keysDown["ArrowLeft"])
      setPosition({ ...position, rotation: position.rotation - 7 });
    if (keysDown["ArrowRight"])
      setPosition({ ...position, rotation: position.rotation + 7 });
  }, [tick]);

  return (
    <UpCircleOutlined
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
