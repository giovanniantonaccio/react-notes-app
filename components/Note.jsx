import {
  Button,
  Card,
  Col,
  Popover,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  MoreOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";

const defaultContent = ` Ant Design, a design language for background applications, is refined by
Ant UED Team. Ant Design, a design language for background applications,
is refined by Ant UED Team. Ant Design, a design language for background
applications, is refined by Ant UED Team. Ant Design, a design language
for background applications, is refined by Ant UED Team. Ant Design, a
design language for background applications, is refined by Ant UED Team.
Ant Design, a design language for background applications, is refined by
Ant UED Team.`;

export default function Note() {
  const [title, setTitle] = useState("Default Title");
  const [content, setContent] = useState(defaultContent);
  const [editingMode, setEditingMode] = useState(false);

  const Menu = (
    <div style={{ margin: "-12px -16px" }}>
      <Col>
        <Button
          type="text"
          style={{ width: "100%" }}
          icon={<EditOutlined />}
          onClick={() => setEditingMode(true)}
        >
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

  useEffect(() => {
    console.log(title, content);
  }, [title, content]);

  const contentChange = (e) => {
    console.log(e);
    setContent(e);
  };

  return (
    <Card
      title={
        <Typography.Paragraph
          editable={{ editing: editingMode, icon: <></>, onChange: setTitle }}
        >
          {title}
        </Typography.Paragraph>
      }
      extra={
        <Popover placement="bottomRight" content={Menu}>
          <Tooltip title="Menu">
            <Button type="text" shape="circle" icon={<MoreOutlined />} />
          </Tooltip>
        </Popover>
      }
      style={{ width: "100%" }}
    >
      <Space direction="vertical">
        <Row align="middle">
          <Avatar size="small" icon={<UserOutlined />} />
          <Typography.Text italic style={{ marginLeft: "8px", color: "gray" }}>
            Giovanni Antonaccio
          </Typography.Text>
        </Row>
        <Typography.Paragraph
          ellipsis={!editingMode ? { rows: 4 } : false}
          editable={{
            editing: editingMode,
            icon: <></>,
            onChange: contentChange,
          }}
        >
          {content}
        </Typography.Paragraph>

        <Row gutter={[8, 8]}>
          <Tag color="magenta">magenta</Tag>
          <Tag color="red">red</Tag>
          {/* <Tag color="volcano">long text</Tag> */}
          <Tooltip title="Add new tag">
            <Button
              type="ghost"
              shape="circle"
              icon={<PlusOutlined />}
              size="small"
            ></Button>
          </Tooltip>
        </Row>

        <Row>
          {/* <div>
            <CalendarOutlined style={{ color: "gray" }} />
          </div> */}
          <Typography.Text italic style={{ color: "gray" }}>
            Last change: 2 hours ago
          </Typography.Text>
        </Row>

        {editingMode && (
          <Row justify="end">
            <Button
              type="primary"
              onClick={(e) => {
                setEditingMode(false);
              }}
              disabled={title === "" || content === ""}
            >
              Save
            </Button>
          </Row>
        )}
      </Space>
    </Card>
  );
}
