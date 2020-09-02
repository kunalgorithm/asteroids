import { Row, Col, Popover, Alert } from "antd";

import { UpCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import Player from "./Player";
import Asteroid from "./Asteroid";
import useInterval from "./useInterval";
import Bullet from "./Bullet";
import { Scoreboard } from "./Scoreboard";
import { useGameUpdate } from "./useGameUpdate";

function getRandomInt(min = 0, max = 10) {
  return Math.floor(Math.random() * Math.floor(max) + min);
}
export function createAsteroid(size) {
  return {
    x: getRandomInt(0, size.width),
    y: getRandomInt(0, size.height),
    rotation: getRandomInt(0, 180),
    speed: getRandomInt(0, 15),
    curve: Math.random() * 1.5 - 0.75,
    size: Math.random() * 50 + 50,
  };
}

const Game = () => {
  const [keysDown, setKeysDown] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    " ": false,
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
    if (event.key === " ") {
      setBullets([
        ...bullets,
        {
          x: player.x,
          y: player.y,
          speed: 20,
          rotation: playerRotation,
        },
      ]);
    }
  };

  const {
    player,
    asteroids,
    bullets,
    score,
    size,
    setAsteroids,
    setBullets,
    playerRotation,
  } = useGameUpdate(keysDown);

  // create asteroids
  useInterval(() => {
    if (asteroids.length < 30)
      setAsteroids([...asteroids, createAsteroid(size)]);
  }, 1000);

  return (
    <Row
      style={{ height: "82vh" }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      id="game"
    >
      <Scoreboard score={score!} />

      <div>
        <Player position={player} rotation={playerRotation} />

        {asteroids.map((as, i) => (
          <Asteroid {...as} key={i} />
        ))}
        {bullets.map((b, i) => (
          <Bullet {...b} key={i} />
        ))}
      </div>
    </Row>
  );
};
export default Game;
