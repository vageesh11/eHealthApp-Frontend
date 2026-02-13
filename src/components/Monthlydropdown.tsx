import React from "react";
import { FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { FaChevronDown } from "react-icons/fa";

interface TimeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const Monthlydropdown: React.FC<TimeFilterProps> = ({ value, onChange }) => {
  return (
    <FormControl
      size="small"
      className="w-[179px] h-[40px]"
      sx={{
        backgroundColor: "white",
        borderRadius: "16px",
        "&:hover": {
          backgroundColor: "#F3F4F6", 
        },
      }}
    >
      <Select
        value={value}
        onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
        IconComponent={FaChevronDown} 
        displayEmpty
        sx={{
          height: "40px",
          px: 1.5,
          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px", 
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none", 
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          backgroundColor: "transparent", 
          borderRadius: "16px",
          fontSize: "14px",
          color: "#374151", 
        }}
      >
        <MenuItem value="Monthly">Monthly</MenuItem>
        <MenuItem value="Quarterly">Quarterly</MenuItem>
        <MenuItem value="Half-Yearly">Half-Yearly</MenuItem>
        <MenuItem value="Yearly">Yearly</MenuItem>
        <MenuItem value="custom">Custom</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Monthlydropdown;
