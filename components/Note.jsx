import {
  Button,
  Card,
  Col,
  Input,
  Popover,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import React, { useState } from "react";
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
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [tags, setTags] = useState(["as", "conversations", "tips"]);

  const handleAddTag = (e) => {
    setTags([...tags, e.target.value]);
    setIsAddingTag(false);
  };

  const handleDeleteTag = (tag) => {
    const newTags = [...tags];
    const index = newTags.indexOf(tag);
    if (index > -1) {
      newTags.splice(index, 1);
      setTags(newTags);
    }
  };

  const Menu = (
    <div style={{ margin: "-12px -16px" }}>
      <Col>
        <Button
          type="text"
          style={{ width: "100%" }}
          icon={<EditOutlined />}
          onClick={() => setIsEditingMode(true)}
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

  // useEffect(() => {
  //   console.log(title, content);
  // }, [title, content]);

  const contentChange = (e) => {
    // console.log(e);
    setContent(e);
  };

  return (
    <Card
      title={
        <Typography.Paragraph
          editable={{ editing: isEditingMode, icon: <></>, onChange: setTitle }}
        >
          {title}
        </Typography.Paragraph>
      }
      extra={
        !isEditingMode && (
          <Popover placement="bottomRight" content={Menu}>
            <Tooltip title="Menu">
              <Button type="text" shape="circle" icon={<MoreOutlined />} />
            </Tooltip>
          </Popover>
        )
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
          style={{ left: 0 }}
          ellipsis={!isEditingMode ? { rows: 4 } : false}
          editable={{
            editing: isEditingMode,
            icon: <></>,
            onChange: contentChange,
          }}
        >
          {content}
        </Typography.Paragraph>

        <Row gutter={[8, 8]}>
          {tags.map((tag) => (
            <Tag
              key={tag}
              closable={isEditingMode}
              onClose={(e) => {
                e.preventDefault();
                handleDeleteTag(tag);
              }}
            >
              {tag}
            </Tag>
          ))}
          {isEditingMode && !isAddingTag && (
            <Tooltip title="Add new tag">
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                size="small"
                onClick={() => setIsAddingTag(!isAddingTag)}
              >
                Add tag
              </Button>
            </Tooltip>
          )}
          {isAddingTag && (
            <Input placeholder="Add new tag..." onPressEnter={handleAddTag} />
          )}
        </Row>

        <Row>
          <Typography.Text italic style={{ color: "gray" }}>
            Last change: 2 hours ago
          </Typography.Text>
        </Row>
        {isEditingMode && (
          <Row justify="end">
            <Button
              type="primary"
              onClick={(e) => {
                setIsEditingMode(false);
              }}
              disabled={title === "" || content === "" || isAddingTag}
            >
              Save
            </Button>
          </Row>
        )}
      </Space>
    </Card>
  );
}
