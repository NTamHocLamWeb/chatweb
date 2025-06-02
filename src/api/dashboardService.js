import axios from "axios";

export const getDashboardData = async (token) => {
  const res = await axios.get("/api/dashboard", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
