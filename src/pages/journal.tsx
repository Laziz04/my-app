import React, { useState, useEffect } from "react";
import { Layout, Menu, Select, Button, Table, Spin } from "antd";
import {
  MenuUnfoldOutlined,
  UserOutlined,
  AppstoreOutlined,
  FileOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "antd/dist/reset.css";
import "../dasd.css";

const { Header, Sider, Content } = Layout;
const { Option } = Select;

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  className: string;
  subject: string;
  teachername: string;
  teacherlastname: string;
}

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<string[]>(["1-B", "2-A", "3-C"]);
  const [quarters, setQuarters] = useState<string[]>(["1", "2", "3", "4"]);
  const [subjects, setSubjects] = useState<string[]>([
    "Geometriya",
    "Matematika",
    "Fizika",
  ]);
  const [groups, setGroups] = useState<string[]>([
    "Biriktilmagan",
    "Guruh 1",
    "Guruh 2",
  ]);

  useEffect(() => {
    axios
      .get<Student[]>("https://c7bdff0b28aa98c1.mokky.dev/student")
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("APIdan ma'lumot olishda xatolik:", error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "F.I.Sh",
      dataIndex: "fullName",
      key: "fullName",
      width: 150,
      render: (_: any, record: Student) =>
        `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Sinfi",
      dataIndex: "className",
      key: "className",
      width: 100,
    },
    {
      title: "Fan",
      dataIndex: "subject",
      key: "subject",
      width: 100,
    },
    {
      title: "O'qituvchi",
      dataIndex: "teacher",
      key: "teacher",
      width: 150,
      render: (_: any, record: Student) =>
        `${record.teachername} ${record.teacherlastname}`,
    },
  ];

  return (
    <Layout className="app-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="app-sider"
      >
        <div className="app-logo">
          <MenuUnfoldOutlined
            className="app-menu-icon"
            onClick={() => setCollapsed(!collapsed)}
          />
          <div
            className={`app-logo-text ${collapsed ? "hidden" : "inline-block"}`}
          >
            EFFCOS - education
          </div>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Mavzular
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            Baholar
          </Menu.Item>
          <Menu.Item key="3" icon={<FileOutlined />}>
            Davomat
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="app-header">
          <div className="app-header-title">EFFCOS - education</div>
        </Header>
        <Content className="app-content">
          <div className="app-filters">
            <Select defaultValue={classes[0]} className="app-select">
              {classes.map((cls) => (
                <Option key={cls} value={cls}>
                  {cls}
                </Option>
              ))}
            </Select>
            <Select defaultValue={quarters[0]} className="app-select">
              {quarters.map((quarter) => (
                <Option key={quarter} value={quarter}>
                  {quarter}
                </Option>
              ))}
            </Select>
            <Select defaultValue={subjects[0]} className="app-select">
              {subjects.map((subject) => (
                <Option key={subject} value={subject}>
                  {subject}
                </Option>
              ))}
            </Select>
            <Select defaultValue={groups[0]} className="app-select">
              {groups.map((group) => (
                <Option key={group} value={group}>
                  {group}
                </Option>
              ))}
            </Select>
          </div>
          <div className="app-buttons">
            <Button type="primary">Baholash/Davomat</Button>
            <Button type="primary">Excelga export</Button>
          </div>
          {loading ? (
            <div className="app-spin-container">
              <Spin size="large" />
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={students}
              pagination={false}
              scroll={{ x: 1000 }}
              rowKey="id"
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
