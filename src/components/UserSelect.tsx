import React, { useEffect } from "react";
import { IdSelect } from "components/IdSelect";
import { useSelector } from "redux/store";
import { useDispatch } from "react-redux";
import { getProjectUsers } from "redux/project.slice";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.project.users);

  useEffect(() => {
    dispatch(getProjectUsers({ useCache: true }));
  }, [dispatch]);

  return <IdSelect options={users || []} {...props} />;
};
