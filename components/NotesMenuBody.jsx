import { Button, Card, Col, Row, Space } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import Note from "./Note";

export default function NotesMenuBody() {
  return (
    <Col>
      <Row
        justify="center"
        style={{ width: "100%", padding: "16px", background: "#fafafa" }}
      >
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Add new note
        </Button>
      </Row>
      <Col
        style={{
          padding: "16px",
          paddingTop: 0,
          height: "100vh",
          overflow: "auto",
          width: "100%",
        }}
      >
        <Space
          direction="vertical"
          style={{ width: "100%", marginBottom: "150px" }}
        >
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
        </Space>
      </Col>
    </Col>
  );
}
