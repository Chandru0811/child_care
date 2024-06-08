import toast from "react-hot-toast";
import api from "../../config/URL";

const fetchAllStudentListByCenter = async (id) => {
 
  try {
    const response = await api.get(`getIdsAndChildNamesByChildCareId/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching Course data:", error?.message);
    throw error?.message;
  }
};

export default fetchAllStudentListByCenter;
