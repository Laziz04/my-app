import React, { useState } from "react";
import { Table, Button, Pagination, Modal, Form, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { FaUserGraduate } from "react-icons/fa";
import "../pages/readers.css";

const { Option } = Select;

interface Student {
  key: number;
  firstName: string;
  lastName: string;
  class: string;
  email: string;
  phone?: string;
}

const initialStudents: Student[] = [
  {
    key: 1,
    firstName: "Ali",
    lastName: "Ahmadov",
    class: "10-A",
    email: "ali.ahmadov@example.com",
    phone: "+998901234580",
  },
  {
    key: 2,
    firstName: "Sara",
    lastName: "Toshpulatova",
    class: "10-A",
    email: "sara.toshpulatova@example.com",
    phone: "+998901234581",
  },
  {
    key: 3,
    firstName: "John",
    lastName: "Doe",
    class: "10-A",
    email: "john.doe@example.com",
    phone: "+998901234582",
  },
  {
    key: 4,
    firstName: "Masha",
    lastName: "Ivanova",
    class: "10-A",
    email: "masha.ivanova@example.com",
    phone: "+998901234583",
  },
  {
    key: 5,
    firstName: "James",
    lastName: "Smith",
    class: "10-A",
    email: "james.smith@example.com",
    phone: "+998901234584",
  },
  {
    key: 6,
    firstName: "Emma",
    lastName: "Johnson",
    class: "10-A",
    email: "emma.johnson@example.com",
    phone: "+998901234585",
  },
  {
    key: 7,
    firstName: "Olga",
    lastName: "Petrova",
    class: "10-A",
    email: "olga.petrova@example.com",
    phone: "+998901234586",
  },
  {
    key: 8,
    firstName: "Luca",
    lastName: "Miller",
    class: "10-A",
    email: "luca.miller@example.com",
    phone: "+998901234587",
  },
  {
    key: 9,
    firstName: "Sophia",
    lastName: "Martinez",
    class: "10-A",
    email: "sophia.martinez@example.com",
    phone: "+998901234588",
  },
  {
    key: 10,
    firstName: "Michael",
    lastName: "Brown",
    class: "10-A",
    email: "michael.brown@example.com",
    phone: "+998901234589",
  },
  {
    key: 11,
    firstName: "Anna",
    lastName: "Davis",
    class: "10-B",
    email: "anna.davis@example.com",
    phone: "+998901234590",
  },
  {
    key: 12,
    firstName: "Alex",
    lastName: "Wilson",
    class: "10-B",
    email: "alex.wilson@example.com",
    phone: "+998901234591",
  },
  {
    key: 13,
    firstName: "Kate",
    lastName: "Lee",
    class: "10-B",
    email: "kate.lee@example.com",
    phone: "+998901234592",
  },
  {
    key: 14,
    firstName: "Daniel",
    lastName: "Walker",
    class: "10-B",
    email: "daniel.walker@example.com",
    phone: "+998901234593",
  },
  {
    key: 15,
    firstName: "Elena",
    lastName: "Taylor",
    class: "10-B",
    email: "elena.taylor@example.com",
    phone: "+998901234594",
  },
  {
    key: 16,
    firstName: "Liam",
    lastName: "Anderson",
    class: "10-B",
    email: "liam.anderson@example.com",
    phone: "+998901234595",
  },
  {
    key: 17,
    firstName: "Mia",
    lastName: "Thomas",
    class: "10-B",
    email: "mia.thomas@example.com",
    phone: "+998901234596",
  },
  {
    key: 18,
    firstName: "Nikita",
    lastName: "Kuznetsov",
    class: "10-B",
    email: "nikita.kuznetsov@example.com",
    phone: "+998901234597",
  },
  {
    key: 19,
    firstName: "Sofia",
    lastName: "Martins",
    class: "10-B",
    email: "sofia.martins@example.com",
    phone: "+998901234598",
  },
  {
    key: 20,
    firstName: "David",
    lastName: "Nguyen",
    class: "10-B",
    email: "david.nguyen@example.com",
    phone: "+998901234599",
  },
  {
    key: 21,
    firstName: "Natalie",
    lastName: "Gonzalez",
    class: "10-C",
    email: "natalie.gonzalez@example.com",
    phone: "+998901234600",
  },
  {
    key: 22,
    firstName: "George",
    lastName: "Perez",
    class: "10-C",
    email: "george.perez@example.com",
    phone: "+998901234601",
  },
  {
    key: 23,
    firstName: "Aisha",
    lastName: "Rodriguez",
    class: "10-C",
    email: "aisha.rodriguez@example.com",
    phone: "+998901234602",
  },
  {
    key: 24,
    firstName: "Oliver",
    lastName: "Williams",
    class: "10-C",
    email: "oliver.williams@example.com",
    phone: "+998901234603",
  },
  {
    key: 25,
    firstName: "Chloe",
    lastName: "White",
    class: "10-C",
    email: "chloe.white@example.com",
    phone: "+998901234604",
  },
  {
    key: 26,
    firstName: "Ali",
    lastName: "Ahmadov",
    class: "10-D",
    email: "ali.ahmadov@example.com",
    phone: "+998901234580",
  },
];
const StudentTable: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [filteredClass, setFilteredClass] = useState<string | null>(null); // State to manage selected class
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(1); // To track current page

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingStudent(null);
    form.resetFields(); // Reset form fields on modal close
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
    handleCancel(); // Close the modal and reset form
  };

  const handleDelete = (key: number) => {
    setStudents(students.filter((student) => student.key !== key));
  };

  const handlePageChange = (page: number) => {
    setCurrent(page);
  };

  const handleClassChange = (value: string) => {
    setFilteredClass(value);
    setCurrent(1); // Reset to first page when filter changes
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
      dataIndex: "class",
      key: "class",
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
              form.setFieldsValue(record); // Set form values for editing
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
    ? students.filter((student) => student.class === filteredClass)
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
            setEditingStudent(null); // Ensure no student is being edited
            form.resetFields(); // Reset form fields before showing modal
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
        dataSource={filteredStudents.slice((current - 1) * 5, current * 5)} // Show 5 items per page
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
            name="class"
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
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select the status" }]}
          >
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
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
