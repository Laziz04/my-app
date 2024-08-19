import React, { useState, useEffect } from "react";
import { Layout, Select, Button, Table, Spin, Modal, Input, Form } from "antd";
import axios from "axios";
import "antd/dist/reset.css";
import "../dasd.css";

const { Content } = Layout;
const { Option } = Select;

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  className: string;
  subject: string;
  teachername: string;
  teacherlastname: string;
  grade?: number; // Optional property
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<string[]>([
    "10-S",
    "10-N",
    "10-Q",
    "10-R",
  ]);
  const [quarters, setQuarters] = useState<string[]>(["1", "2", "3", "4"]);
  const [subjects, setSubjects] = useState<string[]>([
    "Kimyo",
    "Geografiya",
    "Matematika",
    "Ona tili",
  ]);
  const [groups, setGroups] = useState<string[]>([
    "Biriktilmagan",
    "Guruh 1",
    "Guruh 2",
  ]);
  const [selectedSubject, setSelectedSubject] = useState<string>(subjects[0]);
  const [selectedClass, setSelectedClass] = useState<string>(classes[0]);
  const [selectedQuarter, setSelectedQuarter] = useState<string>(quarters[0]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null
  );
  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get<Student[]>("https://c7bdff0b28aa98c1.mokky.dev/student")
      .then((response) => {
        setStudents(response.data);
        setFilteredStudents(response.data); // Initialize filteredStudents with all students
        setLoading(false);
      })
      .catch((error) => {
        console.error("APIdan ma'lumot olishda xatolik:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredStudents(
      students.filter(
        (student) =>
          student.subject === selectedSubject &&
          student.className === selectedClass
      )
    );
  }, [selectedSubject, selectedClass, students]);

  const handleAssignGrade = (studentId: number) => {
    setSelectedStudentId(studentId);
    form.resetFields(); // Reset form fields
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (selectedStudentId !== null) {
      const grade = form.getFieldValue("grade");
      axios
        .put(
          `https://c7bdff0b28aa98c1.mokky.dev/student/${selectedStudentId}`,
          { grade }
        )
        .then(() => {
          setStudents((prevStudents) =>
            prevStudents.map((student) =>
              student.id === selectedStudentId ? { ...student, grade } : student
            )
          );
          setFilteredStudents((prevStudents) =>
            prevStudents.map((student) =>
              student.id === selectedStudentId ? { ...student, grade } : student
            )
          );
          setIsModalVisible(false);
        })
        .catch((error) => console.error("Grade update failed:", error));
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "F.I.Sh",
      dataIndex: "fullName",
      key: "fullName",
      width: 150,
      render: (_: any, record: Student) =>
        `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Sinfi",
      dataIndex: "className",
      key: "className",
      width: 100,
    },
    {
      title: "Fan",
      dataIndex: "subject",
      key: "subject",
      width: 100,
    },
    {
      title: "O'qituvchi",
      dataIndex: "teachername",
      key: "teachername",
      width: 150,
      render: (_: any, record: Student) =>
        `${record.teachername} ${record.teacherlastname}`,
    },
    {
      title: "Baholar",
      dataIndex: "grade",
      key: "grade",
      width: 100,
      render: (grade: number) => (grade !== undefined ? grade : "N/A"),
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_: any, record: Student) => (
        <Button onClick={() => handleAssignGrade(record.id)}>Baho qo'y</Button>
      ),
    },
  ];

  return (
    <Content className="app-content">
      <div className="app-filters">
        <Select
          defaultValue={selectedClass}
          onChange={(value) => setSelectedClass(value)}
          className="app-select"
        >
          {classes.map((cls) => (
            <Option key={cls} value={cls}>
              {cls}
            </Option>
          ))}
        </Select>
        <Select
          defaultValue={selectedQuarter}
          onChange={(value) => setSelectedQuarter(value)}
          className="app-select"
        >
          {quarters.map((quarter) => (
            <Option key={quarter} value={quarter}>
              {quarter}
            </Option>
          ))}
        </Select>
        <Select
          value={selectedSubject}
          onChange={(value) => setSelectedSubject(value)}
          className="app-select"
        >
          {subjects.map((subject) => (
            <Option key={subject} value={subject}>
              {subject}
            </Option>
          ))}
        </Select>
        <Select defaultValue={groups[0]} className="app-select">
          {groups.map((group) => (
            <Option key={group} value={group}>
              {group}
            </Option>
          ))}
        </Select>
      </div>
      <div className="app-buttons">
        <Button type="primary">Excelga export</Button>
      </div>
      {loading ? (
        <div className="app-spin-container">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredStudents}
          pagination={false}
          scroll={{ x: 1000 }}
          rowKey="id"
        />
      )}
      <Modal
        title="Bahoni qo'yish"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Baholar"
            name="grade"
            rules={[{ required: true, message: "Bahoni kiriting!" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
};

export default App;
