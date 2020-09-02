import { Row, Col, Popover, Alert } from "antd";
import { useState, useEffect } from "react";

import Player from "./Player";
import Asteroid from "./Asteroid";
import useInterval from "./useInterval";
import Bullet from "./Bullet";
import { Scoreboard } from "./Scoreboard";
import { useGameUpdate } from "./useGameUpdate";

const ASTEROID_FREQUENCY = 800;

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
    size: Math.random() * 20 + 50,
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
  };

  const {
    player,
    asteroids,
    score,
    size,
    setAsteroids,
    playerRotation,
    snakeLength,
  } = useGameUpdate(keysDown);

  // create asteroids
  useInterval(() => {
    if (asteroids.length < 5)
      setAsteroids([...asteroids, createAsteroid(size)]);
  }, ASTEROID_FREQUENCY);

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
        <Player position={player[0]} rotation={playerRotation} />
        {/* {player.length > 5 && (
          <Player position={player[5]} rotation={playerRotation} />
        )}  */}
        {Array(snakeLength)
          .fill(0)
          .map((node, i) => (
            <Player
              position={player[i * 4]}
              rotation={playerRotation}
              key={i}
            />
          ))}

        {asteroids.map((as, i) => (
          <Asteroid {...as} key={i} />
        ))}
      </div>
    </Row>
  );
};
export default Game;
