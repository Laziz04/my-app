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

  const [teacherData, setTeacher] = useState<DataType>(dataSource);

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
      <Space style={{ marginBottom: 16 }} className="mt-24">
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
