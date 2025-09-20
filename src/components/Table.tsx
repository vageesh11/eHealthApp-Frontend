import React from "react";

interface TableProps {
  columns: string[];
  data: { [key: string]: string }[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
      <table className="table-auto w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="p-3 border-b">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.slice(0, 5).map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`p-3 border-b ${
                      col === "Payment Status"
                        ? row[col] === "Paid"
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                        : ""
                    }`}
                  >
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center p-4 text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
