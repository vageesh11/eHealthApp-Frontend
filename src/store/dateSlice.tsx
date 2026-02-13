import { createSlice } from '@reduxjs/toolkit';

interface DateState{
    value:string;
}
const initialState:DateState={value:new Date().toISOString()}
const DateSlice=createSlice({
    name:"Date",
    initialState,
    reducers:{

    }
})
export default DateSlice.reducer;