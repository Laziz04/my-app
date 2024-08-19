import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components for chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  className: string;
  teachername: string;
  teacherlastname: string;
  subject: string;
}

const LineChart: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    axios
      .get("https://a022e1d74b8ad932.mokky.dev/scholls")
      .then((res) => {
        const data = res.data;

        // Prepare data for the chart
        const labels = data.map(
          (student: Student) => `${student.firstName} ${student.lastName}`
        );

        const subjectLengths = data.map(
          (student: Student) => student.subject.length
        );

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Subjects Length", // Label for the dataset
              data: subjectLengths, // Data for the chart
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Student Subjects Length",
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
