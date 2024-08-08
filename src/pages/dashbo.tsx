import { Modal, Button, Space, Table, AutoComplete } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import type { AutoCompleteProps } from "antd";

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
];

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [options, setOptions] = React.useState<AutoCompleteProps["options"]>(
    []
  );

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

  const handleSearch = (value: string) => {
    setOptions(() => {
      if (!value || value.includes("@")) {
        return [];
      }
      return ["gmail.com", "163.com", "qq.com"].map((domain) => ({
        label: `${value}@${domain}`,
        value: `${value}@${domain}`,
      }));
    });
  };

  return (
    <>
      <h1
        style={{
          margin: "10px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        O'quv yillari
      </h1>

      <div>
        <Button
          style={{
            margin: "10px",
          }}
          type="primary"
          onClick={showModal}
        >
          Yangi o'quv yili qo'shish
        </Button>
      </div>
      <AutoComplete
        style={{ width: "100%", height: "30px" }}
        onSearch={handleSearch}
        placeholder="Search"
        options={options}
      />

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
              <a style={{ color: "#f5222d" }}>
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
