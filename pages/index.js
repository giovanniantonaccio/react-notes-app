import { useState } from "react";
import { Button, Layout } from "antd";

import NotesMenuHeader from "../components/NotesMenuHeader";
import NotesMenuBody from "../components/NotesMenuBody";
import SideMenu from "../components/SideMenu";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

export default function Home() {
  const [isSideMenuCollapsed, setIsSideMenuCollapsed] = useState(false);

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
        <Header style={{ padding: 0, background: "#fff", padding: "0 16px" }}>
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
          ></Button>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center" }}
          ></div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
      <Sider
        style={{
          height: "100vh",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          background: "#fafafa",
        }}
        width={300}
      >
        <NotesMenuHeader />
        <NotesMenuBody />
      </Sider>
    </Layout>
  );
}
