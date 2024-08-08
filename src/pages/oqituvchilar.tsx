import React, { useState } from "react";
import { Button, Table, Space } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { MdOutlineRestartAlt } from "react-icons/md";
import { teacherDatas } from "./datas/teacherData";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: number;
  firstName: string;
  lastName: string;
  subject: string;
  email: string;
  phone: string;
}

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
  const [teacherData, setTeacherData] = useState<DataType[]>(teacherDatas);

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

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div style={{ padding: "24px", backgroundColor: "#fff" }}>
      <button
        style={{
          backgroundColor: "#3498db",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s ease",
          border: "none",
        }}
        className="text-white"
      >
        O'qituvchilar
      </button>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "5px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
        className=" mt-5 "
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
        <button className="iconButton border-0 bg-blue-400 p-3 rounded-lg text-white ">
          <MdOutlineRestartAlt />
        </button>
      </div>
      <Space style={{ marginBottom: 16, marginTop: 16 }}>
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
