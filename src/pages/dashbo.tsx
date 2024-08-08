import { Modal, Button, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const { Column } = Table;

interface DataType {
  key: React.Key;
  OquvYili: string;
  tanlash: string;
}

const data: DataType[] = [
  {
    key: "1",
    OquvYili: "2019-2020",
    tanlash: "Select",
  },
  {
    key: "2",
    OquvYili: "2020-2021",
    tanlash: "Select",
  },
  {
    key: "3",
    OquvYili: "2021-2022",
    tanlash: "Select",
  },
  {
    key: "4",
    OquvYili: "2022-2023",
    tanlash: "Select",
  },
  {
    key: "5",
    OquvYili: "2023-2024",
    tanlash: "Select",
  },
  {
    key: "6",
    OquvYili: "2024-2025",
    tanlash: "Select",
  },
];

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <h1 className="mb10">O'quv yillari</h1>
      <Button type="primary" onClick={showModal}>
        +
      </Button>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <select
          style={{
            padding: "10px",
            fontSize: "16px",
            height: "50px",
            width: "200px",
          }}
          name=""
          id=""
        >
          <option style={{ padding: "10px", color: "blue" }} value="">
            2019-2020
          </option>
          <option style={{ padding: "10px" }} value="">
            2020-2021
          </option>
          <option style={{ padding: "10px" }} value="">
            2021-2022
          </option>
          <option style={{ padding: "10px" }} value="">
            2022-2023
          </option>
          <option style={{ padding: "10px" }} value="">
            2023-2024
          </option>
          <option style={{ padding: "10px" }} value="">
            2024-2025
          </option>
        </select>
      </Modal>

      <Table dataSource={data}>
        <Column title="O'quv Yili" dataIndex="OquvYili" key="OquvYili" />
        <Column title="Tanlash" dataIndex="tanlash" key="tanlash" />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="small" style={{ fontSize: 20 }}>
              <a>
                <EditOutlined />
              </a>
              <a style={{ backgroundColor: "#f5222d" }}>
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
