import toast from "react-hot-toast";
import api from "../../config/URL";
import axios from "axios";

const fetchAllTeacherListByCenter = async (id) => {
  try {
    // const response = await api.get(`getTeacherListByChildCareId/${id}`);
    const response = await axios.get(`http://localhost:8080/api/getTeacherListByChildCareId/${id}`,
    {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcmVtQDIwMjQiLCJpYXQiOjE3MTc1Njk5MDcsImV4cCI6MTcyMjc1MzkwN30.PP-HiKeRpUQ0NEKaXvhgtiCHyOtf0r6dYhhMHhE56he2StCa9yfmo4vZI2IwU3V8natChVVh1fHL3OPcbtqMjg'
      },
    }
    );
    return response.data;
  } catch (error) {
    toast.error("Error fetching Course data:", error?.message);
    throw error?.message;
  }
};

export default fetchAllTeacherListByCenter;
