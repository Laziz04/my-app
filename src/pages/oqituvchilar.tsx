import React, { useState } from "react";
import { Button, Table, Space } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { MdOutlineRestartAlt } from "react-icons/md";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: number;
  firstName: string;
  lastName: string;
  subject: string;
  email: string;
  phone: string;
}

// Data Source
const dataSource: DataType[] = [
  {
    key: 1,
    firstName: "Sarvar",
    lastName: "Akramov",
    subject: "Matematika",
    email: "sarvar.akramov@example.com",
    phone: "+998901234567",
  },
  {
    key: 2,
    firstName: "Dilnoza",
    lastName: "Karimova",
    subject: "Ingliz tili",
    email: "dilnoza.karimova@example.com",
    phone: "+998901234568",
  },
  {
    key: 3,
    firstName: "Abdulloh",
    lastName: "Raxmatullayev",
    subject: "Fizika",
    email: "abdulloh.raxmatullayev@example.com",
    phone: "+998901234569",
  },
  {
    key: 4,
    firstName: "Gulbahor",
    lastName: "Sobirova",
    subject: "Kimyo",
    email: "gulbahor.sobirova@example.com",
    phone: "+998901234570",
  },
  {
    key: 5,
    firstName: "Bahrom",
    lastName: "Tursunov",
    subject: "Tarix",
    email: "bahrom.tursunov@example.com",
    phone: "+998901234571",
  },
  {
    key: 6,
    firstName: "Nigora",
    lastName: "Mirzaeva",
    subject: "Biologiya",
    email: "nigora.mirzaeva@example.com",
    phone: "+998901234572",
  },
  {
    key: 7,
    firstName: "Ulug'bek",
    lastName: "Islomov",
    subject: "Geografiya",
    email: "ulugbek.islomov@example.com",
    phone: "+998901234573",
  },
  {
    key: 8,
    firstName: "Zulfiya",
    lastName: "Abdukarimova",
    subject: "Adabiyot",
    email: "zulfiya.abdukarimova@example.com",
    phone: "+998901234574",
  },
  {
    key: 9,
    firstName: "Jasur",
    lastName: "Nurmatov",
    subject: "Informatika",
    email: "jasur.nurmatov@example.com",
    phone: "+998901234575",
  },
  {
    key: 10,
    firstName: "Dilshoda",
    lastName: "Saidova",
    subject: "Rus tili",
    email: "dilshoda.saidova@example.com",
    phone: "+998901234576",
  },
];

const Oqituvchilar: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [teacherData, setTeacherData] = useState<DataType[]>(dataSource);

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

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDelete = (key: number) => {
    setTeacherData(teacherData.filter((data) => data.key !== key));
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div style={{ padding: "24px", backgroundColor: "#fff" }}>
      <Button
        type="primary"
        style={{ marginBottom: "20px" }}
        onClick={start}
        disabled={!hasSelected}
        loading={loading}
      >
        Reload
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
        <input
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
        />
        <Button
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
      />
    </div>
  );
};

export default Oqituvchilar;
