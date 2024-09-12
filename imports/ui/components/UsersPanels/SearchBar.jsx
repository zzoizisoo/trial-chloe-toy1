
import React from "react";
import Input from "@mui/joy/Input";
import { IoSearch } from "react-icons/io5";


export const SearchBar = ({ searchInput, onInputChange }) => {
    return (
      <Input
        value={searchInput}
        onChange={onInputChange}
        endDecorator={<IoSearch />}
        sx={{
            mb: 1,
            "--Input-radius": "50px",
            "--Input-gap": "11px",
            "--Input-decoratorChildHeight": "46px",
            "--Input-paddingInline": "24px"
          }}
      />
    );
  };
  