import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { FaHome } from "react-icons/fa";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashbo";
import Cost from "./cost";
import Appliances from "./aplicanse";

const { Header, Sider, Content } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "1",
      icon: <FaHome className="h-6 w-6" />,
      label: "Dashboard",
      path: "/",
    },
    {
      key: "2",
      icon: <FaHome className="h-6 w-6" />,
      label: "Cost",
      path: "/cost",
    },
    {
      key: "3",
      icon: <FaHome className="h-6 w-6" />,
      label: "Appliances",
      path: "/appliances",
    },
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
          }))}
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

export default Sidebar;
