import {
  UpCircleOutlined,
  DeploymentUnitOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";

import { useMovement } from "./useMovement";

export default ({ x, y, rotation, size }) => {
  // const position = useMovement(tick);
  return (
    <RadarChartOutlined
      style={{
        fontSize: `${size}px`,
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
      }}
      rotate={rotation}
    />
  );
};
