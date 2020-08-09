import React, { useState,useEffect } from "react";
import "./Companybuilder.css";
import Axios from "axios";


const Companybuilder = (props) => {


  
  useEffect(() => {
    
    const fetchData = async () => {
      const result = await Axios.get(
        'https://restcountries.eu/rest/v2/all'
      );
        
      setcallingCode(result.data)
    };
 
    fetchData();
  }, []);

  const [callingCode, setcallingCode] = useState([])

  const [companyForm, setcompanyForm] = useState({
    company: 
      {
        company_name: "",
        company_address: "",
        company_revenue: "",
        company_phone: "",
        company_phone_code:'',
        office:[]
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
    compArr.company_phone_code = code
    setcompanyForm({ company: compArr });
  };

  const handleCompanyPhone = (phone) => {
    let compArr = companyForm.company;
    compArr.company_phone = phone;
    setcompanyForm({ company: compArr });
  };

  const handleCreateCompany =(e)=>{
    e.preventDefault()
     props.createCompany(companyForm.company)
     setcompanyForm({company: 
      {
        company_name: "",
        company_address: "",
        company_revenue: "",
        company_phone: "",
        company_phone_code:'',
        office:[]
      },
    })
  }

  return (
    <div className="card">
      <h2>Create Company</h2>
      <form onSubmit={handleCreateCompany} action="" method="post">
        <div className="row">
          <label htmlFor="name">Name:</label>
        </div>
        <div className="row">
          <input
          value={companyForm.company.company_name}
            type="text"
            placeholder="name"
            id="name"
            required
            onChange={(e) => handleCompanyName(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="address">Address:</label>
        </div>
        <div className="row">
          <input
          value={companyForm.company.company_address}
            type="text"
            placeholder="address"
            id="address"
            required
            onChange={(e) => handleCompanyAddress(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="revenue">Revenue:</label>
        </div>
        <div className="row">
          <input
            type="text"
            value={companyForm.company.company_revenue}
            placeholder="revenue"
            id="revenue"
            required
            onChange={(e) => handleCompanyRevenue(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="phone">Phone no:</label>
        </div>
        <div className="row">
          <select name="code" id="code" onChange={(e)=>handleCompanyPhoneCode(e.target.value)}  required  value={companyForm.company.company_phone_code}>
          <option  value=""> -- select an Phone Code -- </option>
              {callingCode.map((data,i)=>{
                return <option value={data.callingCodes} key={i}>{"+"+data.callingCodes}</option>
              })}

          </select>
          <input type="" placeholder="number" id="phone" required  onChange={(e)=>handleCompanyPhone(e.target.value)} value={companyForm.company.company_phone}/>
        </div>
        <input type="submit" value="Create"/>
      </form>
    </div>
  );
};

export default Companybuilder;
