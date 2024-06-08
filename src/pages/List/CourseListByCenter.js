import toast from "react-hot-toast";
import api from "../../config/URL";

const fetchAllCoursesWithIdsC = async (id)=> {
  try {
    const response = await api.get(`getCourseIdsAndNamesByChildCareId/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching Course data:", error?.message);
    throw error?.message;
  }
};

export default fetchAllCoursesWithIdsC;



