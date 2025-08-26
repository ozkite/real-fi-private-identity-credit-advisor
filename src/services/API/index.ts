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
  async generateNilCCReport(nonce: string | null) {
    if (!nonce) {
      return null;
    }

    return apiService.post<INilCCReportGenerationResponse>(
      API_ENDPOINTS.NILCC_GENERATE_REPORT,
      { nonce },
    );
  },
};

export default API;
