import { UpCircleOutlined, DeploymentUnitOutlined } from "@ant-design/icons";

import { useMovement } from "./useMovement";

export default ({ tick }) => {
  const position = useMovement(tick);

  return (
    <DeploymentUnitOutlined
      style={{
        fontSize: "3em",
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      rotate={position.rotation}
    />
  );
};
