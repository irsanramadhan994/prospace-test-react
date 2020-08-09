import React, {  useEffect } from "react";
import { connect } from "react-redux";
import "./Company.css";
import Companybuilder from "./company-builder/Companybuilder";
import Officebuilder from "../company/Officebuilder/Officebuilder";
import Companies from "../company/Companies/Companies"
import Axios from "axios";

const Company = (props) => {


  useEffect(() => {

    const fetchData = async () => {
      const result = await Axios.get("http://localhost:3200/api/user/");

      props.storeCompany(result.data);
    };

    fetchData();
  }, [props.action]);




  return (
    <section className="section-company">
      <div className="container">
        <Companybuilder createCompany={(e) => props.createCompany(e)} />
        <Officebuilder createOffice={(e)=>props.createOffice(e)} />
      </div>
      <div className="container">
        <Companies  />
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {

  return {
    company: state.company,
    action:state.action,
    modals:state.modals
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeCompany: (data) => dispatch({ type: "STORE_COMPANY", payload: data }),
    createCompany: (e, i) =>
      dispatch({ type: "CREATE_COMPANY", payload: e, index: i }),
      createOffice: (e, i) =>
      dispatch({ type: "CREATE_OFFICE", payload: e, index: i })
      
  };
  
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
