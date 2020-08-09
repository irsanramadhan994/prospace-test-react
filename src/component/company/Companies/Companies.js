import React from "react";
import "./Companies.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Companies = (props) => {
  return (
    <section className="section-companies">
      <h2>Companies</h2>

      <div className="row">
        {props.company.length === 0
          ? "There is no companies created yet"
          : null}

        <div className="flex-container">
          {props.company.map((data, i) => {
            return (
              <div className="flex-row"  key={data.company_id}>
                <div className="row">
                  <div className="header-item">
                    <span className="label-header">{data.company_name}</span>
                    <span
                      className="icon-header"
                      onClick={() => props.deleteCompanyModal(data.company_id)}
                    >
                      &times;
                    </span>
                  </div>
                </div>
                <Link to={"/" + data.company_id}>
                  <div className="row">
                    <div className="row">
                      <label>Address:</label>
                      <p>{data.company_address}</p>
                    </div>
                    <div className="row">
                      <label>Revenue:</label>
                      <p>{data.company_revenue}</p>
                    </div>
                    <div className="row">
                      <label>Phone:</label>
                      <p>{data.company_phone}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    company: state.company,
    action: state.action,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    deleteCompanyModal: (index) =>
    dispatch({ type: "MODAL_DELETE_COMPANY", index: index }),
    deleteCompany: (index) =>
      dispatch({ type: "DELETE_COMPANY", index: index }),      
      
  };
  
};

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
