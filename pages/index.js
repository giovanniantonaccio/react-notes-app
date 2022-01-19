import { useState } from "react";
import { Button, Layout } from "antd";

import NotesMenuHeader from "../components/NotesMenuHeader";
import NotesMenuBody from "../components/NotesMenuBody";
import SideMenu from "../components/SideMenu";
import styles from "../styles/Home.module.css";
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
      <Layout className={styles["site-layout"]} style={{ marginLeft: 200 }}>
        <Header
          className={styles["site-layout-background"]}
          style={{ padding: 0 }}
        >
          <Button
            type="primary"
            onClick={() => setIsSideMenuCollapsed(!isSideMenuCollapsed)}
          >
            Menu
          </Button>
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
          // overflow: "auto",
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
