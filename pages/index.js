import { useState } from "react";
import { Button, Layout, Row, Tooltip } from "antd";

import NotesMenuHeader from "../components/NotesMenuHeader";
import NotesMenuBody from "../components/NotesMenuBody";
import SideMenu from "../components/SideMenu";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FormOutlined,
} from "@ant-design/icons";

import Image from "next/image";

const { Header, Content, Footer, Sider } = Layout;

export default function Home() {
  const [isSideMenuCollapsed, setIsSideMenuCollapsed] = useState(false);
  const [isNotesMenuCollapsed, setIsNotesMenuCollapsed] = useState(false);

  return (
    <Layout hasSider>
      {/* <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        collapsible
        collapsed={isSideMenuCollapsed}
      >
        <SideMenu />
      </Sider> */}
      <Layout
        style={{
          height: "100vh",
          // marginLeft: isSideMenuCollapsed ? "80px" : "200px",
          // transition: "margin-left 0.2s",
        }}
      >
        <Tooltip title="Check notes">
          <Button
            type="primary"
            shape={"circle"}
            icon={<FormOutlined style={{ fontSize: "24px" }} />}
            onClick={() => setIsNotesMenuCollapsed(!isNotesMenuCollapsed)}
            style={{
              position: "fixed",
              bottom: "40px",
              right: "40px",
              zIndex: 1,
              width: "64px",
              height: "64px",
            }}
          />
        </Tooltip>
        <Content>
          {/* <Content style={{ margin: "24px 16px 0", overflow: "initial" }}> */}
          <div
          // style={{ padding: 24, textAlign: "center" }}
          >
            <Image
              alt="page-mock-1"
              src="/dashboard.png"
              layout="responsive"
              width="1244"
              height="960"
              style={{ zIndex: -10, marginTop: "-64px" }}
            />
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Conversica ©2022 Created by Hackaton Team Z
        </Footer> */}
      </Layout>
      {!isNotesMenuCollapsed && (
        <Sider
          style={{
            height: "100vh",
            position: "fixed",
            right: 0,
            top: 0,
            bottom: 0,
            background: "#fafafa",
            transition: "width 0",
            zIndex: 2,
          }}
          width={300}
        >
          <NotesMenuHeader onClose={() => setIsNotesMenuCollapsed(true)} />
          <NotesMenuBody />
        </Sider>
      )}
    </Layout>
  );
}
