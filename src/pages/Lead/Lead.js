import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import api from "../../config/URL";
import Delete from "../../components/common/Delete";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllSubjectsWithIds from "../List/SubjectList";
import toast from "react-hot-toast";
// import { SCREENS } from "../../config/ScreenFilter";

const Lead = () => {
  const tableRef = useRef(null);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  // console.log("Screens : ", SCREENS);

  const [centerData, setCenterData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const subjectData = await fetchAllSubjectsWithIds();
      setCenterData(centerData);
      setSubjectData(subjectData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getCenterData = async () => {
      try {
        const response = await api.get("/getAllLeadInfo");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }
    };
    getCenterData();
    fetchData();
  }, []);

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
  console.log("object",datas)
  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllLeadInfo");
      setDatas(response.data);
      
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div class="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <div className="container-fluid my-4 center">
          <div className="card shadow border-0 mb-2 top-header">
            <div className="container my-4 px-0 ">
              <div className=" d-flex  justify-content-between  px-4
              ">
                <div>
                  <h2>Lead</h2>
                </div>
                <div className="">
                {storedScreens?.leadListingCreate && ( 
                  <Link to="/lead/lead/add">
                    <button type="button" className="btn btn-button btn-sm">
                      Add <i class="bx bx-plus"></i>
                    </button>
                  </Link>
                )}
                </div>
              </div>
              <hr />
              <div className=" table-responsive px-4">
              <table ref={tableRef} className="display">
                <thead>
                  <tr>
                    <th scope="col" style={{ whiteSpace: "nowrap" }}>
                      S No
                    </th>
                    <th scope="col">Centre</th>
                    <th scope="col">Student Name</th>

                    {/* <th scope="col">Parent Name</th> */}
                    <th scope="col">Payment Status</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                    {/* <th scope="col" className="text-center">
                  Pending
                </th> */}
                  </tr>
                </thead>
                <tbody>
                  {datas.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {" "}
                        {centerData &&
                          centerData.map((center) =>
                            parseInt(data.childCareId) === center.id
                              ? center.childCareNames || "--"
                              : ""
                          )}
                      </td>
                      <td>{data.childName}</td>

                      {/* <td>{data.fathersFullName}</td> */}
                      <td>
                        {data.paymentStatus === "REJECTED" ? (
                          <span className="badge bg-danger">Rejected</span>
                        ) : data.paymentStatus === "PAID" ? (
                          <span className="badge bg-success">Paid</span>
                        ) : (
                          <span className="badge bg-warning">Pending</span>
                        )}
                      </td>
                      <td>
                        {data.status === "arranged" ? (
                          <span className="badge badges-Brown">
                            Assessment Arranged
                          </span>
                        ) : data.status === "confirm" ? (
                          <span className="badge badges-Green">Confirmed</span>
                        ) : data.status === "wait" ? (
                          <span className="badge badges-Ash">Waitlist</span>
                        ) : data.status === "called" ? (
                          <span className="badge badges-Blue">Called</span>
                        ) : data.status === "pending" ? (
                          <span className="badge badges-Yellow">
                            Pending for Payment
                          </span>
                        ) : data.status === "drop" ? (
                          <span className="badge badges-Red">Drop</span>
                        ) : (
                          <span className="badge badges-Red">Completed</span>
                        )}
                      </td>

                      <td>
                        <div className="d-flex">
                           {storedScreens?.leadListingRead && (
                            <Link to={`/lead/lead/view/${data.id}`}>
                              <button className="btn btn-sm">
                                <FaEye />
                              </button>
                            </Link>
                        )}
                          {storedScreens?.leadListingUpdate && (
                            <Link to={`/lead/lead/edit/${data.id}`}>
                              <button className="btn btn-sm">
                                <FaEdit />
                              </button>
                            </Link>
                          )} 
                         {storedScreens?.leadListingDelete && ( 
                        <Delete
                          onSuccess={refreshData}
                          path={`/deleteLeadInfo/${data.id}`}
                        />
                  )}
                        </div>
                      </td>
                      {/* <td className="text-center">
                    {data.leadUniqueID !== null ? (
                      <button className="btn">
                        <div className="circle green"></div>
                      </button>
                    ) : (
                      <button className="btn">
                        <div className="circle red"></div>
                      </button>
                    )}
                  </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lead;
