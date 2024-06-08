import toast from "react-hot-toast";
import api from "../../config/URL";

const fetchAllSubjectsWithIds = async () => {
  try {
    const response = await api.get("getAllSubjectsWithIds");
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error?.message);
    throw error?.message;
  }
};

export default fetchAllSubjectsWithIds;
