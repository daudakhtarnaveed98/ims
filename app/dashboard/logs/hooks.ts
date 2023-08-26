import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getLogs } from "@/app/dashboard/logs/utils";
import { setIsFetchingLogs, setLogs } from "@/app/dashboard/logs/logs-slice";

export const useLogs = () => {
  const dispatch = useAppDispatch();
  const refetchLogs = useAppSelector((state) => state.logsReducer.refetchLogs);

  useEffect(() => {
    try {
      const getLogsAsync = async () => {
        const logs = await getLogs();
        dispatch(setLogs(logs));
      };

      dispatch(setIsFetchingLogs(true));

      getLogsAsync()
        .then(() => dispatch(setIsFetchingLogs(false)))
        .catch(console.error);
    } catch (e) {
      console.error(e);

      dispatch(setIsFetchingLogs(false));
    }
  }, [dispatch, refetchLogs]);
};
