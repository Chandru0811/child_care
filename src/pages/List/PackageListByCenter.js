import toast from "react-hot-toast";
import api from "../../config/URL";

const fetchAllPackageListByCenter = async (id) => {
  try {
    const response = await api.get(
      `getChildCarePackageIdsAndNamesByChildCareId/${id}`
    );
    return response.data;
  } catch (error) {
    toast.error("Error fetching Course data:", error?.message);
    throw error?.message;
  }
};

export default fetchAllPackageListByCenter;
