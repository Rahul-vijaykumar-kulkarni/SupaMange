import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../lib/supabase";

// Fetch users from Supabase
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Error fetching users:", error.message);
    throw new Error(error.message);
  }

  return data;
});

// Add a new user to Supabase
export const addUser = createAsyncThunk("users/addUser", async (newUser) => {
  const formattedDateJoined = new Date(newUser.dateJoined)
    .toISOString()
    .split("T")[0];
  const formattedLastLogin = new Date(newUser.lastLogin).toISOString();

  // Remove `id` field if present (Supabase will auto-generate it)
  const { id, ...userData } = newUser; // Destructure to remove `id`

  const { data, error } = await supabase.from("users").insert([
    {
      stuname: userData.name,
      cohort: userData.cohort,
      Courses: userData.courses,
      DateJoined: formattedDateJoined,
      LastLogin: formattedLastLogin,
      Status: userData.status,
    },
  ]);

  if (error) {
    console.error("Error adding user:", error.message);
    throw new Error(error.message);
  }

  return data[0]; // Return the newly inserted user
});

// Update an existing user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedUser) => {
    const formattedDateJoined = new Date(updatedUser.dateJoined)
      .toISOString()
      .split("T")[0];
    const formattedLastLogin = new Date(updatedUser.lastLogin).toISOString();

    const { data, error } = await supabase
      .from("users")
      .update({
        stuname: updatedUser.name,
        cohort: updatedUser.cohort,
        Courses: updatedUser.courses,
        DateJoined: formattedDateJoined,
        LastLogin: formattedLastLogin,
        Status: updatedUser.status,
      })
      .eq("id", updatedUser.id);

    if (error) {
      console.error("Error updating user:", error.message);
      throw new Error(error.message);
    }

    return data[0]; // Return the updated user
  }
);

// Deleting a user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    const { error } = await supabase.from("users").delete().eq("id", userId);

    if (error) {
      console.error("Error deleting user:", error.message);
      throw new Error(error.message);
    }

    return userId; // Return the ID of the deleted user
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
        state.error = null; // Reset error state on success
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.error = null; // Reset error state on success
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
        state.error = null; // Reset error state on success
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.error = null; // Reset error state on success
      });
  },
});

export default usersSlice.reducer;
