import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../store/userSlice";
// import TopSearch from "./TopSearch";

const Canvas = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  const [newUser, setNewUser] = useState({
    id: null, // For updating users
    name: "",
    cohort: "2024", // Default cohort
    courses: "Math, Science", // Default courses
    dateJoined: "",
    lastLogin: "",
    status: true, // Active by default
  });

  const [filters, setFilters] = useState({
    active: "all", // Filter for Active/Inactive
    cohort: "all", // Filter for Cohort Year
  });

  const [isFormVisible, setIsFormVisible] = useState(false); // State to toggle form visibility

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    if (newUser.name && newUser.dateJoined && newUser.lastLogin) {
      if (newUser.id) {
        // Update user
        dispatch(updateUser(newUser));
      } else {
        // Add new user
        dispatch(addUser(newUser));
      }

      // Reset the form after adding or updating
      setNewUser({
        id: null,
        name: "",
        cohort: "2024",
        courses: "Math, Science",
        dateJoined: "",
        lastLogin: "",
        status: true,
      });

      // Hide the form after submission
      setIsFormVisible(false);
    }
  };

  const handleEditUser = (user) => {
    setNewUser({ ...user });
    setIsFormVisible(true); // Show the form when editing a user
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  // Filter the users based on active status and cohort year
  const filteredUsers = users.filter((user) => {
    const statusFilter =
      filters.active === "all" ||
      (filters.active === "active" && user.Status) ||
      (filters.active === "inactive" && !user.Status);

    const cohortFilter =
      filters.cohort === "all" || user.cohort === filters.cohort;

    return statusFilter && cohortFilter;
  });

  /// image rendering
  const renderCourseIcons = (courses) => {
    // Ensure courses are being split correctly
    const courseList = courses
      ? courses.split(",").map((course) => course.trim())
      : [];

    // Log course list for debugging
    console.log(courseList); // Check if courses are being parsed correctly

    return (
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {/* Check for Math and Science courses */}
        {courseList.includes("Math") && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/math.png"
              alt="Math"
              style={{ marginRight: "8px", width: "30px", height: "30px" }}
            />
            <p>CBSE 9 Math</p>
          </div>
        )}
        {courseList.includes("Science") && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/science.png"
              alt="Science"
              style={{ marginRight: "8px", width: "30px", height: "30px" }}
            />
            <p>CBSE 9 Science</p>
          </div>
        )}

        {/* Display name of other courses */}
        {courseList.length > 0 &&
          courseList.map((course, index) => {
            if (course !== "Math" && course !== "Science") {
              return (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <p>{course}</p>
                </div>
              );
            }
            return null;
          })}

        {/* If no recognized courses are provided */}
        {courseList.length === 0 ? <p>No courses available</p> : null}
      </div>
    );
  };

  return (

    
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="bg-white shadow p-4 flex justify-between items-center flex-wrap">
        <h1 className="text-xl font-bold flex-1">User Management</h1>

        {/* Button to toggle the Add User Form */}
        <button
          onClick={() => setIsFormVisible(!isFormVisible)} // Toggle visibility
          className="bg-custombg text-black px-4 py-2 rounded mb-4 md:mb-0"
        >
          {isFormVisible ? "Hide Add User Form" : "Add User"}
          {/* <img src="./plus.png" alt="" /> */}
        </button>
      </header>

      <main className="mt-8">
        {/* Add/Edit User Form - Only visible if isFormVisible is true */}
        {isFormVisible && (
          <div className="grid gap-4 mb-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Cohort"
              value={newUser.cohort}
              onChange={(e) =>
                setNewUser({ ...newUser, cohort: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Courses"
              value={newUser.courses}
              onChange={(e) =>
                setNewUser({ ...newUser, courses: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="date"
              placeholder="Date Joined"
              value={newUser.dateJoined}
              onChange={(e) =>
                setNewUser({ ...newUser, dateJoined: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="datetime-local"
              placeholder="Last Login"
              value={newUser.lastLogin}
              onChange={(e) =>
                setNewUser({ ...newUser, lastLogin: e.target.value })
              }
              className="border p-2 rounded"
            />
            <select
              value={newUser.status}
              onChange={(e) =>
                setNewUser({ ...newUser, status: e.target.value === "true" })
              }
              className="border p-2 rounded"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            {/* Add/Update Button */}
            <button
              onClick={handleAddUser}
              className="bg-blue-500 text-white flex items-center px-4 py-2 rounded col-span-1 sm:col-span-2 lg:col-span-3"
            >
              {newUser.id ? "Update User" : "Add User"}
            </button>
          </div>
        )}

        {/* Filter Section */}
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <select
            value={filters.active}
            onChange={(e) => setFilters({ ...filters, active: e.target.value })}
            className="border p-2 rounded w-full sm:w-auto"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={filters.cohort}
            onChange={(e) => setFilters({ ...filters, cohort: e.target.value })}
            className="border p-2 rounded w-full sm:w-auto"
          >
            <option value="all">All Cohorts</option>
            {Array.from(new Set(users.map((user) => user.cohort))).map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
        </div>

        {/* User Table */}
        {status === "loading" && <div>Loading...</div>}
        {status === "failed" && <div>Error: {error}</div>}
        {status === "succeeded" && filteredUsers.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Cohort</th>
                  <th className="py-2 px-4 text-left">Courses</th>
                  <th className="py-2 px-4 text-left">Date Joined</th>
                  <th className="py-2 px-4 text-left">Last Login</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-2 px-4">{user.stuname}</td>
                    <td className="py-2 px-4">{user.cohort}</td>
                    <td className="py-2 px-4">
                      {renderCourseIcons(user.Courses)}
                    </td>
                    <td className="py-2 px-4">{user.DateJoined}</td>
                    <td className="py-2 px-4">{user.LastLogin}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${
                          user.Status ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></span>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 text-white px-2 py-2 rounded ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Canvas;
