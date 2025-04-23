import { useState } from "react";

const StudentList = () => {
  const [students] = useState([
    { id: 1, name: "Nguyễn Văn A", class: "12A1", age: 18 },
    { id: 2, name: "Trần Thị B", class: "12A2", age: 17 },
    { id: 3, name: "Lê Văn C", class: "11B1", age: 16 },
  ]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách sinh viên</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Tên</th>
            <th className="border border-gray-300 p-2">Lớp</th>
            <th className="border border-gray-300 p-2">Tuổi</th>
            <th className="border border-gray-300 p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="text-center">
              <td className="border border-gray-300 p-2">{student.name}</td>
              <td className="border border-gray-300 p-2">{student.class}</td>
              <td className="border border-gray-300 p-2">{student.age}</td>
              <td className="border border-gray-300 p-2">
                <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
