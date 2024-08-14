import React, { useEffect, useState } from "react";
import { Table, Button, Pagination, Modal, Form, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { FaUserGraduate } from "react-icons/fa";
import "../pages/readers.css";
import axios from "axios";

const { Option } = Select;

interface Student {
  key: number;
  firstName: string;
  lastName: string;
  className: string; // 'class' o'rniga 'className' deb o'zgartirildi
  email: string;
  phone?: string;
}

const StudentTable: React.FC = () => {
  const [filteredClass, setFilteredClass] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]); // Students o'zgaruvchisi e'lon qilindi
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    axios
      .get("https://6d548820c3f18dbd.mokky.dev/treylerSlder")
      .then((res) => {
        setStudents(res.data); // SliderData o'rniga Students o'zgaruvchisi ishlatiladi
      })
      .catch(() => {
        console.log("Slayder maʼlumotlarini olishda xatolik yuz berdi");
      });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingStudent(null);
    form.resetFields();
  };

  const handleAddOrEdit = (values: any) => {
    if (editingStudent) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.key === editingStudent.key
            ? { ...editingStudent, ...values }
            : student
        )
      );
    } else {
      const newStudent: Student = {
        key: students.length + 1,
        ...values,
      };
      setStudents([...students, newStudent]);
    }
    handleCancel();
  };

  const handleDelete = (key: number) => {
    setStudents(students.filter((student) => student.key !== key));
  };

  const handlePageChange = (page: number) => {
    setCurrent(page);
  };

  const handleClassChange = (value: string) => {
    setFilteredClass(value);
    setCurrent(1);
  };

  const columns = [
    {
      title: "S.No.",
      dataIndex: "key",
      key: "key",
      align: "center" as const,
    },
    {
      title: "Student Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Class",
      dataIndex: "className", // 'class' o'rniga 'className' deb o'zgartirildi
      key: "className",
      align: "center" as const,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      align: "center" as const,
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      render: (_: any, record: Student) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingStudent(record);
              form.setFieldsValue(record);
              showModal();
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            style={{ marginLeft: 8 }}
            onClick={() => handleDelete(record.key)}
          />
        </span>
      ),
    },
  ];

  const filteredStudents = filteredClass
    ? students.filter((student) => student.className === filteredClass)
    : students;

  return (
    <div className="student-table-container">
      <div className="table-header">
        <Button
          type="primary"
          icon={<FaUserGraduate />}
          style={{ marginRight: 8 }}
        >
          Promote Student
        </Button>
        <Button>Download Report</Button>
        <Select
          style={{ width: 200, marginRight: 16 }}
          placeholder="Select Class"
          onChange={handleClassChange}
          value={filteredClass || undefined}
        >
          <Option value={null}>All Classes</Option>
          <Option value="10-A">10-A</Option>
          <Option value="10-B">10-B</Option>
          <Option value="10-C">10-C</Option>
          <Option value="10-D">10-D</Option>
        </Select>
        <Button
          type="primary"
          onClick={() => {
            setEditingStudent(null);
            form.resetFields();
            showModal();
          }}
          style={{
            float: "right",
            backgroundColor: "#FFD700",
            borderColor: "#FFD700",
          }}
        >
          + Add Student
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredStudents.slice((current - 1) * 5, current * 5)}
        pagination={false}
        bordered
        className="student-table"
      />
      <Pagination
        className="table-pagination"
        current={current}
        pageSize={5}
        total={filteredStudents.length}
        onChange={handlePageChange}
        style={{ textAlign: "center", marginTop: 16 }}
      />

      <Modal
        title={editingStudent ? "Edit Student" : "Add Student"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingStudent || {}}
          onFinish={handleAddOrEdit}
        >
          <Form.Item
            name="firstName"
            label="Student Name"
            rules={[
              { required: true, message: "Please enter the student's name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="className" // 'class' o'rniga 'className' deb o'zgartirildi
            label="Class"
            rules={[{ required: true, message: "Please enter the class" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingStudent ? "Update" : "Add"}
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentTable;
