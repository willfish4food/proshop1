import axios from "axios";

// Register user
const register = async (userData) => {
  const response = await axios.post(`/api/users/`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`/api/users/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const getUserProfile = async (user, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`/api/users/${user._id}`, config);
  return response.data;
};

const updateUserProfile = async (user, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(`/api/users/profile`, user, config);
  return data;
};

const listUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(`/api/users`, config);
  return data;
};

const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.delete(`/api/users/${id}`, config);
  return console.log(`User ${id} deleted`);
};

const userService = {
  register,
  logout,
  login,
  getUserProfile,
  updateUserProfile,
  listUsers,
  deleteUser,
};

export default userService;
