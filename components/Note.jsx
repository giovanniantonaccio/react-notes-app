import { Button, Card, Col, Popover, Tooltip } from "antd";
import React from "react";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styles from "../styles/Note.module.css";

export default function Note() {
  const content = (
    <Col>
      <Button type="text" style={{ width: "100%" }} icon={<EditOutlined />}>
        Edit
      </Button>
      <Button
        type="text"
        style={{ width: "100%", color: "red" }}
        icon={<DeleteOutlined />}
      >
        Delete
      </Button>
    </Col>
  );

  return (
    <Card
      title="Default size card"
      extra={
        <Popover placement="bottomRight" content={content}>
          <Tooltip title="Menu">
            <Button type="text" shape="circle" icon={<MoreOutlined />} />
          </Tooltip>
        </Popover>
      }
      style={{ width: "100%" }}
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
}
