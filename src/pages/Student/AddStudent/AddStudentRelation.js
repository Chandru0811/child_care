import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import fetchAllCentersWithIds from "../../List/CenterList";

const validationSchema = Yup.object().shape({
  childRelationChildName: Yup.string().required("*Student Name is required!"),
});

const Addrelation = forwardRef(({ formData,setLoadIndicators, setFormData, handleNext }, ref) => {

  const [centerData, setCenterData] = useState(null);
  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      childRelationChildCare: formData.childRelationChildCare || "",
      childRelation: formData.childRelation || "",
      childRelationChildName: formData.childRelationChildName || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      setLoadIndicators(true);
      try {
        const requestData = { ...data, childId: formData.student_id };
        const response = await api.post(
          `/createChildRelation`,
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          setFormData((prv) => ({ ...prv, ...data }));
          // console.log("Form data is ",formData)
          handleNext();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }finally {
        setLoadIndicators(false);
      }
    },
  });

  useImperativeHandle(ref, () => ({
    StudentRelation: formik.handleSubmit,
  }));
  return (
    <div className="container-fluid">
      <form onSubmit={formik.handleSubmit}>
        <div className="border-0 mb-5">
          <div className="mb-5">
            <div className="border-0 my-2 px-2">
              <p class="headColor">Student Relation</p>
              <div className="container py-3">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="text-start">
                      <label htmlFor="" className="mb-1 fw-medium">
                        <small>Centre</small>
                      </label>
                      <br />
                      <select
                        name="childRelationChildCare"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.childRelationChildCare}
                        className="form-select "
                      >
                        <option selected></option>
                         {centerData &&
                          centerData.map((studentRelationCenter) => (
                        <option key={studentRelationCenter.id} value={studentRelationCenter.id}>{studentRelationCenter.childCareNames}</option>
                      ))}
                      </select>
                    </div>
                    <div className="text-start mt-2">
                      <label htmlFor="" className="mb-1 fw-medium">
                        <small>Relation</small>
                      </label>
                      <br />
                      <select
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.childRelation}
                        className="form-select "
                        name="childRelation"
                      >
                        <option value=""></option>
                        <option value="Mother">Mother</option>
                        <option value="Father">Father</option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="text-start">
                      <label htmlFor="" className="mb-1 fw-medium">
                        <small>Student Name</small>
                        <span className="text-danger">*</span>
                      </label>
                      <br />
                      <input
                        name="childRelationChildName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.childRelationChildName}
                        className="form-control "
                      />
                      {formik.touched.childRelationChildName &&
                        formik.errors.childRelationChildName && (
                          <div className="text-danger">
                            <small>{formik.errors.childRelationChildName}</small>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
});
export default Addrelation;
