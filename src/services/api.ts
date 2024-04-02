import axios from "axios";
import { GraphData } from "../types/GraphData";
import { User } from "../types/User";
import { Assessment } from "../types/Assessment";

axios.defaults.baseURL = "https://user-assessment-api.vercel.app/";

export const login = (credentials: { email: string; password: string }) => {
  return axios
    .post("/api/login", credentials)
    .then((response) => response.data);
};

export const getUserAssessments = (): Promise<Assessment[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication token not found");
  }

  return axios
    .get("/api/userassessments", {
      headers: {
        "Content-Type": "application/json",
        "X-Token": token,
      },
    })
    .then((response) => response.data);
};

export const getAssessmentGraph = (
  assessmentId: number
): Promise<GraphData> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication token not found");
  }
  return axios
    .get(`/api/userassessments/graph?id=${assessmentId}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Token": token,
      },
    })
    .then((response) => response.data);
};

export const getUsers = (): Promise<User[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication token not found");
  }

  return axios
    .get("/api/users", {
      headers: {
        "Content-Type": "application/json",
        "X-Token": token,
      },
    })
    .then((response) => response.data);
};
