import { UpCircleOutlined, DeploymentUnitOutlined } from "@ant-design/icons";

import { useMovement } from "./useMovement";

export default ({ asteroid }) => {
  // const position = useMovement(tick);

  return (
    <DeploymentUnitOutlined
      style={{
        fontSize: "3em",
        position: "absolute",
        left: `${asteroid.x}px`,
        top: `${asteroid.y}px`,
      }}
      rotate={asteroid.rotation}
    />
  );
};
