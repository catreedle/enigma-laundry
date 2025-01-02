import { jwtDecode } from "jwt-decode";

export default function isTokenValid(token) {
  try {
    const { exp } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return exp > currentTime; // Token is valid if expiration time is in the future
  } catch (error) {
    console.log(error);
    return false;
  }
}
