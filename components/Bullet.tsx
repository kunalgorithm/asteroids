import { RocketFilled } from "@ant-design/icons";

import { useMovement } from "./useMovement";

export default ({ x, y, rotation }) => {
  // const position = useMovement(tick);

  return (
    <RocketFilled
      style={{
        fontSize: "1em",
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
      }}
      rotate={rotation}
    />
  );
};
