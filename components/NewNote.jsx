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
import { PlusOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

export default function NewNote({ onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

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
    // TODO: api /newNote
    onSave({ title, content, tags });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Card
      title={
        <Paragraph
          editable={{
            editing: true,
            icon: <></>,
            onChange: setTitle,
          }}
        >
          {title}
        </Paragraph>
      }
      style={{ width: "100%" }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Paragraph
          style={{ left: 0 }}
          editable={{
            editing: true,
            icon: <></>,
            onChange: setContent,
            autoSize: {
              minRows: 4,
            },
          }}
          onKeyDown={(e) => console.log(e)}
        >
          {content}
        </Paragraph>

        <Row gutter={[8, 8]}>
          {tags.map((tag) => (
            <Tag key={tag} closable onClose={() => handleDeleteTag(tag)}>
              {tag}
            </Tag>
          ))}
          {!isAddingTag && (
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
      </Space>
    </Card>
  );
}
