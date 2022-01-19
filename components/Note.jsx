import { Button, Card, Col, Popover, Tooltip } from "antd";
import React from "react";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function Note() {
  const content = (
    <div style={{ margin: "-12px -16px" }}>
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
    </div>
  );

  return (
    <Card
      title="Default size card"
      extra={
        <Popover
          placement="bottomRight"
          content={content}
          trigger="click"
          style={{ padding: "0 !important" }}
        >
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
