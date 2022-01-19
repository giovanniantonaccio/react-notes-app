import React, { useState } from "react";
import { Button, Col, Row, Space, Tooltip, Typography, Input } from "antd";
import {
  SearchOutlined,
  ExpandAltOutlined,
  CloseOutlined,
} from "@ant-design/icons";

export default function NotesMenuHeader() {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  return (
    <Row
      style={{
        padding: "16px",
        borderBottom: "1px solid #d9d9d9",
      }}
      align="middle"
    >
      {!isSearching ? (
        <>
          <Col flex="auto">
            <Typography.Text style={{ fontWeight: "normal", fontSize: "20px" }}>
              Notes
            </Typography.Text>
          </Col>
          <Col>
            <Space>
              <Tooltip title="Search">
                <Button
                  shape="circle"
                  icon={<SearchOutlined />}
                  onClick={() => setIsSearching(true)}
                />
              </Tooltip>
              <Tooltip title="Expand">
                <Button shape="circle" icon={<ExpandAltOutlined />} />
              </Tooltip>
              <Tooltip title="Close">
                <Button shape="circle" icon={<CloseOutlined />} />
              </Tooltip>
            </Space>
          </Col>
        </>
      ) : (
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search Note..."
          prefix={<SearchOutlined />}
          suffix={
            <Tooltip title="Cancel">
              <Button
                type="text"
                shape="circle"
                icon={<CloseOutlined />}
                size="small"
                onClick={() => {
                  setIsSearching(false);
                  setSearch("");
                }}
              />
            </Tooltip>
          }
        />
      )}
    </Row>
  );
}
