import toast from "react-hot-toast";
import api from "../../config/URL";
import axios from "axios";

const fetchAllTeachersWithIds = async () => {
  try {
    // const response = await api.get("getAllTeacherNamesWithIds");
    const response = await axios.get("http://localhost:8080/api/getAllTeacherNamesWithIds",
    {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcmVtQDIwMjQiLCJpYXQiOjE3MTc1Njk5MDcsImV4cCI6MTcyMjc1MzkwN30.PP-HiKeRpUQ0NEKaXvhgtiCHyOtf0r6dYhhMHhE56he2StCa9yfmo4vZI2IwU3V8natChVVh1fHL3OPcbtqMjg'
      },
    }
    );
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error?.message);
    throw error?.message;
  }
};

export default fetchAllTeachersWithIds;
