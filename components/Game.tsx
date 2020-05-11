import { Row, Col, Popover } from "antd";

import { UpCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import Player from "./Player";
import Asteroid from "./Asteroid";
import useInterval from "./useInterval";

export default () => {
  const [keysDown, setKeysDown] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  const [asteroids, setAsteroids] = useState([]);

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
  const [tick, setTick] = useState(0);

  useInterval(() => setTick(tick + 1), 50);

  useInterval(() => {
    setAsteroids([...asteroids, Math.random()]);
    console.log(asteroids);
  }, 3000);
  return (
    <Row
      style={{ height: "100vh" }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      id="game"
    >
      <div>
        <Player keysDown={keysDown} tick={tick} />
        {asteroids.map((a) => {
          <Asteroid tick={tick} key={a} />;
        })}
        <Asteroid tick={tick} />
        <Asteroid tick={tick} />
      </div>
    </Row>
  );
};
