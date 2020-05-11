import { Row, Col, Popover, Alert } from "antd";

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
      <Col sm={{ span: 8, order: 1 }} md={{ span: 8 }}>
        <h4 style={{ marginTop: "-20px" }}>Score: {score}</h4>
      </Col>
      <Col
        md={8}
        sm={{ span: 12, order: 3, offset: 6 }}
        xs={{ span: 16, order: 3, offset: 4 }}
      >
        {" "}
        <Alert
          message="Click the game to start."
          className="alert"
          description="The game window is not currently in focus."
          type="info"
          showIcon
        />{" "}
      </Col>
      <Col
        md={8}
        sm={{ span: 4, order: 2, offset: 8 }}
        xs={{ span: 8, order: 2 }}
      >
        <h4 style={{ marginTop: "-20px", textAlign: "right" }}>
          High Score:{" "}
          {typeof window !== "undefined" && localStorage.getItem("highScore")
            ? localStorage.getItem("highScore")
            : 0}
        </h4>
      </Col>

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
    x: size.width / 2,
    y: size.height / 2,
    speed: 15,
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
      });
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
