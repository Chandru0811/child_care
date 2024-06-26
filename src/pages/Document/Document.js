import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import api from "../../config/URL";
import toast from "react-hot-toast";
import fetchAllStudentsWithIds from "../List/StudentList";
import DocumentEdit from "./DocumentEdit";
import { IoMdAdd } from "react-icons/io";
// import { SCREENS } from "../../config/ScreenFilter";

const Document = () => {
  const tableRef = useRef(null);

  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  //  const storedScreens = {
  //   documentListingCreate:true,
  //   documentListingRead:true

  //  }
  // console.log("Screens : ", SCREENS);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCenterData = async () => {
      try {
        const response = await api.get("/getAllCenter");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetching Data : ", error);
      }
    };
    getCenterData();
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

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllCenter");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container-fluid center">
    <div className="card shadow border-0 mb-2 top-header">
      <div className="container-fluid px-0 pt-4">
      <div className=" d-flex  justify-content-between px-4">
          <div className="">
            <h2>Document</h2>
          </div>
          <div className="">
          {storedScreens?.documentListingCreate && (
            <Link to="/document/add">
              <button
                type="button"
                className="btn btn-button btn-sm"
                style={{ fontWeight: "600px !important" }}
              >
                Add <i className="bx bx-plus"></i>
              </button>
            </Link>
          )}
          </div>
        </div>
        <hr />
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
      <div className="table-responsive px-4">
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col" style={{ whiteSpace: "nowrap" }}>
              S No
            </th>
            <th scope="col">Document Name</th>
            <th scope="col">Centre Manager</th>
            <th scope="col">Code</th>
            <th scope="col">UEN Number</th>
            <th scope="col">Mobile</th>
            <th className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.centerName}</td>
              <td>{data.centerManager}</td>
              <td>{data.code}</td>
              <td>{data.uenNumber}</td>
              <td>{data.mobile}</td>
              <td>
                <div className="d-flex justify-content-center align-items-center ">
                  {storedScreens?.documentListingCreate && (
                    <div class="dropdown" style={{ display: "inline-block" }}>
                      <button
                        class="btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <IoMdAdd />
                      </button>
                     
                    </div>
                  )}
                  {storedScreens?.documentListingRead && (
                    <Link
                      to={`/center/view/${data.id}`}
                      style={{ display: "inline-block" }}
                    >
                      <button className="btn btn-sm">
                        <FaEye />
                      </button>
                    </Link>
                  )}
                  {storedScreens?.documentListingUpdate && (
                    <Link
                      to={`/center/edit/${data.id}`}
                      style={{ display: "inline-block" }}
                    >
                      <button className="btn btn-sm">
                        <FaEdit />
                      </button>
                    </Link>
                  )}
                  {/* {storedScreens?.centerListingDelete && (
                    <Delete
                      onSuccess={refreshData}
                      path={`/deleteCenter/${data.id}`}
                      style={{ display: "inline-block" }}
                    />
                  )} */}
                </div>
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

export default Document;
