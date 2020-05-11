import { Col, Alert } from "antd";

export function Scoreboard({ score }: { score: number }) {
  return (
    <>
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
          style={{ marginTop: "-15em" }}
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
    </>
  );
}
