import React, { useState } from "react";
import { connect } from "react-redux";
import "./Officebuilder.css";
import { useForm } from "react-hook-form";

const Officebuilder = (props) => {
  let today = new Date();
  const { register, handleSubmit, watch, errors } = useForm({
    criteriaMode: "all",
  });
  const onSubmit = (data) => {
    props.createOffice(officeForm.office);
    setofficeForm({
      office: {
        office_name: "",
        latitude: "",
        longitude: "",
        office_date: today.toLocaleDateString("en-CA"),
        office_company: "",
      },
    });

  };

  const [officeForm, setofficeForm] = useState({
    office: {
      office_name: "",
      latitude: "",
      longitude: "",
      office_date: today.toLocaleDateString("en-CA"),
      office_company: "",
    },
  });

  const handleofficeName = (data) => {
    let compArr = officeForm.office;
    compArr.office_name = data;
    setofficeForm({ office: compArr });
  };

  const handleofficeLatitude = (data) => {
    let compArr = officeForm.office;
    compArr.latitude = data;
    setofficeForm({ office: compArr });
  };
  const handleofficeLongitude = (data) => {
    let compArr = officeForm.office;
    compArr.longitude = data;
    setofficeForm({ office: compArr });
  };

  const handleofficeDate = (data) => {
    let compArr = officeForm.office;
    compArr.office_date = data;
    setofficeForm({ office: compArr });
  };

  const handleofficeCompany = (company) => {
    let compArr = officeForm.office;
    compArr.office_company = company;
    setofficeForm({ office: compArr });
  };

  const handleCreateoffice = (e) => {
    e.preventDefault();
    props.createOffice(officeForm.office);
    setofficeForm({
      office: {
        office_name: "",
        latitude: "",
        longitude: "",
        office_date: today.toLocaleDateString("en-CA"),
        office_company: "",
      },
    });
  };

  return (
    <div className="card">
      <h2>Create Office</h2>

      <form onSubmit={handleSubmit(onSubmit)} action="" method="post">
        <div className="row">
          <label htmlFor="name">Name:</label>
        </div>
        <div className="row">
          <input
            value={officeForm.office.office_name}
            type="text"
            name="name"
            placeholder="name"
            id="name"
            className={errors.name ? "error" : null}
            ref={register({ required: "Please Fill this field" })}
            onChange={(e) => handleofficeName(e.target.value)}
          />

          {errors.name ? (
            <span className="form-error">{errors.name?.message}</span>
          ) : null}
        </div>
        <div className="row">
          <label htmlFor="">Location:</label>
        </div>
        <div className="row">
          <input
            value={officeForm.office.latitude}
            className={errors.latitude ? "error" : null}
            name="latitude"
            type="number"
            step="0.1"
            placeholder="latitude"
            id="latitude"
            ref={register({
              required: "Please Fill this field",
              pattern: {
                value: /^(?:[1-9]\d*|0)?(?:\.\d+)?$/gm,
                message: "Number must positive float number",
              },
            })}
            onChange={(e) => handleofficeLatitude(e.target.value)}
          />

          <input
            type="number"
            placeholder="longitude"
            id="longitude"
            name="longitude"
            className={errors.longitude ? "error" : null}
            value={officeForm.office.longitude}
            onChange={(e) => handleofficeLongitude(e.target.value)}
            ref={register({
              required: "Please Fill this field",
              pattern: {
                value: /^(?:[1-9]\d*|0)?(?:\.\d+)?$/gm,
                message: "Number must positive float number",
              },
            })}
          />

          {errors.latitude ? (
            <span className="form-error">{errors.latitude?.message}</span>
          ) : null}
          {errors.longitude ? (
            <span className="form-error">{errors.longitude?.message}</span>
          ) : null}
        </div>
        <div className="row">
          <label htmlFor="office_date">Office Start Date:</label>
        </div>
        <div className="row">
          <input
            type="date"
            value={officeForm.office.office_date}
            placeholder="date"
            id="office_date"
            onChange={(e) => handleofficeDate(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="phone">Company:</label>
        </div>
        <div className="row">
          <select
            name="company"
            id="company"
            onChange={(e) => handleofficeCompany(e.target.value)}
            value={officeForm.office.office_company}
            className={errors.company ? "error" : null}
            ref={register({ required: "Please select the company" })}
          >
            <option value=""> -- Select Company -- </option>
            {props.company.map((data, i) => {
              return (
                <option key={data.company_id} value={data.company_name}>
                  {data.company_name}
                </option>
              );
            })}
          </select>

          {errors.company ? (
            <span className="form-error">{errors.company?.message}</span>
          ) : null}
        </div>
        <input type="submit" value="Create" className="submit-office" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    company: state.company,
    action: state.action,
  };
};

export default connect(mapStateToProps)(Officebuilder);
