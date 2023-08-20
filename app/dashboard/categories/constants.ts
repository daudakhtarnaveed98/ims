import { Category } from "@/app/dashboard/categories/types";

export const UNDELETABLE_CATEGORIES: Category[] = [
  {
    id: "all",
    name: "All",
  },
  {
    id: "unassigned",
    name: "Unassigned",
  },
  {
    id: "expiresSoon",
    name: "Expires soon",
  },
  {
    id: "lowStock",
    name: "Low stock",
  },
];
