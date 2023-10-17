import axios from "axios";
const token =
  localStorage.getItem("token") ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEiLCJGaXJzdE5hbWUiOiJUZW11cmJlayIsIkxhc3ROYW1lIjoiS29kaXJvdiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoid28udGVtdXJiZWtAZ21haWwuY29tIiwiZXhwIjoxNjk3NjAyMDAwLCJpc3MiOiJodHRwOi8vYWdpbGVzaG9wLnV6IiwiYXVkIjoiQWdpbGVTaG9wIn0.YzxHWDlQCPifbEICt9JCMlsfiqQBVfHspaEd10BiUOk";
  
export const baseUrlImg = "http://64.227.42.134:3030";
export const baseUrl = "http://64.227.42.134:3030/api";
const apiRoot = axios.create({
  baseURL: `http://161.35.188.153`,
  // headers:{
  //   Authorization: `Bearer ${token}`,
  // }
});
const instance = axios.create({
  baseURL: "http://64.227.42.134:3030",
  headers: {
    ["Authorization"]: `Bearer ${token}`,
  },
});

// Interceptors for handling common scenarios
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 400) {
      return error.response;
    }
    if (error.response.status === 401) {
      // Redirect to unauthorized page
      // You can use Vue Router to navigate
      console.log("401 error handled");
      alert("Error - 401 Unauthorized");
    } else if (error.response.status === 404) {
      // Redirect to not found page
      // You can use Vue Router to navigate
      console.log("404 error handled");
      alert("Error - 404 Not found error");
    } else if (error.response.status === 500) {
      console.log("500 error handled");
      alert("Error - 500 Server or Backend");
    } else {
      console.log(error.response);
      alert(error.response.data);
    }
  }
);

export default instance;
