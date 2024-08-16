import React from 'react';
import Input from '@mui/joy/Input';
import { IoSearch } from "react-icons/io5";

export default ({
    searchInput,
    onInputChange
})=>{
    return <Input 
                value={searchInput}
                onChange={onInputChange}
                endDecorator={<IoSearch />}/>
}