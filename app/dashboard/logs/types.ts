export interface Log {
  id?: string;
  user: string;
  action: "Add product" | "Consume product" | "Delete product" | "Edit product";
  productName: string;
  description: string;
  timestamp: string;
}

export interface LogsState {
  isAddingLog: boolean;
  isFetchingLogs: boolean;
  logs: Log[];
  refetchLogs: boolean;
}
