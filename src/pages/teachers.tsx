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
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const { Column, ColumnGroup } = Table;
const { Option } = Select;

// Define interface for API response
interface ApiResponse {
  id: number;
  key: React.Key;
  firstName: string;
  lastName: string;
  className: string;
  studentemail: string;
  studentphone: string;
  teachername?: string;
  teacherlastname?: string;
  subject?: string;
  teacheremail?: string;
  teacherphone?: string;
}

// Define the type for form values
interface FormValues {
  firstName: string;
  lastName: string;
  className: string;
  studentemail: string;
  studentphone: string;
  teacherlastname: string;
  subject: string;
  teacheremail: string;
  teacherphone: string;
  teachername: string;
}

// Define type for class options
interface ClassOption {
  value: string;
  label: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<ApiResponse[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedRecord, setSelectedRecord] = useState<ApiResponse | null>(
    null
  );

  const showDrawer = (record: ApiResponse | null = null) => {
    setSelectedRecord(record);
    form.resetFields();
    if (record) {
      form.setFieldsValue({
        firstName: record.firstName,
        lastName: record.lastName,
        className: record.className,
        studentemail: record.studentemail,
        studentphone: record.studentphone,
        teacherlastname: record.teacherlastname,
        subject: record.subject,
        teacheremail: record.teacheremail,
        teacherphone: record.teacherphone,
        teachername: record.teachername || "",
      });
    }
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    // Fetch student data
    axios
      .get<ApiResponse[]>("https://c7bdff0b28aa98c1.mokky.dev/student")
      .then((res) => {
        const formattedData = res.data
          .filter((item) => item.teachername && item.teacheremail)
          .map((item) => ({
            id: item.id,
            key: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            className: item.className,
            studentemail: item.studentemail,
            studentphone: item.studentphone,
            teachername: item.teachername,
            teacherlastname: item.teacherlastname,
            subject: item.subject,
            teacheremail: item.teacheremail,
            teacherphone: item.teacherphone,
          }));
        setData(formattedData);

        // Fetch subjects for the select component
        const subjectsSet = new Set(res.data.map((item) => item.subject));
        const uniqueSubjects = Array.from(subjectsSet) as string[];
        setSubjects(uniqueSubjects);

        // Fetch classes for the select component
        const classesSet = new Set(res.data.map((item) => item.className));
        const uniqueClasses = Array.from(classesSet).map((cls) => ({
          value: cls,
          label: cls,
        }));
        setClasses(uniqueClasses);
      })
      .catch((error) => {
        console.error("Ma'lumotlarni olishda xato:", error);
      });
  }, []);

  const deleteRecord = (id: number) => {
    axios
      .delete(`https://c7bdff0b28aa98c1.mokky.dev/student/${id}`)
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
        message.success("Yozuv muvaffaqiyatli o'chirildi");
      })
      .catch((error) => {
        console.error("Ma'lumotlarni o'chirishda xato:", error);
        message.error("Yozuvni o'chirishda xato yuz berdi");
      });
  };

  const submit = (values: FormValues) => {
    if (selectedRecord) {
      // Update record
      axios
        .patch(
          `https://c7bdff0b28aa98c1.mokky.dev/student/${selectedRecord.id}`,
          { ...values, teachername: values.teachername }
        )
        .then(() => {
          setData((prevData) =>
            prevData.map((item) =>
              item.id === selectedRecord.id
                ? { ...item, ...values, teachername: values.teachername }
                : item
            )
          );
          message.success("Ma'lumotlar muvaffaqiyatli tahrirlandi");
          onClose();
        })
        .catch((error) => {
          console.error("Tahrirlashda xato:", error);
          message.error("Tahrirlashda xato yuz berdi");
        });
    } else {
      // Add new record
      axios
        .post("https://c7bdff0b28aa98c1.mokky.dev/student", values)
        .then((res) => {
          setData((prevData) => [
            ...prevData,
            { ...res.data, key: res.data.id },
          ]);
          message.success("Yangi yozuv muvaffaqiyatli qo'shildi");
          onClose();
        })
        .catch((error) => {
          console.error("Yozuv qo'shishda xato:", error);
          message.error("Yozuv qo'shishda xato yuz berdi");
        });
    }
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showDrawer()}
      >
        Create
      </Button>
      <Table dataSource={data} style={{ marginTop: 20 }}>
        <ColumnGroup title="Student Information">
          <Column
            title="Teacher Name"
            dataIndex="teachername"
            key="teachername"
          />
          <Column title="Class" dataIndex="className" key="className" />
          <Column title="Phone" dataIndex="studentphone" key="studentphone" />
          <Column
            title="Teacher Email"
            dataIndex="teacheremail"
            key="teacheremail"
          />
        </ColumnGroup>
        <Column
          title="Action"
          key="action"
          render={(_: any, record: ApiResponse) => (
            <Space size="middle">
              <Button
                icon={<EditOutlined />}
                onClick={() => showDrawer(record)}
                type="link"
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={() => deleteRecord(record.id)}
                type="link"
                danger
              />
            </Space>
          )}
        />
      </Table>
      <Drawer
        title={selectedRecord ? "Edit Record" : "Add New Record"}
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
                  .then(submit)
                  .catch(() => message.error("Formada xatolik bor"))
              }
              type="primary"
            >
              Save
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Class"
            name="className"
            rules={[{ required: true, message: "Class kiriting!" }]}
          >
            <Select placeholder="Class tanlang">
              {classes.map((cls) => (
                <Option key={cls.value} value={cls.value}>
                  {cls.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: "Please select the subject" }]}
          >
            <Select placeholder="Select subject">
              {subjects.map((subject) => (
                <Option key={subject} value={subject}>
                  {subject}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Name"
            name="teachername"
            rules={[
              {
                required: true,
                message: "Please enter the teacher's name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="teacherlastname"
            rules={[
              {
                required: true,
                message: "Please enter the teacher's last name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="teacheremail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please enter the teacher's email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="teacherphone"
            rules={[
              {
                required: true,
                message: "Please enter the teacher's phone number",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default App;
