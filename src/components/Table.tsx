import React from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { tableColumns, tableData } from "../utils/TablesConstants";

interface TableRowData {
  "Customer ID": string;
  Name: string;
  "Effective Date": string;
  "Renewal Date": string;
  "Payment Status": string;
}

const CustomTable: React.FC = () => {
  return (
    <TableContainer component={Paper} elevation={3}>
      <MuiTable>
        {/* HEADER */}
        <TableHead>
          <TableRow sx={{ backgroundColor: "#e5e7eb" }}>
            {tableColumns.map((col, index) => (
              <TableCell key={index}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {col}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* ROWS */}
        <TableBody>
          {tableData.map((row: TableRowData, rowIndex) => (
            <TableRow key={rowIndex} hover>
              {tableColumns.map((col) => {
                // ✅ Tell TypeScript col is keyof TableRowData
                const key = col as keyof TableRowData;

                return (
                  <TableCell key={col}>
                    {key === "Payment Status" ? (
                      row[key] === "Paid" ? (
                        <span style={{ color: "green", fontWeight: "bold" }}>
                          <CheckCircleIcon fontSize="small" /> Paid
                        </span>
                      ) : (
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          <ErrorIcon fontSize="small" /> Unpaid
                        </span>
                      )
                    ) : (
                      row[key]
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default CustomTable;
