import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/usersSlice";

export default function ListPage() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {loading && <p>Loading...</p>}

      {list.map((user) => (
        <div
          key={user._id}
          className="flex justify-between bg-gray-100 p-4 mb-2 rounded"
        >
          <span>{user.name}</span>
          <span>{user.email}</span>
        </div>
      ))}
    </div>
  );
}
