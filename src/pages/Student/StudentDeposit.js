import React, { useState } from "react";
import { Link } from "react-router-dom";

const StudentDeposit = () => {
  const [loadIndicator, setLoadIndicator] = useState(false);
  return (
    <div className="container my-4">
         
        <div className="card shadow border-0 mb-2 top-header">
            <div className="container-fluid py-4">
              <div className="row align-items-center">
                <div className="col">
                  <div className="d-flex align-items-center gap-4">
                  
                  </div>
                </div>
                <div className="col-auto">
                  <div className="hstack gap-2 justify-content-end">
                    <Link to="/student">
                      <button type="submit" className="btn btn-sm btn-light">
                        <span>Back</span>
                      </button>
                    </Link>
                    &nbsp;&nbsp;
                    <button
                      type="submit"
                      className="btn btn-button btn-sm"
                      disabled={loadIndicator}
                    >
                      {loadIndicator && (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                      )}
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card shadow border-0 mb-2 top-header">
            <div className="container p-5">
      <div className="container">
        <div className="row py-4">
          <div class="col-md-6 col-12 mb-4">
            <lable className="form-lable">
            Centre Name<span class="text-danger"></span>
            </lable>
            <select
              class="form-select form select-sm"
              aria-label="Default select example"
            >
              <option selected>Arty Learning @ HG</option>
              <option value="1">Arty Learning @ AMk</option>
            </select>
          </div>
          <div class="col-md-6 col-12 mb-2">
            <lable className="form-lable">
              Student ID<span class="text-danger"></span>
            </lable>
            <div class="input-group mb-3">
              <input
                type="text"
                className={`form-control iconInput `}
                value={"S000377"}
              />
            </div>
          </div>
          <div class="col-md-6 col-12 mb-2">
            <lable className="form-lable">
              Student Name<span class="text-danger"></span>
            </lable>
            <div class="input-group mb-3">
              <input
                type="text"
                className={`form-control iconInput `}
                value={"Meagan Han"}
              />
            </div>
          </div>
          <div class="col-md-6 col-12 mb-2">
            <lable className="form-lable">
              Date of Absent<span class="text-danger"></span>
            </lable>
            <div class="input-group mb-3">
              <input
                type="date"
                className={`form-control iconInput `}
                value={"2024-01-06"}
              />
            </div>
          </div>
          <div class="col-md-6 col-12 mb-4">
            <lable className="form-lable">
              Absent Reason<span class="text-danger"></span>
            </lable>
            <select
              class="form-select form select-sm"
              aria-label="Default select example"
            >
              <option selected>Fever</option>
              <option value="1">Cold</option>
            </select>
          </div>
          <div class="col-md-6 col-12 mb-2">
            <lable className="form-lable">
              Deduction Account<span class="text-danger"></span>
            </lable>
            <div class="input-group mb-3">
              <input
                type="text"
                className={`form-control iconInput `}
                value={"0.00"}
              />
            </div>
          </div>
          <div class="col-md-6 col-12 mb-2">
            <lable className="form-lable">
              Credit Account<span class="text-danger"></span>
            </lable>
            <div class="input-group mb-3">
              <input
                type="text"
                className={`form-control iconInput `}
                value={"0.00"}
              />
            </div>
          </div>
          <div class="col-md-6 col-12 mb-2">
            <lable className="form-lable">
              Parent Name<span class="text-danger"></span>
            </lable>
            <div class="input-group mb-3">
              <input
                type="text"
                className={`form-control iconInput `}
                value={"Kate Lee"}
              />
            </div>
          </div>
          <div class="col-md-6 col-12 mb-2">
            <lable className="form-lable">
              Parent Email ID<span class="text-danger"></span>
            </lable>
            <div class="input-group mb-3">
              <input
                type="text"
                className={`form-control iconInput `}
                value={"katz215@hotmail.com"}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default StudentDeposit;
