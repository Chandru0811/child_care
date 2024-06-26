import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
// import { format } from "date-fns"; // Import format function from date-fns
import fetchAllCentersWithIds from "../List/CenterList";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import api from "../../config/URL";
import fetchAllEmployeeListByCenter from "../List/EmployeeList";

const validationSchema = Yup.object({
  enrichmentCareId: Yup.string().required("*Centre name is required"),
  userId: Yup.string().required("*Employee name is required"),
  grossPay: Yup.number()
    .required("*Basic pay is required")
    .typeError("Basic pay must be a number"),
  payrollMonth: Yup.string().required("*Select the Payroll Month"),
  bonus: Yup.number()
    .required("*Bonus is required")
    .typeError("Bonus must be a number"),
  deductionAmount: Yup.number()
    .required("*Deduction is required")
    .typeError("Deduction must be a number"),
  netPay: Yup.number()
    .required("*Net pay is required")
    .typeError("Net pay must be a number"),
  status: Yup.string().required("*Status is required"),
});

function AddPayroll() {
  const [centerData, setCenterData] = useState(null);
  const [userNamesData, setUserNameData] = useState(null);
  const [userSalaryInfo, setUserSalaryInfo] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [bonus, setBonus] = useState(0); // State for bonus value

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      enrichmentCareId: "",
      userId: "",
      grossPay: "",
      payrollMonth: "",
      bonus: 0,
      deductionAmount: 0,
      netPay: 0,
      status: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      let selectedCenterName = "";
      let selectedEmployeeName = "";

      centerData.forEach((center) => {
        if (parseInt(values.enrichmentCareId) === center.id) {
          selectedCenterName = center.centerNames || "--";
        }
      });

      userNamesData.forEach((employee) => {
        if (parseInt(values.userId) === employee.id) {
          selectedEmployeeName = employee.userNames || "--";
        }
      });

      let payload = {
        centerName: selectedCenterName,
        enrichmentCareId: values.enrichmentCareId,
        userId: values.userId,
        employeeName: selectedEmployeeName,
        grossPay: values.grossPay,
        payrollMonth: values.payrollMonth,
        bonus: values.bonus,
        deductionAmount: values.deductionAmount,
        netPay: values.netPay,
        status: values.status,
      };
      // console.log(payload);
      try {
        const response = await api.post("/createUserPayroll", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/payrolladmin");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error?.response?.status === 409) {
          toast.warning("The payroll for this user has already been generated")
        } else {
          toast.error(error?.response?.data?.message);
        }
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const handleCenterChange = async (event) => {
    setUserNameData(null);
    const enrichmentCareId = event.target.value;
    formik.setFieldValue("enrichmentCareId", enrichmentCareId);
    formik.setFieldValue("deductionAmount", "");
    formik.setFieldValue("grossPay", "");
    try {
      await fetchUserName(enrichmentCareId);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const centers = await fetchAllCentersWithIds();
      setCenterData(centers);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchUserName = async (enrichmentCareId) => {
    try {
      const userNames = await fetchAllEmployeeListByCenter(enrichmentCareId);
      setUserNameData(userNames);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserSalaryInfo = async (userId, payrollMonth) => {
    // alert(userId, payrollMonth);
    const queryParams = new URLSearchParams({
      userId: userId,
      deductionMonth: payrollMonth,
    });

    try {
      const response = await api.get(
        `/getCurrentMonthUserDeduction?${queryParams}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUserSalaryInfo(response.data);
      formik.setFieldValue("deductionAmount", response.data.deductionAmount);
      formik.setFieldValue("grossPay", response.data.grossPay);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // useEffect(() => {
  //   const currentMonth = format(new Date(), "yyyy-MM");
  //   formik.setFieldValue("payrollMonth", currentMonth);
  // }, []);

  const handleUserChange = async (event) => {
    const userId = event.target.value;
    formik.setFieldValue("userId", userId);
    const { payrollMonth } = formik.values;
    await fetchUserSalaryInfo(userId, payrollMonth);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const { userId, payrollMonth } = formik.values;
      await fetchUserSalaryInfo(userId, payrollMonth);
    };

    fetchUserData();
  }, [formik.values.userId, formik.values.payrollMonth]);

  useEffect(() => {
    const calculateNetPay = () => {
      const grossPay = parseFloat(formik.values.grossPay) || 0;
      const bonus = parseFloat(formik.values.bonus) || 0;
      const deductionAmount = parseFloat(formik.values.deductionAmount) || 0;
      const netPay = grossPay + bonus - deductionAmount;
      formik.setFieldValue("netPay", isNaN(netPay) ? 0 : netPay.toFixed(2));
    };
    calculateNetPay();
  }, [
    formik.values.grossPay,
    formik.values.bonus,
    formik.values.deductionAmount,
  ]);

  return (
    <div className="container-fluid center">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">

          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h2 className="h2 ls-tight headingColor">Add Payroll</h2>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/payrolladmin">
                    <button type="button" className="btn btn-sm btn-border">
                      Back
                    </button>
                  </Link>
                  &nbsp;&nbsp;
                  <button type="submit" className="btn btn-button btn-sm" disabled={loadIndicator}>
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
            <div className="row">
              <div className="col-md-6 col-12 mb-3 ">
                <lable className="">Centre Name</lable>
                <span className="text-danger">*</span>
                <select
                  {...formik.getFieldProps("enrichmentCareId")}
                  className={`form-select ${formik.touched.enrichmentCareId && formik.errors.enrichmentCareId
                      ? "is-invalid"
                      : ""
                    }`}
                  aria-label="Default select example"
                  onChange={handleCenterChange}
                >
                  <option selected disabled></option>
                  {centerData &&
                    centerData.map((center) => (
                      <option key={center.id} value={center.id}>
                        {center.enrichmentCareNames}
                      </option>
                    ))}
                </select>
                {formik.touched.enrichmentCareId && formik.errors.enrichmentCareId && (
                  <div className="invalid-feedback">{formik.errors.enrichmentCareId}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3 ">
                <lable className="">Employee Name</lable>
                <select
                  {...formik.getFieldProps("userId")}
                  class={`form-select  ${formik.touched.userId && formik.errors.userId
                      ? "is-invalid"
                      : ""
                    }`}
                  onChange={handleUserChange}
                >
                  <option></option>
                  {userNamesData &&
                    userNamesData.map((userName) => (
                      <option key={userName.id} value={userName.id}>
                        {userName.userNames}
                      </option>
                    ))}
                </select>
                {formik.touched.userId && formik.errors.userId && (
                  <div className="invalid-feedback">{formik.errors.userId}</div>
                )}
              </div>

              <div className="  col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    Basic Pay<span className="text-danger">*</span>
                  </lable>
                  <input
                    type="text"
                    className={`form-control  ${formik.touched.grossPay && formik.errors.grossPay
                        ? "is-invalid"
                        : ""
                      }`}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("grossPay")}
                    readOnly
                  />
                  {formik.touched.grossPay && formik.errors.grossPay && (
                    <div className="invalid-feedback">
                      {formik.errors.grossPay}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <label className="form-label">
                    Payroll Month<span className="text-danger">*</span>
                  </label>
                  <input
                    type="month"
                    className={`form-control ${formik.touched.payrollMonth && formik.errors.payrollMonth
                        ? "is-invalid"
                        : ""
                      }`}
                    {...formik.getFieldProps("payrollMonth")}
                  />
                  {formik.touched.payrollMonth && formik.errors.payrollMonth && (
                    <div className="invalid-feedback">
                      {formik.errors.payrollMonth}
                    </div>
                  )}
                </div>
              </div>
              <div className="  col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    Bonus<span className="text-danger">*</span>
                  </lable>
                  <input
                    type="text"
                    className={`form-control  ${formik.touched.bonus && formik.errors.bonus
                        ? "is-invalid"
                        : ""
                      }`}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("bonus")}
                  />
                  {formik.touched.bonus && formik.errors.bonus && (
                    <div className="invalid-feedback">{formik.errors.bonus}</div>
                  )}
                </div>
              </div>
              <div className="  col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    Deduction<span className="text-danger">*</span>
                  </lable>
                  <input
                    type="text"
                    className={`form-control  ${formik.touched.deductionAmount &&
                        formik.errors.deductionAmount
                        ? "is-invalid"
                        : ""
                      }`}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("deductionAmount")}
                    readOnly
                  />
                  {formik.touched.deductionAmount &&
                    formik.errors.deductionAmount && (
                      <div className="invalid-feedback">
                        {formik.errors.deductionAmount}
                      </div>
                    )}
                </div>
              </div>
              <div className="  col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    Net Pay<span className="text-danger">*</span>
                  </lable>
                  <input
                    type="text"
                    className={`form-control  ${formik.touched.netPay && formik.errors.netPay
                        ? "is-invalid"
                        : ""
                      }`}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("netPay")}
                    readOnly
                  />
                  {formik.touched.netPay && formik.errors.netPay && (
                    <div className="invalid-feedback">{formik.errors.netPay}</div>
                  )}
                </div>
              </div>
              <div className="  col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    Status<span className="text-danger">*</span>
                  </lable>
                  <select
                    {...formik.getFieldProps("status")}
                    className={`form-select    ${formik.touched.status && formik.errors.status
                        ? "is-invalid"
                        : ""
                      }`}
                    aria-label="Default select example"
                  >
                    <option selected></option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="PENDING">Pending</option>
                  </select>

                  {formik.touched.status && formik.errors.status && (
                    <div className="invalid-feedback">{formik.errors.status}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}

export default AddPayroll;
