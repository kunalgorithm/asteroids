import { message } from "antd";
import { useState } from "react";
import useInterval from "./useInterval";
import useWindowSize from "./useWindowSize";
import { createAsteroid, SNAKE_TAIL_INCREMENT } from "./Game";

export function useGameUpdate(keysDown) {
  function isCollide(object: { x: number; y: number; size?: number }) {
    const size = object.size || 40;
    return (
      Math.abs(object.x - player[0].x) < size &&
      Math.abs(object.y - player[0].y) < size
    );
  }

  const size = useWindowSize();
  const [asteroids, setAsteroids] = useState([
    createAsteroid(size),
    createAsteroid(size),
    createAsteroid(size),
    createAsteroid(size),
  ]);

  const [player, setPlayer] = useState([
    {
      x: 200,
      y: 400,
    },
  ]);
  const PLAYER_SPEED = 16;
  const [playerRotation, setPlayerRotation] = useState(90);
  const [snakeLength, setSnakeLength] = useState(1);

  const GAMEPLAY_FRAME_RATE = 65;

  useInterval(() => {
    /////////////////////////////////////////////////////
    // Update player
    /////////////////////////////////////////////////////
    const xComponent =
      PLAYER_SPEED * Math.cos(((playerRotation - 90) * Math.PI) / 180);
    const yComponent =
      PLAYER_SPEED * Math.sin(((playerRotation - 90) * Math.PI) / 180);

    const newPosition = {
      x: player[0].x + xComponent,
      y: player[0].y + yComponent,
    };
    setPlayer([
      {
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
      },
      ...player,
    ]);

    if (asteroids.find((asteroid) => isCollide(asteroid))) {
      // Increase Snake length
      setSnakeLength(snakeLength + 1);
      setAsteroids(asteroids.filter((as) => !isCollide(as)));

      return;
    }

    Array(snakeLength)
      .fill(0)
      .forEach((_node, i) => {
        if (i >= 5 && isCollide(player[i * SNAKE_TAIL_INCREMENT])) {
          snakeLength >= parseInt(localStorage.getItem("highScore"))
            ? message.success(
                `Game over! Your score was ${snakeLength}, a new high score!`
              )
            : message.error(`Game over! Your score was ${snakeLength}.`);
          setAsteroids([]);
          setSnakeLength(1);
        }
      });

    if (keysDown["ArrowLeft"]) setPlayerRotation(playerRotation - 14);
    if (keysDown["ArrowRight"]) setPlayerRotation(playerRotation + 14);

    /////////////////////////////////////////////////////
    // Update asteroids
    /////////////////////////////////////////////////////
    const newAsteroids = asteroids.map((as) => {
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
    });

    if (
      !localStorage.getItem("highScore") ||
      snakeLength > parseInt(localStorage.getItem("highScore"))
    )
      localStorage.setItem("highScore", snakeLength.toString());
    setAsteroids(newAsteroids);
  }, GAMEPLAY_FRAME_RATE);
  return {
    player,
    playerRotation,
    asteroids,
    size,
    setAsteroids,
    snakeLength,
  };
}
