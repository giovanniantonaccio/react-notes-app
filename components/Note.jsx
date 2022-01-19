import {
  message,
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
import { parseISO, formatDistance } from "date-fns";

const { Paragraph, Text } = Typography;

export default function Note({
  id,
  tags: xTags,
  title: xTitle,
  content: xContent,
  created_by,
  updated_at,
}) {
  const [title, setTitle] = useState(xTitle);
  const [content, setContent] = useState(xContent);
  const [tags, setTags] = useState(xTags);

  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);

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

  const handleSaveNote = () => {
    if (title === "") {
      message.error("Title cannot be empty");
      return;
    }
    if (content === "") {
      message.error("Content cannot be empty");
      return;
    }
    setIsAddingTag(false);
    setIsEditingMode(false);
    console.log("save", { title, content, tags });
    // TODO: api /updateNote
  };

  const handleDeleteNote = () => {
    console.log("delete", id);
  };

  const handleCancel = () => {
    setIsAddingTag(false);
    setIsEditingMode(false);
    setTitle(xTitle);
    setContent(xContent);
    setTags(xTags);
  };

  const ContextMenu = (
    <div style={{ margin: "-12px -16px", width: "120px" }}>
      <Col>
        <Button
          type="text"
          style={{ width: "100%", color: "#1890ff" }}
          icon={<EditOutlined />}
          onClick={() => setIsEditingMode(true)}
        >
          Edit
        </Button>
        <Button
          type="text"
          style={{ width: "100%", color: "red" }}
          icon={<DeleteOutlined />}
          onClick={handleDeleteNote}
        >
          Delete
        </Button>
      </Col>
    </div>
  );

  return (
    <Card
      title={
        <Paragraph
          editable={{
            editing: isEditingMode,
            icon: <></>,
            onChange: setTitle,
          }}
        >
          {title}
        </Paragraph>
      }
      extra={
        !isEditingMode && (
          <Popover placement="bottomRight" content={ContextMenu}>
            <Tooltip title="Menu">
              <Button type="text" shape="circle" icon={<MoreOutlined />} />
            </Tooltip>
          </Popover>
        )
      }
      style={{ width: "100%" }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Row align="middle">
          <Avatar size="small" icon={<UserOutlined />} />
          <Text italic style={{ marginLeft: "8px", color: "gray" }}>
            {created_by}
          </Text>
        </Row>

        <Paragraph
          style={{ left: 0 }}
          ellipsis={!isEditingMode ? { rows: 4 } : false}
          editable={{
            editing: isEditingMode,
            icon: <></>,
            onChange: setContent,
          }}
          onKeyDown={(e) => console.log(e)}
        >
          {content}
        </Paragraph>

        <Row gutter={[8, 8]}>
          {tags.map((tag) => (
            <Tag
              key={tag}
              closable={isEditingMode}
              onClose={() => handleDeleteTag(tag)}
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
          <Text italic style={{ color: "gray" }}>
            Last change: {formatDistance(parseISO(updated_at), new Date())}
          </Text>
        </Row>

        {isEditingMode && (
          <Row justify="end">
            <Space>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                type="primary"
                onClick={handleSaveNote}
                disabled={isAddingTag}
              >
                Save
              </Button>
            </Space>
          </Row>
        )}
      </Space>
    </Card>
  );
}
