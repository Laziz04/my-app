import React, { useState, useEffect } from "react";
import { Button, Table, Space, Input, Modal } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { MdOutlineRestartAlt } from "react-icons/md";
import { dataSource } from "./datas/teacherData";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: number;
  firstName: string;
  lastName: string;
  subject: string;
  email: string;
  phone: string;
}

const Oqituvchilar: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [teacherData, setTeacherData] = useState<DataType[]>(dataSource);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const filteredData = searchText
        ? filterData(dataSource, searchText)
        : dataSource;
      setTeacherData(filteredData);
      setLoading(false);
    }, 1000);
  }, [searchText]);

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
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDelete = (key: number) => {
    setTeacherData(teacherData.filter((data) => data.key !== key));
  };

  const columns: TableColumnsType<DataType> = [
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (_, record) => (
        <Space>
          <Button>Edit</Button>
          <Button onClick={() => handleDelete(record.key)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [addTeacher, setAddTeacher] = useState<DataType>({
    key: teacherData.length + 1,
    firstName: "",
    lastName: "",
    subject: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddTeacher({ ...addTeacher, [e.target.name]: e.target.value });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setTeacherData([...teacherData, addTeacher]);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div style={{ padding: "24px", backgroundColor: "#fff" }}>
      <button
        onClick={showModal}
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
      </button>
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
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          name="firstName"
          placeholder="First Name"
          value={addTeacher.firstName}
          onChange={handleInputChange}
        />
        <Input
          name="lastName"
          placeholder="Last Name"
          value={addTeacher.lastName}
          onChange={handleInputChange}
        />
        <Input
          name="subject"
          placeholder="Subject"
          value={addTeacher.subject}
          onChange={handleInputChange}
        />
        <Input
          name="email"
          placeholder="Email"
          value={addTeacher.email}
          onChange={handleInputChange}
        />
      </Modal>
    </div>
  );
};

export default Oqituvchilar;
