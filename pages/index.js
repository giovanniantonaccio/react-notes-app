import { useState } from "react";
import { Button, Layout, Row } from "antd";

import NotesMenuHeader from "../components/NotesMenuHeader";
import NotesMenuBody from "../components/NotesMenuBody";
import SideMenu from "../components/SideMenu";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FormOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

export default function Home() {
  const [isSideMenuCollapsed, setIsSideMenuCollapsed] = useState(false);
  const [isNotesMenuCollapsed, setIsNotesMenuCollapsed] = useState(false);

  return (
    <Layout hasSider>
      <Sider
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
      </Sider>
      <Layout
        style={{
          height: "100vh",
          marginLeft: isSideMenuCollapsed ? "80px" : "200px",
          transition: "margin-left 0.2s",
        }}
      >
        <Header style={{ background: "#fff", padding: "0 16px" }}>
          <Row justify="space-between" style={{ padding: "16px" }}>
            <Button
              type="text"
              shape={"circle"}
              icon={
                isSideMenuCollapsed ? (
                  <MenuUnfoldOutlined />
                ) : (
                  <MenuFoldOutlined />
                )
              }
              onClick={() => setIsSideMenuCollapsed(!isSideMenuCollapsed)}
            />
            <Button
              type="text"
              shape={"circle"}
              icon={<FormOutlined />}
              onClick={() => setIsNotesMenuCollapsed(!isNotesMenuCollapsed)}
            />
          </Row>
        </Header>
        <Content>
          {/* <Content style={{ margin: "24px 16px 0", overflow: "initial" }}> */}
          <div
          // style={{ padding: 24, textAlign: "center" }}
          >
            <iframe
              style={{ height: "calc(100vh - 70px)", width: "100%" }}
              src="https://www.conversica.com/"
            ></iframe>
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
          }}
          // collapsible
          // collapsed={isNotesMenuCollapsed}
          // collapsedWidth={0}
          width={300}
        >
          <NotesMenuHeader onClose={() => setIsNotesMenuCollapsed(true)} />
          <NotesMenuBody />
        </Sider>
      )}
    </Layout>
  );
}
