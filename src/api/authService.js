import axios from "axios";

export const login = async (email, password) => {
  const response = await axios.post("https://localhost:7105/api/authen/login", { email, password });
  return response.data.data; // { token, user }
};
