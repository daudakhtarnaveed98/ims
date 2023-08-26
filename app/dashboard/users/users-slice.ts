import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UsersState } from "@/app/dashboard/users/types";

const initialState = {
  isConfirmDialogOpen: false,
  isAddUserDialogOpen: false,
  isEditUserDialogOpen: false,
  isAddingUser: false,
  isFetchingUsers: false,
  isDeletingUser: false,
  toDeleteUser: { id: "", uid: "", email: "", role: "" },
  toEditUser: { id: "", uid: "", email: "", role: "" },
  refetchUsers: false,
  users: [],
} as UsersState;

export const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: () => initialState,
    setIsAddUserDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddUserDialogOpen = action.payload;
    },
    setIsConfirmDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isConfirmDialogOpen = action.payload;
    },
    setIsEditUserDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditUserDialogOpen = action.payload;
    },
    setIsAddingUser: (state, action: PayloadAction<boolean>) => {
      state.isAddingUser = action.payload;
    },
    setIsFetchingUsers: (state, action: PayloadAction<boolean>) => {
      state.isFetchingUsers = action.payload;
    },
    setIsDeletingUser: (state, action: PayloadAction<boolean>) => {
      state.isDeletingUser = action.payload;
    },
    setToDeleteUser: (state, action: PayloadAction<User>) => {
      state.toDeleteUser = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setRefetchUsers: (state, action: PayloadAction<boolean>) => {
      state.refetchUsers = action.payload;
    },
    setToEditUser: (state, action: PayloadAction<User>) => {
      state.toEditUser = action.payload;
    },
  },
});

export const {
  reset,
  setIsConfirmDialogOpen,
  setIsAddUserDialogOpen,
  setIsDeletingUser,
  setIsFetchingUsers,
  setRefetchUsers,
  setIsAddingUser,
  setToEditUser,
  setUsers,
  setToDeleteUser,
  setIsEditUserDialogOpen,
} = users.actions;
export default users.reducer;
