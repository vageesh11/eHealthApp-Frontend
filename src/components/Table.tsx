import React from "react";

const Table: React.FC = () => {
  const data = [
    { id: "CUST001", name: "John Doe", effective: "2025-01-01", renewal: "2026-01-01", status: "Paid" },
    { id: "CUST002", name: "Jane Smith", effective: "2025-02-01", renewal: "2026-02-01", status: "Pending" },
    { id: "CUST003", name: "Alice Johnson", effective: "2025-03-01", renewal: "2026-03-01", status: "Paid" },
    { id: "CUST004", name: "Mark Lee", effective: "2025-04-01", renewal: "2026-04-01", status: "Paid" },
    { id: "CUST005", name: "Sophia Brown", effective: "2025-05-01", renewal: "2026-05-01", status: "Paid" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <table className="table-auto w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b">Customer ID</th>
            <th className="p-3 border-b">Name</th>
            <th className="p-3 border-b">Effective Date</th>
            <th className="p-3 border-b">Renewal Date</th>
            <th className="p-3 border-b">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 5).map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-3 border-b">{row.id}</td>
              <td className="p-3 border-b">{row.name}</td>
              <td className="p-3 border-b">{row.effective}</td>
              <td className="p-3 border-b">{row.renewal}</td>
              <td
                className={`p-3 border-b font-semibold ${
                  row.status === "Paid" ? "text-green-600" : "text-red-600"
                }`}
              >
                {row.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
