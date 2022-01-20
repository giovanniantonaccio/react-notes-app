import React from "react";
import { Typography, Input } from "antd";
const { Paragraph } = Typography;

export default function NoteTitle({ editing, onChange, title }) {
  if (editing) {
    return (
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add a title..."
        defaultValue={title}
      />
    );
  }

  return <Paragraph>{title}</Paragraph>;
}
