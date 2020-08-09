import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Office.css";
import Offices from "./offices/Offices";
import Axios from "axios";

const Office = (props) => {
  let { id } = useParams();

  let dependency = null

  if(props.company){
     dependency = props.company.length > 0?  props.company[0].office.length  :  props.company

  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get("http://localhost:3200/api/user/" + id);

      props.storeCompany(result.data);
    };

    fetchData();
  }, [dependency]);

  if (props.company.length == 1) {
    return (
      <section className="section-office">
        <div className="container">
          <div className="header-company">
            <h2>{props.company[0].company_name}</h2>
          </div>
          <div className="row">
            <div className="row">
              <label>Address:</label>
              <p>{props.company[0].company_address}</p>
            </div>
            <div className="row">
              <label>Revenue:</label>
              <p>{props.company[0].company_revenue}</p>
            </div>
            <div className="row">
              <label>Phone:</label>
              <br />
              <p id="phone">{props.company[0].company_phone}</p>
              <Link to="/">Back to Overview</Link>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <Offices
              deleteOffice={(id) => {
                props.deleteOffice(id, props.company[0].company_name);
              }}
            />
          </div>
        </div>
      </section>
    );
  } else {
    return <div></div>;
  }
};

const mapStateToProps = (state) => {
  return {
    company: state.company,
    action: state.action,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeCompany: (data) => dispatch({ type: "STORE_COMPANY", payload: data }),
      deleteOffice: (index, company) =>
      dispatch({ type: "MODAL_DELETE_OFFICE", index: index, payload: { company } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Office);
