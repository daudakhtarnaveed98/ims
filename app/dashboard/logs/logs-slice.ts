import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Log, LogsState } from "@/app/dashboard/logs/types";

const initialState = {
  isAddingLog: false,
  isFetchingLogs: false,
  logs: [],
  refetchLogs: false,
} as LogsState;

export const logs = createSlice({
  name: "logs",
  initialState,
  reducers: {
    reset: () => initialState,
    setIsAddingLog: (state, action: PayloadAction<boolean>) => {
      state.isAddingLog = action.payload;
    },
    setIsFetchingLogs: (state, action: PayloadAction<boolean>) => {
      state.isFetchingLogs = action.payload;
    },
    setLogs: (state, action: PayloadAction<Log[]>) => {
      state.logs = action.payload;
    },
    setRefetchLogs: (state, action: PayloadAction<boolean>) => {
      state.refetchLogs = action.payload;
    },
  },
});

export const {
  reset,
  setIsAddingLog,
  setRefetchLogs,
  setLogs,
  setIsFetchingLogs,
} = logs.actions;
export default logs.reducer;
