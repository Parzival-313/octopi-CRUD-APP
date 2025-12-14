import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "https://wesoftin-backend.vercel.app/users";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await fetch(`${API}?sort=asc`);
  return res.json();
});

export const createUser = createAsyncThunk("users/create", async (data) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
});

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, data }) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }
);

export const deleteUser = createAsyncThunk("users/delete", async (id) => {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  return id;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(createUser.fulfilled, (s, a) => {
        s.list.unshift(a.payload);
      })
      .addCase(updateUser.fulfilled, (s, a) => {
        const i = s.list.findIndex((u) => u._id === a.payload._id);
        if (i !== -1) s.list[i] = a.payload;
      })
      .addCase(deleteUser.fulfilled, (s, a) => {
        s.list = s.list.filter((u) => u._id !== a.payload);
      });
  },
});

export default usersSlice.reducer;
