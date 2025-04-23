import React from "react";

const StudentItem = ({
  student,
  isEditing,
  editData,
  onEditChange,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) => {
  return (
    <tr className="text-center">
      {isEditing ? (
        <>
          <td className="border border-gray-300 dark:border-gray-600 p-2">
            <input
              name="name"
              value={editData.name}
              onChange={onEditChange}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-1 rounded w-full"
            />
          </td>
          <td className="border border-gray-300 dark:border-gray-600 p-2">
            <input
              name="class"
              value={editData.class}
              onChange={onEditChange}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-1 rounded w-full"
            />
          </td>
          <td className="border border-gray-300 dark:border-gray-600 p-2">
            <input
              type="number"
              name="age"
              value={editData.age}
              onChange={onEditChange}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-1 rounded w-full"
            />
          </td>
          <td className="border border-gray-300 dark:border-gray-600 p-2">
            <button
              onClick={onSave}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
            >
              Lưu
            </button>
            <button
              onClick={onCancel}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
            >
              Huỷ
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="border p-2">{student.name}</td>
          <td className="border p-2">{student.class}</td>
          <td className="border p-2">{student.age}</td>
          <td className="border p-2 flex gap-2 justify-center">
            <button
              onClick={() => onEdit(student)}
              className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
            >
              Sửa
            </button>
            <button
              onClick={() => onDelete(student.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Xoá
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default StudentItem;
