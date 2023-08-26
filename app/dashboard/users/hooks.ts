import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUsers } from "@/app/dashboard/users/utils";
import {
  setIsFetchingUsers,
  setUsers,
} from "@/app/dashboard/users/users-slice";

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const refetchUsers = useAppSelector(
    (state) => state.usersReducer.refetchUsers,
  );

  useEffect(() => {
    try {
      const getUsersAsync = async () => {
        const users = await getUsers();
        dispatch(setUsers(users));
      };

      dispatch(setIsFetchingUsers(true));

      getUsersAsync()
        .then(() => dispatch(setIsFetchingUsers(false)))
        .catch(console.error);
    } catch (e) {
      console.error(e);

      dispatch(setIsFetchingUsers(false));
    }
  }, [dispatch, refetchUsers]);
};
