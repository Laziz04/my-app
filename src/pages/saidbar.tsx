import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiParentFill } from "react-icons/ri";
import { FaBookBookmark } from "react-icons/fa6";
import Dashboard from "./dashboard";
import Oquvchilar from "./Readers";
import Otaonalar from "./Otaonalar";
import Oqituvchilar from "./teachers";
import Jurnal from "./journal";
import "../App.css"; // Add custom styles
import Siniflar from "./siniflar";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: "97vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
        <div className="sidebar-profile">
          <img
            style={{
              cursor: "pointer",
            }}
            src="https://i.pinimg.com/564x/77/df/cc/77dfcca14d6d45f11b95a11e98a5cf1e.jpg"
            alt="User"
            className="profile-img"
          />
          <div className="profile-info">
            <p>FullName</p>
            <div className="stars">⭐⭐⭐</div>
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <FaHome className="h-6 w-6" />,
              label: <Link to="/">Home</Link>,
            },
            {
              key: "2",
              icon: <GiTeacher className="h-6 w-6" />,
              label: <Link to="/O'qituvchilar">O'qituvchilar</Link>,
            },
            {
              key: "3",
              icon: <BsFillPeopleFill className="h-6 w-6" />,
              label: <Link to="/O'quvchilar">O'quvchilar</Link>,
            },
            {
              key: "4",
              icon: <BsFillPeopleFill className="h-6 w-6" />,
              label: <Link to="/siniflar">O'siniflar</Link>,
            },
            {
              key: "5",
              icon: <RiParentFill className="h-6 w-6" />,
              label: <Link to="/Otaonalar">Ota onalar</Link>,
            },
            {
              key: "6",
              icon: <FaBookBookmark className="h-6 w-6" />,
              label: <Link to="/Jurnal">Jurnal</Link>,
            },
          ]}
        />
        <Button className="logout-btn">out</Button>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#fff" }}>
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
            background: "#fff",
            borderRadius: "8px",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/O'qituvchilar" element={<Oqituvchilar />} />
            <Route path="/O'quvchilar" element={<Oquvchilar />} />
            <Route path="/siniflar" element={<Siniflar />} />
            <Route path="/Otaonalar" element={<Otaonalar />} />
            <Route path="/Jurnal" element={<Jurnal />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
