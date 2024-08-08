import { Modal, Button } from "antd";
import React, { useState } from "react";

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
    </>
  );
};

export default Dashboard;
