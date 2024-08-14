import React, { useState, useEffect } from "react";
import { Button, Table, Space, Input, Modal, Form } from "antd";
import { MdOutlineRestartAlt } from "react-icons/md";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";

interface DataType {
  key: number;
  firstName: string;
  lastName: string;
  className: string;
  subject: string;
  email: string;
  phone: string;
}

const API_URL = "https://c7bdff0b28aa98c1.mokky.dev/student";

const Oqituvchilar: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [teacherData, setTeacherData] = useState<DataType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<DataType | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL)
      .then((response) => {
        setTeacherData(response.data);
        localStorage.setItem("teacherData", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Failed to fetch data", error);
        const storedData = localStorage.getItem("teacherData");
        if (storedData) {
          setTeacherData(JSON.parse(storedData));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!searchText) {
      return;
    }
    const filteredData = filterData(teacherData, searchText);
    setTeacherData(filteredData);
  }, [searchText]);

  useEffect(() => {
    localStorage.setItem("teacherData", JSON.stringify(teacherData));
  }, [teacherData]);

  const filterData = (data: DataType[], search: string) => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText("");
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDelete = (key: number) => {
    axios
      .delete(`${API_URL}/${key}`)
      .then(() => {
        setTeacherData(teacherData.filter((data) => data.key !== key));
      })
      .catch((error) => {
        console.error("Failed to delete data", error);
      });
  };

  const handleAddModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        axios
          .post(API_URL, values)
          .then((response) => {
            setTeacherData([
              ...teacherData,
              { key: response.data.id, ...values } as DataType,
            ]);
            setIsAddModalOpen(false);
            form.resetFields();
          })
          .catch((error) => {
            console.error("Failed to add data", error);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleEditModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (currentTeacher) {
          axios
            .put(`${API_URL}/${currentTeacher.key}`, values)
            .then(() => {
              setTeacherData(
                teacherData.map((teacher) =>
                  teacher.key === currentTeacher.key
                    ? { ...currentTeacher, ...values }
                    : teacher
                )
              );
              setIsEditModalOpen(false);
              form.resetFields();
            })
            .catch((error) => {
              console.error("Failed to edit data", error);
            });
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleAddModalCancel = () => {
    setIsAddModalOpen(false);
  };

  const handleEditModalCancel = () => {
    setIsEditModalOpen(false);
  };

  const handleEdit = (teacher: DataType) => {
    setCurrentTeacher(teacher);
    form.setFieldsValue(teacher);
    setIsEditModalOpen(true);
  };

  const columns = [
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    {
      title: "Class",
      dataIndex: "className",
      key: "className",
    },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (_: any, record: DataType) => (
        <Space size="small" style={{ fontSize: 20 }}>
          <a onClick={() => handleEdit(record)}>
            <EditOutlined />
          </a>
          <a
            onClick={() => handleDelete(record.key)}
            style={{ color: "#f5222d" }}
          >
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div style={{ padding: "24px", backgroundColor: "#fff" }}>
      <Button
        onClick={() => setIsAddModalOpen(true)}
        style={{
          backgroundColor: "#3498db",
          color: "#fff",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s ease",
          border: "none",
          marginBottom: "10px",
        }}
      >
        O'qituvchi qo'shish
      </Button>
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Input
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            outline: "none",
            fontSize: "16px",
            width: "100%",
          }}
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={onSearchChange}
        />
        <Button
          onClick={handleClearSearch}
          style={{
            backgroundColor: "#3498db",
            color: "#fff",
            padding: "10px",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
            border: "none",
          }}
        >
          <MdOutlineRestartAlt />
        </Button>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={teacherData}
        pagination={{ pageSize: 5 }}
        loading={loading}
      />

      <Modal
        title="Add Teacher"
        open={isAddModalOpen}
        onOk={handleAddModalOk}
        onCancel={handleAddModalCancel}
      >
        <Form form={form} layout="vertical" name="addTeacherForm">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please input the first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please input the last name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="className"
            label="Class"
            rules={[{ required: true, message: "Please input the class!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: "Please input the subject!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Teacher"
        open={isEditModalOpen}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
      >
        <Form form={form} layout="vertical" name="editTeacherForm">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please input the first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please input the last name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="className"
            label="Class"
            rules={[{ required: true, message: "Please input the class!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: "Please input the subject!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Oqituvchilar;
