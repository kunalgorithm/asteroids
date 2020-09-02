import { message } from "antd";
import { useState } from "react";
import useInterval from "./useInterval";
import useWindowSize from "./useWindowSize";
import { createAsteroid } from "./Game";

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
  const [score, setScore] = useState(0);

  const [player, setPlayer] = useState([
    {
      x: 200,
      y: 400,
    },
  ]);
  const playerSpeed = 11;
  const [playerRotation, setPlayerRotation] = useState(90);
  const [snakeLength, setSnakeLength] = useState(1);

  const GAMEPLAY_FRAME_RATE = 70;

  useInterval(() => {
    /////////////////////////////////////////////////////
    // Update player
    /////////////////////////////////////////////////////
    const xComponent =
      playerSpeed * Math.cos(((playerRotation - 90) * Math.PI) / 180);
    const yComponent =
      playerSpeed * Math.sin(((playerRotation - 90) * Math.PI) / 180);

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

      //   score >= parseInt(localStorage.getItem("highScore"))
      //     ? message.success(
      //         `Game over! Your score was ${score}, a new high score!`
      //       )
      //     : message.error(`Game over! Your score was ${score}.`);

      //   setBullets([]);
      //   setScore(0);
      return;
    }

    Array(snakeLength)
      .fill(0)
      .forEach((_node, i) => {
        if (i >= 5 && isCollide(player[i * 4])) {
          message.error("game over!");
          setAsteroids([]);
          setSnakeLength(1);
        }
      });
    //  // Increase Snake length

    // //  score >= parseInt(localStorage.getItem("highScore"))
    // //  ? message.success(
    // //      `Game over! Your score was ${score}, a new high score!`
    // //    )
    // //  : message.error(`Game over! Your score was ${score}.`);

    // setSnakeLength(1);
    // setAsteroids([]);
    // setScore(0);
    // return;
    //         })
    //     })

    if (keysDown["ArrowLeft"]) setPlayerRotation(playerRotation - 10);
    if (keysDown["ArrowRight"]) setPlayerRotation(playerRotation + 10);

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

    setScore(score + asteroids.length - newAsteroids.length);
    if (
      !localStorage.getItem("highScore") ||
      score > parseInt(localStorage.getItem("highScore"))
    )
      localStorage.setItem("highScore", score.toString());
    setAsteroids(newAsteroids);
  }, GAMEPLAY_FRAME_RATE);
  return {
    player,
    playerRotation,
    asteroids,

    score,
    size,
    setAsteroids,

    snakeLength,
  };
}
