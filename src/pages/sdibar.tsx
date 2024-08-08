import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Dashboard from "./dashbo";
import Cost from "./cost";
import Appliances from "./aplicanse";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <FaHome className="h-6 w-6" />,
              label: <Link to="/">Dashboard</Link>,
            },
            {
              key: "2",
              icon: <FaHome className="h-6 w-6" />,
              label: <Link to="/cost">Cost</Link>,
            },
            {
              key: "3",
              icon: <FaHome className="h-6 w-6" />,
              label: <Link to="/appliances">Appliances</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cost" element={<Cost />} />
            <Route path="/appliances" element={<Appliances />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
