import { apiStatusClient } from "@/lib/api";

export const apihealth = async () => apiStatusClient.get("/health");
