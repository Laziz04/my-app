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

interface TeacherOption {
  value: string;
  label: string;
}

interface ClassOption {
  value: string;
  label: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [srekord, setserekord] = useState<DataType | null>(null);
  const [teachers, setTeachers] = useState<TeacherOption[]>([]);
  const [classes, setClasses] = useState<ClassOption[]>([]);

  const showDrawer = (rekord: DataType | null = null) => {
    setserekord(rekord);
    form.resetFields();
    if (rekord) {
      form.setFieldsValue({
        firstName: rekord.firstName,
        lastName: rekord.lastName,
        className: rekord.className,
        studentemail: rekord.studentemail,
        studentphone: rekord.studentphone,
        teachername: rekord.teachername,
        teacherlastname: rekord.teacherlastname,
        subject: rekord.subject,
        teacheremail: rekord.teacheremail,
        teacherphone: rekord.teacherphone,
      });
    }
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    // Fetch student data and teachers
    axios
      .get("https://c7bdff0b28aa98c1.mokky.dev/student")
      .then((res) => {
        const formattedData = res.data
          .filter((item: any) => item.teachername && item.teacheremail)
          .slice(0, 5)
          .map((item: any) => ({
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

        // Extract unique teacher names and create options for Select component
        const teacherNames: string[] = res.data
          .filter((item: any) => item.teachername)
          .map((item: any) => item.teachername);

        const uniqueTeacherNames = Array.from(new Set(teacherNames));

        const uniqueTeachers: TeacherOption[] = uniqueTeacherNames.map(
          (teacherName) => ({
            value: teacherName as string,
            label: teacherName as string,
          })
        );

        setTeachers(uniqueTeachers);

        // Extract unique class names and create options for Select component
        const classNames: string[] = res.data.map(
          (item: any) => item.className
        );

        const uniqueClassNames = Array.from(new Set(classNames));

        const uniqueClasses: ClassOption[] = uniqueClassNames.map(
          (className) => ({
            value: className as string,
            label: className as string,
          })
        );

        setClasses(uniqueClasses);
      })
      .catch((error) => {
        console.error("Ma'lumotlarni olishda xato:", error);
      });
  }, []);

  const delet = (id: number) => {
    axios
      .delete(`https://c7bdff0b28aa98c1.mokky.dev/student/${id}`)
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Ma'lumotlarni o'chirishda xato:", error);
      });
  };

  const submit = (values: any) => {
    if (srekord) {
      // Tahrirlash
      axios
        .patch(
          `https://c7bdff0b28aa98c1.mokky.dev/student/${srekord.id}`,
          values
        )
        .then(() => {
          setData((prevData) =>
            prevData.map((item) =>
              item.id === srekord.id ? { ...item, ...values } : item
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
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <a href="#" onClick={() => showDrawer(record)}>
                Tahrirlash
              </a>
              <a href="#" onClick={() => delet(record.id)}>
                O'chirish
              </a>
            </Space>
          )}
        />
      </Table>
      <Drawer
        title={srekord ? "Ma'lumotlarni tahrirlash" : "Yangi yozuv qo'shish"}
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
            label="Phone"
            name="studentphone"
            rules={[{ required: true, message: "Phone kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Teacher Name"
            name="teachername"
            rules={[{ required: true, message: "Teacher Name kiriting!" }]}
          >
            <Select placeholder="Teacher tanlang">
              {teachers.map((teacher) => (
                <Option key={teacher.value} value={teacher.value}>
                  {teacher.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Teacher Last Name" name="teacherlastname">
            <Input />
          </Form.Item>
          <Form.Item label="Subject" name="subject">
            <Input />
          </Form.Item>
          <Form.Item label="Teacher Email" name="teacheremail">
            <Input />
          </Form.Item>
          <Form.Item label="Teacher Phone" name="teacherphone">
            <Input />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default App;
