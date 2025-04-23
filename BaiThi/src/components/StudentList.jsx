import { useEffect, useState } from "react";
import StudentItem from "./StudentItem";

const StudentList = () => {
    const [students, setStudents] = useState(() => {
        const saved = localStorage.getItem("students");
        return saved ? JSON.parse(saved) : [
            { id: 1, name: "Nguyễn Văn A", class: "12A1", age: 18 },
            { id: 2, name: "Trần Thị B", class: "12A2", age: 17 },
            { id: 3, name: "Lê Văn C", class: "11B1", age: 16 },
        ];
    });

    useEffect(() => {
        localStorage.setItem("students", JSON.stringify(students));
    }, [students]);

    const [newStudent, setNewStudent] = useState({ name: "", class: "", age: "" });
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ name: "", class: "", age: "" });
    const [searchTerm, setSearchTerm] = useState(""); // 🔍 input tìm kiếm

    const handleChange = (e) => {
        setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
    };

    const handleAddStudent = () => {
        if (newStudent.name && newStudent.class && newStudent.age) {
            const newId = students.length ? students[students.length - 1].id + 1 : 1;
            setStudents([...students, { id: newId, ...newStudent, age: Number(newStudent.age) }]);
            setNewStudent({ name: "", class: "", age: "" });
        }
    };

    const handleDeleteStudent = (id) => {
        setStudents(students.filter((student) => student.id !== id));
    };

    const handleEdit = (student) => {
        setEditingId(student.id);
        setEditData({ name: student.name, class: student.class, age: student.age });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditData({ name: "", class: "", age: "" });
    };

    const handleSaveEdit = () => {
        setStudents(
            students.map((student) =>
                student.id === editingId
                    ? { ...student, ...editData, age: Number(editData.age) }
                    : student
            )
        );
        handleCancelEdit();
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const [selectedClass, setSelectedClass] = useState("Tất cả");
    // 🔍 Lọc danh sách sinh viên theo tên
    const filteredStudents = students.filter((student) => {
        const matchesName = student.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClass = selectedClass === "Tất cả" || student.class === selectedClass;
        return matchesName && matchesClass;
    });




    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Danh sách sinh viên</h2>

            {/* Tìm kiếm */}
            <div className="mb-4 flex gap-4">
                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="border p-2 rounded w-full sm:w-auto"
                >
                    <option value="Tất cả">Tất cả lớp</option>
                    {[...new Set(students.map((s) => s.class))].map((cls) => (
                        <option key={cls} value={cls}>
                            {cls}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded w-full"
                />
            </div>


            {/* Form thêm sinh viên */}
            <div className="mb-4 grid grid-cols-4 gap-2">
                <input
                    type="text"
                    name="name"
                    placeholder="Họ tên"
                    value={newStudent.name}
                    onChange={handleChange}
                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded w-full"
                />
                <input
                    type="text"
                    name="class"
                    placeholder="Lớp"
                    value={newStudent.class}
                    onChange={handleChange}
                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded w-full"
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Tuổi"
                    value={newStudent.age}
                    onChange={handleChange}
                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded w-full"
                />
                <button
                    onClick={handleAddStudent}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                    Thêm sinh viên
                </button>
            </div>

            {/* Bảng danh sách */}
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
                        <th className="border border-gray-300 dark:border-gray-600 p-2">Tên</th>
                        <th className="border border-gray-300 dark:border-gray-600 p-2">Lớp</th>
                        <th className="border border-gray-300 dark:border-gray-600 p-2">Tuổi</th>
                        <th className="border border-gray-300 dark:border-gray-600 p-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.map((student) => (
                        <StudentItem
                            key={student.id}
                            student={student}
                            isEditing={editingId === student.id}
                            editData={editData}
                            onEditChange={handleEditChange}
                            onEdit={handleEdit}
                            onSave={handleSaveEdit}
                            onCancel={handleCancelEdit}
                            onDelete={handleDeleteStudent}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
