import toast from "react-hot-toast";
import api from "../../config/URL";

const fetchAllTeachersWithIdsC = async (id) => {
  try {
    const response = await api.get(`getTeacherIdsAndTeacherNamesByClassId/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error?.message);
    throw error?.message;
  }
};

export default fetchAllTeachersWithIdsC;
