import { Row, Col, Popover, Alert, message } from "antd";

import { UpCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import Player from "./Player";
import Asteroid from "./Asteroid";
import useInterval from "./useInterval";
import useWindowSize from "./useWindowSize";
import Bullet from "./Bullet";
import { Scoreboard } from "./Scoreboard";

function getRandomInt(min = 0, max = 10) {
  return Math.floor(Math.random() * Math.floor(max) + min);
}
function createAsteroid(size) {
  return {
    x: getRandomInt(0, size.width),
    y: getRandomInt(0, size.height),
    rotation: getRandomInt(0, 180),
    speed: getRandomInt(0, 15),
    curve: Math.random() * 1.5 - 0.75,
    size: Math.random() * 50 + 50,
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
  }, 1500);

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

function useGameUpdate(keysDown) {
  const size = useWindowSize();
  const [asteroids, setAsteroids] = useState([
    createAsteroid(size),
    createAsteroid(size),
    createAsteroid(size),
    createAsteroid(size),
    createAsteroid(size),
    createAsteroid(size),
  ]);
  const [score, setScore] = useState(0);
  const [bullets, setBullets] = useState<
    {
      x: number;
      y: number;
      speed: number;
      rotation: number;
    }[]
  >([]);
  const [player, setPlayer] = useState({
    x: 200,
    y: 400,
    speed: 0,
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

    const newPosition = {
      x: player.x + xComponent,
      y: player.y + yComponent,
    };
    setPlayer({
      ...player,
      x:
        newPosition.x < 0 - 50
          ? size.width
          : newPosition.x > size.width
          ? 0
          : newPosition.x,
      y:
        newPosition.y < 0 - 50
          ? size.height
          : newPosition.y > size.height
          ? 0
          : newPosition.y,
      speed: keysDown["ArrowUp"] ? player.speed + 2 : player.speed * 0.9,
    });

    if (
      asteroids.find(
        (asteroid) =>
          Math.abs(asteroid.x - player.x) < asteroid.size * 0.65 &&
          Math.abs(asteroid.y - player.y) < asteroid.size * 0.65
      )
    ) {
      score >= parseInt(localStorage.getItem("highScore"))
        ? message.success(
            `Game over! Your score was ${score}, a new high score!`
          )
        : message.error(`Game over! Your score was ${score}.`);

      setAsteroids([]);
      setBullets([]);
      setScore(0);
      return;
    }

    if (keysDown["ArrowLeft"]) setPlayerRotation(playerRotation - 10);
    if (keysDown["ArrowRight"]) setPlayerRotation(playerRotation + 10);
    /////////////////////////////////////////////////////
    // Update asteroids
    /////////////////////////////////////////////////////
    const newAsteroids = asteroids
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
            newPosition.x < 0 - as.size
              ? size.width
              : newPosition.x > size.width
              ? 0
              : newPosition.x,
          y:
            newPosition.y < 0 - as.size
              ? size.height
              : newPosition.y > size.height
              ? 0
              : newPosition.y,
          rotation: as.rotation + as.curve * 4,
          curve: as.curve,
        };
      }) // destroy asteroid that get too close to bullets
      .filter(
        (asteroid) =>
          !bullets.find(
            (bullet) =>
              Math.abs(bullet.x - asteroid.x) < asteroid.size / 2 &&
              Math.abs(bullet.y - asteroid.y) < asteroid.size / 2
          )
      );
    setScore(score + asteroids.length - newAsteroids.length);
    if (
      !localStorage.getItem("highScore") ||
      score > parseInt(localStorage.getItem("highScore"))
    )
      localStorage.setItem("highScore", score.toString());
    setAsteroids(newAsteroids);
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
  return {
    player,
    playerRotation,
    asteroids,
    bullets,
    score,
    size,
    setAsteroids,
    setBullets,
  };
}
