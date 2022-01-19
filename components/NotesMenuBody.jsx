import { Button, Col, Row, Space } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import Note from "./Note";

const notes = [
  {
    id: "1",
    tags: ["INFO"],
    title: "TESTING 1",
    type: "GLO",
    page_url: "https://www.djangoproject.com/",
    anchor: "lorem ipsum",
    thumbs_count: 2,
    created_by: "Giovanni Antonaccio",
    content:
      "Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications.",
    created_at: "2019-10-31T01:30:00.000-05:00",
    updated_at: "2019-10-31T01:30:00.000-05:00",
  },
  {
    id: "2",
    tags: ["tag1", "tag2"],
    title: "TESTING 2",
    type: "GLO",
    page_url: "https://www.djangoproject.com/",
    anchor: "lorem ipsum",
    thumbs_count: 2,
    created_by: "Allison Barros",
    content:
      "In most business situations, Ant Design needs to solve a lot of information storage problems within the design area, so based on 12 Grids System, we divided the design area into 24 sections.",
    created_at: "2019-10-31T01:30:00.000-05:00",
    updated_at: "2019-10-31T01:30:00.000-05:00",
  },
];

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
          {notes.map((note) => {
            const { id, tags, title, content, created_by, updated_at } = note;
            return (
              <Note
                key={id}
                tags={tags}
                title={title}
                content={content}
                created_by={created_by}
                updated_at={updated_at}
              />
            );
          })}
        </Space>
      </Col>
    </Col>
  );
}
