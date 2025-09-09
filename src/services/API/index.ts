import axios from "axios";
import API_ENDPOINTS from "./constants";
import type { INilCCReportGenerationResponse } from "./types";

const apiService = axios.create({
  baseURL: "/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const API = {
  async generateNilCCReport() {
    return apiService.get<INilCCReportGenerationResponse>(
      API_ENDPOINTS.NILCC_GENERATE_REPORT,
    );
  },
};

export default API;
