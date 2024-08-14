import { Modal, Button, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

const { Column } = Table;

interface DataType {
  key: React.Key;
  OquvYili: string;
  tanlash: string;
}

const initialData: DataType[] = [
  {
    key: "1",
    OquvYili: "2019-2020",
    tanlash: "Ali",
  },
  {
    key: "2",
    OquvYili: "2020-2021",
    tanlash: "Ali",
  },
  {
    key: "3",
    OquvYili: "2021-2022",
    tanlash: "Ali",
  },
];

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | undefined>(
    undefined
  );
  const [data, setData] = useState<DataType[]>(initialData);
  const [editingKey, setEditingKey] = useState<React.Key | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(data));
  }, [data]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    if (selectedYear) {
      if (editingKey !== null) {
        // Edit existing entry
        const newData = data.map((item) =>
          item.key === editingKey ? { ...item, OquvYili: selectedYear } : item
        );
        setData(newData);
        setEditingKey(null);
      } else {
        // Add new entry
        const newData = [
          ...data,
          {
            key: (data.length + 1).toString(),
            OquvYili: selectedYear,
            tanlash: "Ali",
          },
        ];
        setData(newData);
      }
      setSelectedYear(undefined);
    }
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setEditingKey(null);
  };

  const handleSelectChange = (value: string) => {
    setSelectedYear(value);
  };

  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const handleEdit = (record: DataType) => {
    setSelectedYear(record.OquvYili);
    setEditingKey(record.key);
    setOpen(true);
  };

  return (
    <>
      <h1
        style={{
          margin: "10px",
          fontSize: "20px",
          fontWeight: "bold",
        }}>
        O'quv yillari
      </h1>

      <div>
        <Button
          style={{
            margin: "10px",
          }}
          type="primary"
          onClick={showModal}>
          Yangi o'quv yili qo'shish
        </Button>
      </div>

      <Modal
        title={
          editingKey ? "O'quv yilini o'zgartirish" : "Yangi o'quv yili qo'shish"
        }
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}></Modal>

      <Table dataSource={data} rowKey="key">
        <Column title="O'quv Yili" dataIndex="OquvYili" key="OquvYili" />
        <Column title="Tanlash" dataIndex="tanlash" key="tanlash" />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="small" style={{ fontSize: 20 }}>
              <a onClick={() => handleEdit(record)}>
                <EditOutlined />
              </a>
              <a
                onClick={() => handleDelete(record.key)}
                style={{ color: "#f5222d" }}>
                <DeleteOutlined />
              </a>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default Dashboard;
