import React, { useState } from "react";
import { connect } from "react-redux";
import "./Officebuilder.css";

const Officebuilder = (props) => {
  let today = new Date();

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

      <form onSubmit={handleCreateoffice} action="" method="post">
        <div className="row">
          <label htmlFor="name">Name:</label>
        </div>
        <div className="row">
          <input
            value={officeForm.office.office_name}
            type="text"
            placeholder="name"
            id="name"
            required
            onChange={(e) => handleofficeName(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="">Location:</label>
        </div>
        <div className="row">
          <input
            value={officeForm.office.latitude}
            type="text"
            placeholder="latitude"
            id="latitude"
            onChange={(e) => handleofficeLatitude(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="longitude"
            id="longitude"
            value={officeForm.office.longitude}
            onChange={(e) => handleofficeLongitude(e.target.value)}
            required
          />
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
            required
            onChange={(e) => handleofficeDate(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="phone">Company:</label>
        </div>
        <div className="row">
          <select
            name="code"
            id="code"
            onChange={(e) => handleofficeCompany(e.target.value)}
            required
            value={officeForm.office.office_company}
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
