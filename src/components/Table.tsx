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

interface TableProps {
  columns: string[];
  data: { [key: string]: string }[];
}

const CustomTable: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <TableContainer component={Paper} elevation={3}>
      <MuiTable>
        {/* HEADER */}
        <TableHead>
          <TableRow sx={{ backgroundColor: "#e5e7eb" }}> 
            {columns.map((col, index) => (
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
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} hover>
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex}>
                  {col === "Payment Status" ? (
                    row[col] === "Paid" ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        <CheckCircleIcon fontSize="small" /> Paid
                      </span>
                    ) : (
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        <ErrorIcon fontSize="small" /> Unpaid
                      </span>
                    )
                  ) : (
                    row[col]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default CustomTable;
