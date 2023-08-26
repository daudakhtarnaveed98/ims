export interface User {
  id: string;
  uid: string;
  email: string;
  password?: string;
  role: string;
}

export interface UsersState {
  isAddUserDialogOpen: boolean;
  isConfirmDialogOpen: boolean;
  isEditUserDialogOpen: boolean;
  isFetchingUsers: boolean;
  isAddingUser: boolean;
  isDeletingUser: boolean;
  isSendingPasswordResetEmail: boolean;
  toDeleteUser: User;
  toEditUser: User;
  users: User[];
  refetchUsers: boolean;
}
