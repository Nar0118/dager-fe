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

export async function transformData(data) {
  const result = {};
  const nestedKeys = [
    "FRONTROTOR",
    "FRONTBRAKE",
    "REARROTOR",
    "REARBRAKE",
    "PARKINGSHOE",
  ];

  for (const key in data) {
    const [mainKey, subKey] = key.split("_");

    if (nestedKeys.includes(mainKey)) {
      if (!result[mainKey]) {
        result[mainKey] = {};
      }
      result[mainKey][subKey] = data[key];
    } else {
      result[key] = data[key];
    }
  }

  return result;
}

export function flattenData(data) {
  const result = {};

  for (const key in data) {
      if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
          for (const subKey in data[key]) {
              result[`${key}_${subKey}`] = data[key][subKey];
          }
      } else {
          result[key] = data[key];
      }
  }

  return result;
}