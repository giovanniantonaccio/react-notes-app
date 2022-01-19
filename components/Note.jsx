import { Button, Card, Tooltip } from "antd";
import React from "react";
import { MoreOutlined } from "@ant-design/icons";

export default function Note() {
  return (
    <Card
      title="Default size card"
      extra={
        <Tooltip title="Menu">
          <Button type="text" shape="circle" icon={<MoreOutlined />} />
        </Tooltip>
      }
      style={{ width: "100%" }}
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
}
