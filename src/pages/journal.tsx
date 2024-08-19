import React, { useState, useEffect } from "react";
import {
  Table,
  Layout,
  Select,
  Row,
  Col,
  Button,
  Input,
  Space,
  Pagination,
} from "antd";
import axios from "axios";

const { Content } = Layout;
const { Option } = Select;

// Define interfaces for the student and topic types
interface Topic {
  topicName: string;
  topicDate: string;
}

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  className: string;
  studentemail: string;
  studentphone: string;
  teachername: string;
  teacherlastname: string;
  subject: string;
  teacheremail: string;
  teacherphone: string;
  classCount: string;
  grade: string;
  topics: Topic[]; // Add topics field
}

interface OptionType {
  value: string;
  label: string;
}

const Jurnal = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<OptionType[]>([]);
  const [subjects, setSubjects] = useState<OptionType[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined
  );
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(
    undefined
  );
  const [view, setView] = useState<"grades" | "subjects">("grades");
  const [editableStudentId, setEditableStudentId] = useState<number | null>(
    null
  );
  const [newGrade, setNewGrade] = useState<string>("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(7);

  useEffect(() => {
    // Fetch students
    axios
      .get("https://c7bdff0b28aa98c1.mokky.dev/student")
      .then((response) => {
        const data = response.data as Student[];
        setStudents(data);
        setFilteredStudents(data);

        // Extract unique classes and subjects for select options
        const classOptions = Array.from(
          new Set(data.map((student) => student.className))
        ).map((name) => ({ value: name, label: name }));
        setClasses(classOptions);

        const subjectOptions = Array.from(
          new Set(data.map((student) => student.subject))
        ).map((name) => ({ value: name, label: name }));
        setSubjects(subjectOptions);
      })
      .catch((error) => {
        console.error("API bilan ulanishda xatolik:", error);
      });
  }, []);

  useEffect(() => {
    // Filter students based on selected class and subject
    let filtered = students;

    if (selectedClass) {
      filtered = filtered.filter(
        (student) => student.className === selectedClass
      );
    }

    if (selectedSubject) {
      filtered = filtered.filter(
        (student) => student.subject === selectedSubject
      );
    }

    setFilteredStudents(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedClass, selectedSubject, students]);

  const handleGradeChange = (id: number, grade: string) => {
    // Update the grade for the selected student
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, grade } : student
      )
    );
    setFilteredStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, grade } : student
      )
    );
    setEditableStudentId(null);
  };

  const columns = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "F.I.Sh",
      dataIndex: "name",
      key: "name",
      render: (text: any, record: Student) =>
        `${record.lastName} ${record.firstName}`,
    },
    {
      title: "Sinfi",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Fan",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Baholar",
      dataIndex: "grade",
      key: "grade",
      render: (text: string, record: Student) => {
        if (view === "grades" && editableStudentId === record.id) {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Input
                value={newGrade}
                onChange={(e) => setNewGrade(e.target.value)}
                style={{ width: "60px", marginRight: "8px" }}
              />
              <Button onClick={() => handleGradeChange(record.id, newGrade)}>
                Save
              </Button>
            </div>
          );
        }

        const grades = text.split(",");
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {grades.map((grade, index) => {
              let color = "";
              switch (grade.trim()) {
                case "5":
                  color = "#a7e31a"; // green
                  break;
                case "4":
                  color = "#ffdf32"; // yellow
                  break;
                case "3":
                  color = "#ff9f3a"; // orange
                  break;
                case "2":
                  color = "#ff3a3a"; // red
                  break;
                default:
                  color = "#fff"; // white
              }
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: color,
                    width: "40px",
                    textAlign: "center",
                    margin: "2px",
                  }}
                >
                  {grade}
                </div>
              );
            })}
            <Button
              onClick={() => {
                setEditableStudentId(record.id);
                setNewGrade(record.grade);
              }}
              style={{ marginLeft: "8px" }}
            >
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  const subjectColumns = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "F.I.Sh",
      dataIndex: "name",
      key: "name",
      render: (text: any, record: Student) =>
        `${record.lastName} ${record.firstName}`,
    },
    {
      title: "Sinfi",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Fan",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Mavzular sanasi va nomi",
      dataIndex: "topics",
      key: "topics",
      render: (topics: Topic[]) => (
        <div>
          {topics.map((topic, index) => (
            <div key={index}>
              <strong>{topic.topicName}:</strong> {topic.topicDate}
            </div>
          ))}
        </div>
      ),
    },
  ];

  // Paginate filtered students
  const paginatedData = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Layout style={{ padding: "24px" }}>
      <Content className="jurnal-content">
        <Space style={{ marginBottom: "16px" }}>
          <Button
            onClick={() => setView("grades")}
            type={view === "grades" ? "primary" : "default"}
          >
            Baholar
          </Button>
          <Button
            onClick={() => setView("subjects")}
            type={view === "subjects" ? "primary" : "default"}
          >
            Mavzular
          </Button>
        </Space>
        <Row gutter={16} style={{ marginBottom: "16px" }}>
          <Col span={12}>
            <Select
              placeholder="Select Class"
              style={{ width: "100%" }}
              onChange={setSelectedClass}
              value={selectedClass}
            >
              {classes.map((cls) => (
                <Option key={cls.value} value={cls.value}>
                  {cls.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <Select
              placeholder="Select Subject"
              style={{ width: "100%" }}
              onChange={setSelectedSubject}
              value={selectedSubject}
            >
              {subjects.map((subj) => (
                <Option key={subj.value} value={subj.value}>
                  {subj.label}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        {view === "grades" ? (
          <>
            <Table
              columns={columns}
              dataSource={paginatedData}
              rowKey="id"
              pagination={false}
            />
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredStudents.length}
              onChange={(page) => setCurrentPage(page)}
              style={{ marginTop: "16px", textAlign: "center" }}
            />
          </>
        ) : (
          <Table
            columns={subjectColumns}
            dataSource={paginatedData}
            rowKey="id"
            pagination={false}
          />
        )}
      </Content>
    </Layout>
  );
};

export default Jurnal;
