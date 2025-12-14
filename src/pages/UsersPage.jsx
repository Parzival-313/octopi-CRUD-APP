import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../features/usersSlice";

export default function UsersPage() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.users);

  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const submit = () => {
    const payload = {
      name,
      email,
      age: 25,
      nationality: "Bangladeshi",
      skills: ["React", "Redux"],
      gender: "MALE",
    };

    editing
      ? dispatch(updateUser({ id: editing, data: payload }))
      : dispatch(createUser(payload));

    setName("");
    setEmail("");
    setEditing(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8">
      <div className="max-w-5xl mx-auto">

        
        <h1 className="text-4xl font-extrabold text-white mb-8 tracking-wide">
          User Management Dashboard
        </h1>

        <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl
                        transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 mb-10">
          <div className="flex flex-wrap gap-3">
            <input
              className="border border-gray-300 p-3 rounded-lg flex-1
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="border border-gray-300 p-3 rounded-lg flex-1
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={submit}
              className="bg-gradient-to-r from-purple-600 to-pink-600
                         text-white px-6 py-3 rounded-lg
                         transition transform hover:scale-105 hover:shadow-lg"
            >
              {editing ? "Update User" : "Add User"}
            </button>
          </div>
        </div>

        {loading && (
          <p className="text-white text-lg mb-4 animate-pulse">
            Loading users...
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {list.map((u) => (
            <div
              key={u._id}
              className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-lg
                         transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 fade-in"
            >
              <h2 className="font-bold text-xl text-gray-800">{u.name}</h2>
              <p className="text-sm text-gray-600">{u.email}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setEditing(u._id);
                    setName(u.name);
                    setEmail(u.email);
                    setShowModal(true);
                  }}
                  className="px-4 py-1 rounded-lg bg-blue-100 text-blue-700
                             transition hover:bg-blue-200 hover:scale-105"
                >
                  Edit
                </button>

                <button
                  onClick={() => setDeleteId(u._id)}
                  className="px-4 py-1 rounded-lg bg-red-100 text-red-700
                             transition hover:bg-red-200 hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-96 fade-in shadow-2xl">
              <h2 className="text-xl font-bold mb-4">Edit User</h2>

              <input
                className="border p-2 w-full mb-3 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="border p-2 w-full mb-4 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditing(null);
                  }}
                  className="px-4 py-2 rounded border hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    submit();
                    setShowModal(false);
                  }}
                  className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-pink-600
                             text-white hover:scale-105 transition"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

        {deleteId && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-80 fade-in shadow-2xl">
              <h2 className="text-lg font-bold mb-4">Delete this user?</h2>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 rounded border hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    dispatch(deleteUser(deleteId));
                    setDeleteId(null);
                  }}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:scale-105 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
