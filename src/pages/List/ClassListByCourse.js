// apiService.js

import toast from "react-hot-toast";
import api from "../../config/URL";

const fetchAllClassesWithIdsC = async (id) => {
  try {
    const response = await api.get(`getClassIdsAndNamesByCourseId/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching Class data:", error?.message);
    throw error?.message;
  }
};

export default fetchAllClassesWithIdsC;
