import React, { useState } from "react";
import * as XLSX from "xlsx";

const Jurnal: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const ab = e.target?.result;
        if (ab) {
          const workbook = XLSX.read(ab, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          setData(json);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <h1>Menu_Jurnal</h1>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      <table>
        <thead>
          <tr>
            {data[0] &&
              Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value: any, i) => (
                <td key={i}>{value as string | number}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Jurnal;
