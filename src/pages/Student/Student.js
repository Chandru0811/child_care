import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
// import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import { SCREENS } from "../../config/ScreenFilter";
import StudentAdd from "./StudentAdd";
import StudentEdit from "./StudentEdit";

const Student = () => {
  const tableRef = useRef(null);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  console.log("Screens : ", SCREENS);

  // useEffect(() => {
  //   const getCenterData = async () => {
  //     try {
  //       const response = await api.get("/getAllStudentDetails");
  //       setDatas(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getCenterData();
  // }, []);

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      // DataTable already initialized, no need to initialize again
      return;
    }
    $(tableRef.current).DataTable();
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllStudentDetails");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container-fluid my-4 center">
    <div className="card shadow border-0 mb-2 top-header ">
      <div className="container mb-3">
        <div className="d-flex justify-content-start px-4">

          <h2>Student</h2>

        </div>

        <div className="my-3 d-flex justify-content-end mb-5">

         <StudentAdd />

        </div>

        {loading ? (
          <div className="loader-container">
            <div className="loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
          <table ref={tableRef} className="display">
            <thead>
              <tr>
                <th scope="col">S No</th>
                <th scope="col">Level</th>
                <th scope="col">Code</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.level}</td>
                  <td>{data.levelCode}</td>
                  <td>
                    {data.status === "Active" ? (
                      <span className="badge badges-Green">Active</span>
                    ) : (
                      <span className="badge badges-Red">Inactive</span>
                    )}
                  </td>
                  <td>
                    {storedScreens?.levelRead && (
                      <Link to={`/level/view/${data.id}`}>
                        <button className="btn btn-sm">
                          <FaEye />
                        </button>
                      </Link>
                    )}
                    {storedScreens?.levelUpdate && (
                      <StudentEdit id={data.id} 
                      // onSuccess={refreshData} 
                      />
                    )}
                    {/* {storedScreens?.levelDelete && (
                  <Delete
                    onSuccess={refreshData}
                    path={`/deleteCourseLevel/${data.id}`}
                  />
                )} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default Student;
