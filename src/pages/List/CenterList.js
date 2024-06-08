// apiService.js

import toast from "react-hot-toast";
import api from "../../config/URL";

const fetchAllCentersWithIds = async () => {
  try {
    const response = await api.get("getAllChildCaresWithIds");
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error?.message);
    throw error?.message;
  }
};

export default fetchAllCentersWithIds;
