import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import toast from "react-hot-toast";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllCoursesWithIds from "../List/CourseList";

function ClassEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
const [loadIndicator, setLoadIndicator] = useState(false);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const courseData = await fetchAllCoursesWithIds();
      setCenterData(centerData);
      setCourseData(courseData);
    } catch (error) {
      toast.error(error);
    }
  };

  const validationSchema = Yup.object({
    childCareId: Yup.string().required("*Centre Name is required"),
    courseId: Yup.string().required("*Course Name is required"),
    className: Yup.string().required("*Class Name is required"),
    classType: Yup.string().required("*Class Type is required"),
    durationInHrs: Yup.number().required("*Duration is required"),
  });

  const formik = useFormik({
    initialValues: {
      childCareId: "",
      courseId: "",
      className: "",
      classType: "",
      durationInHrs: "",
      remark: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      setLoadIndicator(true);
      try {
        const response = await api.put(
          `/updateCourseClassListing/${id}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/class");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }finally {
        setLoadIndicator(false);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllCourseClassListingsById/${id}`);
        formik.setValues(response.data);
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }
    };

    getData();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid my-4 center">
      <form onSubmit={formik.handleSubmit}>
      <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h2 className="h2 ls-tight headingColor">
                    Edit
                  </h2>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/center">
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
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card shadow border-0 mb-2 top-header">
         <div className="container">
          <div className="row py-4">
            <div class="col-md-6 col-12 mb-4">
              <lable class="">
                Centre<span class="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("childCareId")}
                name="childCareId"
                className={`form-select   ${formik.touched.childCareId && formik.errors.childCareId
                    ? "is-invalid"
                    : ""
                  }`}
                aria-label="Default select example"
                class="form-select "
              >
                <option selected></option>
                {centerData &&
                  centerData.map((centerId) => (
                    <option key={centerId.id} value={centerId.id}>
                      {centerId.childCareNames}
                    </option>
                  ))}
              </select>
              {formik.touched.childCareId && formik.errors.childCareId && (
                <div className="invalid-feedback">{formik.errors.childCareId}</div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-4">
              <label>
                Course<span class="text-danger">*</span>
              </label>
              <select
                {...formik.getFieldProps("courseId")}
                name="courseId"
                className={`form-select   ${formik.touched.courseId && formik.errors.courseId
                    ? "is-invalid"
                    : ""
                  }`}
                aria-label="Default select example"
                class="form-select "
              >
                <option selected></option>
                {courseData &&
                  courseData.map((courseId) => (
                    <option key={courseId.id} value={courseId.id}>
                      {courseId.courseNames}
                    </option>
                  ))}
              </select>
              {formik.touched.courseId && formik.errors.courseId && (
                <div className="invalid-feedback">{formik.errors.courseId}</div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-4">
              <label>
                Class Name<span class="text-danger">*</span>
              </label>
              <input
                name="className"
                class="form-control "
                type="text"
                className={`form-control  ${formik.touched.className && formik.errors.className
                    ? "is-invalid"
                    : ""
                  }`}
                {...formik.getFieldProps("className")}
              />
              {formik.touched.className && formik.errors.className && (
                <div className="invalid-feedback">
                  {formik.errors.className}
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-4">
              <label>
                Class Type<span class="text-danger">*</span>
              </label>{" "}
              <br />
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="classType"
                  id="inlineRadio1"
                  value="Group"
                  onChange={formik.handleChange}
                  checked={formik.values.classType === "Group"}
                />
                <label class="form-check-label" for="inlineRadio1">
                  Group
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="classType"
                  id="inlineRadio2"
                  value="Individual"
                  onChange={formik.handleChange}
                  checked={formik.values.classType === "Individual"}
                />
                <label class="form-check-label" for="inlineRadio2">
                  Individual
                </label>
              </div>
              {formik.errors.classType && formik.touched.classType && (
                <div className="text-danger  " style={{ fontSize: ".875em" }}>
                  {formik.errors.classType}
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-4">
              <label>
                Duration<span class="text-danger">*</span>
              </label>
              <select
               {...formik.getFieldProps("durationInHrs")}
                className={`form-select  ${formik.touched.durationInHrs && formik.errors.durationInHrs
                    ? "is-invalid"
                    : ""
                  }`}
                name="durationInHrs"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.durationInHrs}
              >
                <option selected></option>
                <option value="1.00">1.00 hr</option>
                <option value="1.30">1.30 hr</option>
              </select>
              {formik.touched.durationInHrs && formik.errors.durationInHrs && (
                <div className="invalid-feedback">
                  {formik.errors.durationInHrs}
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-4">
              <label>Remark</label>
              <textarea
                name="remark"
                class="form-control "
                type="text"
                className={`form-control  ${formik.touched.remark && formik.errors.remark
                    ? "is-invalid"
                    : ""
                  }`}
                {...formik.getFieldProps("remark")}
              />
              {formik.touched.remark && formik.errors.remark && (
                <div className="invalid-feedback">{formik.errors.remark}</div>
              )}
            </div>
          </div>
        </div>
        </div>
   
      </form>
    
    </div>
  );
}

export default ClassEdit;
