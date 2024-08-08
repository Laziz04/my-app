import React, { useState } from "react";
import { Button, Table, Space } from "antd";
import type { TableColumnsType, TableProps } from "antd";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: number;
  firstName: string;
  lastName: string;
  subject: string;
  email: string;
  phone: string;
}

// `dataSource` ma'lumotlari
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

const columns: TableColumnsType<DataType> = [
  { title: "First Name", dataIndex: "firstName", key: "firstName" },
  { title: "Last Name", dataIndex: "lastName", key: "lastName" },
  { title: "Subject", dataIndex: "subject", key: "subject" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Phone", dataIndex: "phone", key: "phone" },
];

const Oqituvchilar: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [teacherData, setTeacherData] = useState<DataType[]>(dataSource);

  const start = () => {
    setLoading(true);
    // Ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div style={{ padding: "24px", backgroundColor: "#fff" }}>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Space>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={teacherData}
      />
    </div>
  );
};

export default Oqituvchilar;
