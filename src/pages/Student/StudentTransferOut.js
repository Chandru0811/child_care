import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../config/URL";
import fetchAllCoursesWithIds from "../List/CourseList";
import fetchAllCentersWithIds from "../List/CenterList";

function StudentTransferOut () {
  const { id } = useParams();
  // const [data, setData] = useState({});
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [centerData, setCenterData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const validationSchema = Yup.object({
    courseId: Yup.string().required("Current Course is required"),
    // currentClass: Yup.string().required("Current Class is required"),
    lastLessonDate: Yup.string().required("Last Lesson Date  is required"),
    childCareId: Yup.string().required("Transfer To is required"),
    reason: Yup.string().required("Reason is required"),
    childCareRemark: Yup.string().required("Centre Remark is required"),
  });

  const fetchData = async () => {
    try {
      const course = await fetchAllCoursesWithIds();
      const center = await fetchAllCentersWithIds();
      setCourseData(course);
      setCenterData(center);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      courseId: "",
      // currentClass: "",
      lastLessonDate: "",
      childCareId: "",
      preferTiming: "",
      preferDays: "",
      preferStartDate: "",
      reason: "",
      otherReason: "",
      childCareRemark: "",
      parentRemark: "",
    },
    validationSchema: validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      // setLoadIndicator(true)
      // console.log(values);
      try {
        const response = await api.put(`/updatechildDetail/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate(`/student/view/${id}`);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error fetching Data");
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllChildDetails/${id}`);
        if (response.data.childCourseDetailModels.length > 0) {
          // setData(response.data);
          const formattedResponseData = {
            courseId: response.data.childCourseDetailModels[0].courseId,
            childCareId: response.data.childCareId,
          };
          formik.setValues(formattedResponseData);
        }
      } catch (error) {
        toast.error("Error Fetching Form Data");
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
       
      <form onSubmit={formik.handleSubmit}>
      <div className="card shadow border-0 mb-2 top-header">
            <div className="container-fluid py-4">
              <div className="row align-items-center">
                <div className="col">
                  <div className="d-flex align-items-center gap-4">
                    <h2 className="h2 ls-tight headingColor">Add</h2>
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
            <div class="col-md-6 col-12 mb-2">
              <lable class="">
                Current Course<span class="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("courseId")}
                name="courseId"
                className={`form-control   ${
                  formik.touched.courseId && formik.errors.courseId
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
                class="form-select "
              >
                <option></option>
                {courseData &&
                  courseData.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.courseNames}
                    </option>
                  ))}
              </select>
              {formik.touched.courseId && formik.errors.courseId && (
                <div className="invalid-feedback">{formik.errors.courseId}</div>
              )}
            </div>
            {/* <div class="col-md-6 col-12 mb-2">
              <lable class="">
                Current Class<span class="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("currentClass")}
                name="currentClass"
                className={`form-control   ${
                  formik.touched.currentClass && formik.errors.currentClass
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
                class="form-select "
              >
                <option selected></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              {formik.touched.currentClass && formik.errors.currentClass && (
                <div className="invalid-feedback">
                  {formik.errors.currentClass}
                </div>
              )}
            </div> */}
            <div class="col-md-6 col-12 mb-2">
              <lable class="">
                Last Lesson Date<span class="text-danger">*</span>
              </lable>
              <input
                type="date"
                {...formik.getFieldProps("lastLessonDate")}
                name="lastLessonDate"
                className={`form-control   ${
                  formik.touched.lastLessonDate && formik.errors.lastLessonDate
                    ? "is-invalid"
                    : ""
                }`}
              />
              {formik.touched.lastLessonDate &&
                formik.errors.lastLessonDate && (
                  <div className="invalid-feedback">
                    {formik.errors.lastLessonDate}
                  </div>
                )}
            </div>
            <div class="col-md-6 col-12 mb-2">
              <lable class="">
                Transfer To<span class="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("childCareId")}
                name="childCareId"
                className={`form-select   ${
                  formik.touched.childCareId && formik.errors.childCareId
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
                class="form-select "
              >
                <option></option>
                {centerData &&
                  centerData.map((center) => (
                    <option key={center.id} value={center.id}>
                      {center.childCareNames}
                    </option>
                  ))}
              </select>
              {formik.touched.childCareId && formik.errors.childCareId && (
                <div className="invalid-feedback">{formik.errors.childCareId}</div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2 ">
              <label>Prefer Timing</label>
              <input
                class="form-control "
                name="preferTiming"
                {...formik.getFieldProps("preferTiming")}
                type="time"
              />
            </div>
            <div class="col-md-6 col-12 mb-2 ">
              <label>Prefer Days </label>
              <input
                class="form-control "
                name="preferDays"
                {...formik.getFieldProps("preferDays")}
                type="text"
              />
            </div>
            <div class="col-md-6 col-12 mb-2">
              <label>Prefer Start date</label>
              <input
                type="date"
                name="preferStartDate"
                class="form-control "
                {...formik.getFieldProps("preferStartDate")}
              />
            </div>
            <div class="col-md-6 col-12 mb-2">
              <lable class="">
                Reason<span class="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("reason")}
                name="reason"
                className={`form-select   ${
                  formik.touched.reason && formik.errors.reason
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
                class="form-select "
              >
                <option selected></option>
                <option value="Relocation">Relocation</option>
                <option value="Convenience">Convenience</option>
                <option value="Facility Upgrade">Facility Upgrade</option>
                <option value="Schedule Conflict">Schedule Conflict</option>
                <option value="Special Requirements">
                  Special Requirements
                </option>
              </select>
              {formik.touched.reason && formik.errors.reason && (
                <div className="invalid-feedback">{formik.errors.reason}</div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2 ">
              <label>Othet Reason</label>
              <input
                class="form-control "
                type="text"
                {...formik.getFieldProps("otherReason")}
                name="otherReason"
              />
            </div>
            <div class="col-md-6 col-12 mb-2 "></div>
            <div class="col-12 mb-2 ">
              <label>
                Centre Remark<span class="text-danger">*</span>
              </label>
              <textarea
                class="form-control "
                type="text"
                rows="4"
                name="childCareRemark"
                className={`form-control  ${
                  formik.touched.childCareRemark && formik.errors.childCareRemark
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("childCareRemark")}
              />
              {formik.touched.childCareRemark && formik.errors.childCareRemark && (
                <div className="invalid-feedback">
                  {formik.errors.childCareRemark}
                </div>
              )}
            </div>
            <div class=" col-12 mb-2 ">
              <lable>Parent Remark</lable>
              <textarea
                className="form-control"
                {...formik.getFieldProps("parentRemark")}
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>
        </div>
      </div>
      </form>
      
    </div>
  );
}

export default StudentTransferOut;
