import useWindowSize from "./useWindowSize";
import { Row, Col, Popover } from "antd";

import { UpCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { useRouter } from "next/router";
import useInterval from "./useInterval";

export default ({ keysDown, speed }) => {
  const [position, setPosition] = useState({
    x: 50,
    y: 100,
  });

  const [rotation, setRotation] = useState(90);
  const size = useWindowSize();

  useInterval(() => {
    const xComponent = speed * Math.cos(((rotation - 90) * Math.PI) / 180);
    const yComponent = speed * Math.sin(((rotation - 90) * Math.PI) / 180);
    if (keysDown["ArrowUp"]) {
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
    }

    if (keysDown["ArrowLeft"]) setRotation(rotation - 7);
    if (keysDown["ArrowRight"]) setRotation(rotation + 7);
  }, 30);

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
