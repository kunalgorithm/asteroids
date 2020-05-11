import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Row, Col, Popover } from "antd";
import Profile from "./Profile";
import { UpCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { useRouter } from "next/router";
import useInterval from "./useInterval";

export default () => {
  const [position, setPosition] = useState({
    x: 50,
    y: 100,
  });

  const [rotation, setRotation] = useState(90);

  const speed = 10;

  const [keysDown, setKeysDown] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  const handleKeyDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let newKeysDown = keysDown;
    newKeysDown[event.key] = true;
    setKeysDown(newKeysDown);
  };

  const handleKeyUp = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let newKeysDown = keysDown;
    newKeysDown[event.key] = false;
    setKeysDown(newKeysDown);
  };

  useInterval(() => {
    if (keysDown["ArrowUp"])
      setPosition({
        x:
          position.x + speed * Math.cos(((rotation - 90) * Math.PI) / 180) > 0
            ? position.x + speed * Math.cos(((rotation - 90) * Math.PI) / 180)
            : position.x,
        y:
          position.y + speed * Math.sin(((rotation - 90) * Math.PI) / 180) > 0
            ? position.y + speed * Math.sin(((rotation - 90) * Math.PI) / 180)
            : position.y,
      });

    if (keysDown["ArrowDown"])
      setPosition({
        x:
          position.x - speed * Math.cos(((rotation - 90) * Math.PI) / 180) > 0
            ? position.x - speed * Math.cos(((rotation - 90) * Math.PI) / 180)
            : position.x,
        y:
          position.y - speed * Math.sin(((rotation - 90) * Math.PI) / 180) > 0
            ? position.y - speed * Math.sin(((rotation - 90) * Math.PI) / 180)
            : position.y,
      });
    if (keysDown["ArrowLeft"]) setRotation(rotation - 7);
    if (keysDown["ArrowRight"]) setRotation(rotation + 7);
  }, 30);

  return (
    <Row
      style={{ height: "100vh" }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      id="game"
    >
      <div>
        <UpCircleOutlined
          style={{
            fontSize: "2em",
            position: "absolute",
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
          rotate={rotation}
        />
      </div>
    </Row>
  );
};
