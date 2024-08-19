import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Space,
  Table,
  Button,
  Drawer,
  message,
  Select,
} from "antd";
import axios from "axios";
import { FaPen } from "react-icons/fa";
import { GoTrash } from "react-icons/go";

const { Column } = Table;
const { Option } = Select;

interface DataType {
  id: number;
  key: React.Key;
  className: string;
  teachername: string;
  classCount: number;
}

interface TeacherResponse {
  teachername: string;
}

interface ClassCount {
  className: string;
  count: number;
}

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [classCounts, setClassCounts] = useState<ClassCount[]>([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
  const [teachers, setTeachers] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
    fetchTeachers();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://c7bdff0b28aa98c1.mokky.dev/student"
      );
      const formattedData = response.data.map((item: any) => ({
        id: item.id,
        key: item.id,
        className: item.className,
        teachername: item.teachername,
        classCount: 0, // Placeholder for class count
      }));

      const classCountMap: Record<string, number> = {};
      formattedData.forEach((item: any) => {
        classCountMap[item.className] =
          (classCountMap[item.className] || 0) + 1;
      });

      const classCountArray = Object.keys(classCountMap).map((className) => ({
        className,
        count: classCountMap[className],
      }));
      setClassCounts(classCountArray);

      const updatedData = formattedData.map((item: any) => ({
        ...item,
        classCount: classCountMap[item.className],
      }));
      setData(updatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch data");
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        "https://c7bdff0b28aa98c1.mokky.dev/student"
      );
      const uniqueTeachers = Array.from(
        new Set(
          (response.data as TeacherResponse[]).map((item) => item.teachername)
        )
      );
      setTeachers(uniqueTeachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      message.error("Failed to fetch teachers");
    }
  };

  const showDrawer = (record: DataType | null = null) => {
    setEditingRecord(record);
    form.resetFields();
    if (record) {
      form.setFieldsValue({
        className: record.className,
        teachername: record.teachername,
      });
    }
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const deleteRecord = async (id: number) => {
    try {
      await axios.delete(`https://c7bdff0b28aa98c1.mokky.dev/student/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      message.success("Record deleted successfully");
    } catch (error) {
      console.error("Error deleting record:", error);
      message.error("Failed to delete record");
    }
  };

  const submit = async (values: any) => {
    try {
      if (editingRecord) {
        // Update existing record
        await axios.patch(
          `https://c7bdff0b28aa98c1.mokky.dev/student/${editingRecord.id}`,
          values
        );
        setData((prevData) =>
          prevData.map((item) =>
            item.id === editingRecord.id ? { ...item, ...values } : item
          )
        );
        message.success("Record updated successfully");
      } else {
        const response = await axios.post(
          "https://c7bdff0b28aa98c1.mokky.dev/student",
          values
        );
        const newRecord = { ...response.data, key: response.data.id };
        setData((prevData) => [...prevData, newRecord]);
        message.success("New record added successfully");
      }
      onClose();
    } catch (error) {
      console.error("Error saving record:", error);
      message.error("Failed to save record");
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => showDrawer()}>
        Create
      </Button>
      <Table dataSource={data} style={{ marginTop: 20 }}>
        <Column
          title="Teacher Name"
          dataIndex="teachername"
          key="teachername"
        />
        <Column title="Class" dataIndex="className" key="className" />
        <Column title="Count" dataIndex="classCount" key="classCount" />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <a href="#" onClick={() => showDrawer(record)}>
                <FaPen />
              </a>
              <a href="#" onClick={() => deleteRecord(record.id)}>
                <GoTrash />
              </a>
            </Space>
          )}
        />
      </Table>

      <Drawer
        title={editingRecord ? "Edit Record" : "Add New Record"}
        onClose={onClose}
        open={open}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                form
                  .validateFields()
                  .then((values) => submit(values))
                  .catch(() => message.error("Form validation failed"))
              }
              type="primary"
            >
              Save
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical" onFinish={submit}>
          <Form.Item
            label="Class"
            name="className"
            rules={[{ required: true, message: "Please enter a class name!" }]}
          >
            <Input placeholder="Enter class name" />
          </Form.Item>
          <Form.Item
            label="Teacher Name"
            name="teachername"
            rules={[
              { required: true, message: "Please select a teacher name!" },
            ]}
          >
            <Select placeholder="Select a teacher">
              {teachers.map((teacher) => (
                <Option key={teacher} value={teacher}>
                  {teacher}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default App;
