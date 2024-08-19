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

const { Column, ColumnGroup } = Table;
const { Option } = Select;

interface DataType {
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

interface Teacher {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<string[]>([]); // Class uchun state
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);

  const showDrawer = (record: DataType | null = null) => {
    setSelectedRecord(record);
    form.resetFields();
    if (record) {
      form.setFieldsValue({
        firstName: record.firstName,
        lastName: record.lastName,
        className: record.className,
        studentemail: record.studentemail,
        studentphone: record.studentphone,
        teachername: record.teachername,
      });
    }
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    // O'quvchilarni olish
    axios
      .get("https://c7bdff0b28aa98c1.mokky.dev/student")
      .then((res) => {
        const formattedData = res.data.slice(0, 5).map((item: any) => ({
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
      })
      .catch((error) => {
        console.error("Ma'lumotlarni olishda xato:", error);
      });

    // O'qituvchilarni olish
    axios
      .get("https://c7bdff0b28aa98c1.mokky.dev/teachers")
      .then((res) => {
        const teacherData = res.data.map((item: any) => ({
          id: item.id,
          name: item.name,
        }));
        setTeachers(teacherData);
      })
      .catch((error) => {
        console.error("O'qituvchilarni olishda xato:", error);
      });

    // Sinflarni olish (Misol uchun, sinflarni serverdan olish)
    axios
      .get("https://c7bdff0b28aa98c1.mokky.dev/classes")
      .then((res) => {
        setClasses(res.data);
      })
      .catch((error) => {
        console.error("Sinflarni olishda xato:", error);
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
        message.error("O'chirishda xato yuz berdi");
      });
  };

  const submit = (values: any) => {
    if (selectedRecord) {
      // Yozuvni yangilash
      axios
        .patch(
          `https://c7bdff0b28aa98c1.mokky.dev/student/${selectedRecord.id}`,
          values
        )
        .then(() => {
          setData((prevData) =>
            prevData.map((item) =>
              item.id === selectedRecord.id ? { ...item, ...values } : item
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
      // Yangi yozuv qo'shish
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
      <Button type="primary" onClick={() => showDrawer()}>
        Yangi yozuv qo'shish
      </Button>
      <Table dataSource={data} style={{ marginTop: 20 }}>
        <ColumnGroup title="Student Information">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
          <Column title="Class" dataIndex="className" key="className" />
          <Column title="Phone" dataIndex="studentphone" key="studentphone" />
          <Column
            title="Teacher Name"
            dataIndex="teachername"
            key="teachername"
          />
        </ColumnGroup>
        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <a href="#" onClick={() => showDrawer(record)}>
                Tahrirlash
              </a>
              <a href="#" onClick={() => deleteRecord(record.id)}>
                O'chirish
              </a>
            </Space>
          )}
        />
      </Table>
      <Drawer
        title={
          selectedRecord ? "Ma'lumotlarni tahrirlash" : "Yangi yozuv qo'shish"
        }
        onClose={onClose}
        open={open}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Bekor qilish
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
              Saqlash
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical" onFinish={submit}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "First Name kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Last Name kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Class"
            name="className"
            rules={[{ required: true, message: "Class tanlang!" }]}
          >
            <Select placeholder="Class tanlang">
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              <Option value="D">D</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Phone"
            name="studentphone"
            rules={[{ required: true, message: "Phone kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Teacher Name"
            name="teachername"
            rules={[{ required: true, message: "Teacher Name tanlang!" }]}
          >
            <Select placeholder="Teacher tanlang">
              <Option value="Islomov Akmal">Islomov Akmal</Option>
              <Option value="Karimov Baxtiyor">Karimov Baxtiyor</Option>
              <Option value="Sultonov Ibrohim">Nodirbek Nodirbek</Option>
              <Option value="Sultonov Ibrohim">Tursun Mustafayev</Option>
              <Option value="Sultonov Ibrohim">Lola Sirojova</Option>
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default App;
