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
      setPosition({
        x: position.x + xComponent > 0 ? position.x + xComponent : position.x,
        y: position.y + yComponent > 0 ? position.y + yComponent : position.y,
      });
    }
    if (keysDown["ArrowDown"])
      setPosition({
        x: position.x - xComponent > 0 ? position.x - xComponent : position.x,
        y: position.y - yComponent > 0 ? position.y - yComponent : position.y,
      });
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
