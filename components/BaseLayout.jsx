import { useState } from "react";
import { Button, Layout, Tooltip } from "antd";

import NotesMenuHeader from "../components/NotesMenuHeader";
import NotesMenuBody from "../components/NotesMenuBody";
import { FormOutlined } from "@ant-design/icons";

import Image from "next/image";
import { useRouter } from "next/router";

const { Content, Sider } = Layout;

export default function BaseLayout({ background }) {
  const [isNotesMenuCollapsed, setIsNotesMenuCollapsed] = useState(true);

  const { pathname, push } = useRouter();

  const handleNavigation = () => {
    if (pathname === "/") {
      push("/conversation");
    } else {
      push("/");
    }
  };

  return (
    <Layout hasSider>
      <Layout
        style={{
          height: "100vh",
        }}
      >
        <div
          style={{
            background: "transparent",
            height: "64px",
            width: "100%",
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 1,
            cursor: "pointer",
          }}
          onClick={handleNavigation}
        />
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
          <div>
            <Image
              alt="page-background"
              src={background}
              layout="responsive"
              width="1244"
              height="960"
              style={{ zIndex: -10 }}
            />
          </div>
        </Content>
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
