import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Event {
  id: number;
  title: string;
  date: string;   
  time: string;  
  location?: string;
  view: "day" | "workweek";
}

interface CalendarState {
  events: Event[];
}

const initialState: CalendarState = {
  events: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    deleteEvent: (state, action: PayloadAction<number>) => {
      state.events = state.events.filter(e => e.id !== action.payload);
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      const idx = state.events.findIndex(e => e.id === action.payload.id);
      if (idx !== -1) state.events[idx] = action.payload;
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    clearEvents: (state) => {
      state.events = [];
    },
  },
});

export const { addEvent, deleteEvent, updateEvent, setEvents, clearEvents } = calendarSlice.actions;
export default calendarSlice.reducer;
