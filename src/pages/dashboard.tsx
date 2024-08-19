import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

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
    series: [],
    options: {},
  });

  useEffect(() => {
    axios
      .get("https://a022e1d74b8ad932.mokky.dev/scholls")
      .then((res) => {
        const data = res.data;

        // Prepare data for the chart
        const series = [
          {
            name: "Subjects", // You can customize this name
            data: data.map((student: Student) => student.subject.length),
          },
        ];

        const categories = data.map(
          (student: Student) => `${student.firstName} ${student.lastName}`
        );

        setChartData({
          series: series,
          options: {
            chart: {
              type: "line",
              height: 350,
            },
            xaxis: {
              categories: categories,
              title: {
                text: "Students",
              },
            },
            yaxis: {
              title: {
                text: "Subject Length",
              },
            },
            stroke: {
              curve: "smooth",
            },
            title: {
              text: "Student Subjects Length",
              align: "center",
            },
          },
        });
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;
