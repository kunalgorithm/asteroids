import { Row, Col, Popover } from "antd";

import { UpCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import Player from "./Player";
import Asteroid from "./Asteroid";
import useInterval from "./useInterval";
import useWindowSize from "./useWindowSize";
import Bullet from "./Bullet";

function getRandomInt(min = 0, max = 10) {
  return Math.floor(Math.random() * Math.floor(max) + min);
}
function createAsteroid(size) {
  return {
    x: getRandomInt(0, size.width),
    y: getRandomInt(0, size.height),
    rotation: getRandomInt(0, 180),
    speed: getRandomInt(),
    curve: Math.random() - 0.5,
    size: Math.random() * 6 + 3,
  };
}

export default () => {
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
  const [tick, setTick] = useState(0);
  const size = useWindowSize();
  const [asteroids, setAsteroids] = useState([
    createAsteroid(size),
    createAsteroid(size),
  ]);
  const [bullets, setBullets] = useState<
    {
      x: number;
      y: number;
      speed: number;
      rotation: number;
    }[]
  >([]);
  const [player, setPlayer] = useState({
    x: 50,
    y: 100,
    speed: 13,
  });
  const [playerRotation, setPlayerRotation] = useState(90);

  useInterval(() => {
    /////////////////////////////////////////////////////
    // Update player
    /////////////////////////////////////////////////////
    const xComponent =
      player.speed * Math.cos(((playerRotation - 90) * Math.PI) / 180);
    const yComponent =
      player.speed * Math.sin(((playerRotation - 90) * Math.PI) / 180);
    if (keysDown["ArrowUp"]) {
      const newPosition = {
        x: player.x + xComponent,
        y: player.y + yComponent,
      };
      setPlayer({
        ...player,
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
    if (keysDown["ArrowLeft"]) setPlayerRotation(playerRotation - 10);
    if (keysDown["ArrowRight"]) setPlayerRotation(playerRotation + 10);
    /////////////////////////////////////////////////////
    // Update asteroids
    /////////////////////////////////////////////////////
    setAsteroids(
      asteroids
        .map((as) => {
          const xComponent =
            as.speed * Math.cos(((as.rotation - 90) * Math.PI) / 180);
          const yComponent =
            as.speed * Math.sin(((as.rotation - 90) * Math.PI) / 180);

          const newPosition = {
            x: as.x + xComponent,
            y: as.y + yComponent,
          };

          return {
            ...as,
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
            rotation: as.rotation + as.curve,
          };
        }) // delete asteroid that get too close to bullets
        .filter(
          (asteroid) =>
            !bullets.find(
              (bullet) =>
                Math.abs(bullet.x - asteroid.x) < 20 &&
                Math.abs(bullet.y - asteroid.y) < 20
            )
        )
    );

    /////////////////////////////////////////////////////
    // update bullets
    /////////////////////////////////////////////////////
    const newBullets = bullets.map((bullet) => {
      return {
        ...bullet,
        x:
          bullet.x +
          bullet.speed * Math.cos(((bullet.rotation - 90) * Math.PI) / 180),
        y:
          bullet.y +
          bullet.speed * Math.sin(((bullet.rotation - 90) * Math.PI) / 180),
      };
    });
    setBullets(
      newBullets.filter(
        ({ x, y }) => x > 0 && x < size.width && y > 0 && y < size.height
      )
    );
  }, 60);

  // create asteroids
  useInterval(() => {
    if (asteroids.length < 20)
      setAsteroids([...asteroids, createAsteroid(size)]);
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
        <Player position={player} rotation={playerRotation} />

        {asteroids.map((as) => (
          <Asteroid {...as} />
        ))}
        {bullets.map((b) => (
          <Bullet {...b} />
        ))}
      </div>
    </Row>
  );
};
