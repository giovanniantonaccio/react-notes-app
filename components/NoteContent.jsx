import React from "react";
import { Typography, Input } from "antd";

const { Paragraph } = Typography;
const { TextArea } = Input;

export default function NoteContent({ isEditing, onChange, content }) {
  if (isEditing) {
    return (
      <TextArea
        defaultValue={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Take a note..."
        autoSize={{ minRows: 4 }}
      />
    );
  }

  return (
    <Paragraph style={{ left: 0 }} ellipsis={!isEditing ? { rows: 4 } : false}>
      {content}
    </Paragraph>
  );
}
