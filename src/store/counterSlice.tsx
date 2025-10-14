import { createSlice } from '@reduxjs/toolkit';

interface CounterState{
    value:number;
}

const initialState:CounterState={value:0}
const counterSlice=createSlice({
    name:"counter",
    initialState,
    reducers:{
        increment:(state:any)=>{state.value+=1},
        clear:(state:any)=>{state.value=0}
    }
})

export const {increment,clear}=counterSlice.actions;
export default counterSlice.reducer;