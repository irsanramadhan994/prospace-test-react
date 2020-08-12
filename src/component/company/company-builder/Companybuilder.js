import React, { useState, useEffect } from "react";
import "./Companybuilder.css";
import Axios from "axios";
import { useForm } from "react-hook-form";

const Companybuilder = (props) => {
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get("https://restcountries.eu/rest/v2/all");

      setcallingCode(result.data);
    };

    fetchData();
  }, []);

  const [callingCode, setcallingCode] = useState([]);
  const { register, handleSubmit, watch, errors } = useForm({
    criteriaMode: "all",
  });
  const onSubmit = (data) => {

    props.createCompany(companyForm.company);
    setcompanyForm({
      company: {
        company_name: "",
        company_address: "",
        company_revenue: "",
        company_phone: "",
        company_phone_code: "",
        office: [],
      },
    });
  };
  const [companyForm, setcompanyForm] = useState({
    company: {
      company_name: "",
      company_address: "",
      company_revenue: "",
      company_phone: "",
      company_phone_code: "",
      office: [],
    },
  });

  const handleCompanyName = (data) => {
    let compArr = companyForm.company;
    compArr.company_name = data;
    setcompanyForm({ company: compArr });
  };

  const handleCompanyAddress = (data) => {
    let compArr = companyForm.company;
    compArr.company_address = data;
    setcompanyForm({ company: compArr });
  };

  const handleCompanyRevenue = (data) => {
    let compArr = companyForm.company;
    compArr.company_revenue = data;
    setcompanyForm({ company: compArr });
  };
  const handleCompanyPhoneCode = (code) => {
    let compArr = companyForm.company;
    compArr.company_phone_code = code;
    setcompanyForm({ company: compArr });
  };

  const handleCompanyPhone = (phone) => {
    let compArr = companyForm.company;
    compArr.company_phone = phone;
    setcompanyForm({ company: compArr });
  };

  const handleCreateCompany = (e) => {
    e.preventDefault();
    props.createCompany(companyForm.company);
    setcompanyForm({
      company: {
        company_name: "",
        company_address: "",
        company_revenue: "",
        company_phone: "",
        company_phone_code: "",
        office: [],
      },
    });
  };

  return (
    <div className="card">
      <h2>Create Company</h2>
      <form onSubmit={handleSubmit(onSubmit)} action="" method="post">
        <div className="row">
          <label htmlFor="name">Name:</label>
        </div>

        <div className="row">
          <input
            value={companyForm.company.company_name}
            type="text"
            placeholder="name"
            name="name"
            id="name"
            className={errors.name ? "error" : null}
            ref={register({ required: "Please Fill this field" })}
            pattern="[a-zA-Z]+"
            title="This is an error message"
            onChange={(e) => handleCompanyName(e.target.value)}
          />
          {errors.name ? (
            <span className="form-error">{errors.name?.message}</span>
          ) : null}
        </div>
        <div className="row">
          <label htmlFor="address">Address:</label>
        </div>
        <div className="row">
          <input
            value={companyForm.company.company_address}
            name="address"
            type="text"
            placeholder="address"
            className={errors.address ? "error" : null}
            id="address"
            ref={register({ required: "Please Fill this Field" })}
            onChange={(e) => handleCompanyAddress(e.target.value)}
          />
          {errors.address ? (
            <span className="form-error">{errors.address?.message}</span>
          ) : null}
        </div>
        <div className="row">
          <label htmlFor="revenue">Revenue:</label>
        </div>
        <div className="row">
          <input
                      value={companyForm.company.company_revenue}
                      onChange={(e) => handleCompanyRevenue(e.target.value)}

            type="number"
            name="revenue"
            className={errors.revenue ? "error" : null}
            min="0"
            ref={register({
              required: "Please Fill this Field",
              validate: value => value - Math.floor(value) !== 0 ? 'The number must floor number' : undefined
            })}
          />

{errors.revenue ? (
            <span className="form-error">{errors.revenue?.message}</span>
          ) : null}

        </div>
        <div className="row">
          <label htmlFor="phone">Phone no:</label>
        </div>
        <div className="row">
          <select
            name="code"
            id="code"
            onChange={(e) => handleCompanyPhoneCode(e.target.value)}
            className={errors.code ? "error" : null}
            ref={register({ required: "Please Select This Option" })}
            value={companyForm.company.company_phone_code}
          >
            <option value="">  -- </option>
            {callingCode.map((data, i) => {
              return (
                <option value={data.callingCodes} key={i}>
                  {data.callingCodes}
                </option>
              );
            })}
          </select>
          <input
            type="number"
            name='phone'
            placeholder="number"
            className={errors.phone ? "error" : null}
            id="phone"
            ref={register({ required: "Please Fill this Field",
          validate:value=>value !== Infinity && String(value) === value && value>= 0 ? undefined : "Number must positive integer" })}
            onChange={(e) => handleCompanyPhone(e.target.value)}
            value={companyForm.company.company_phone}

            
          />
{errors.code ? (
            <span className="form-error">{errors.code?.message}</span>
          ) : null}

{errors.phone ? (
            <span className="form-error">{errors.phone?.message}</span>
          ) : null}

        </div>
        <input type="submit" value="Create" />

      </form>
    </div>
  );
};

export default Companybuilder;
