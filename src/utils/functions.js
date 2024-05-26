import { jwtDecode } from "jwt-decode";

export const decodeToken = () => {
  try {
    const token = localStorage.getItem("access_token");
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

