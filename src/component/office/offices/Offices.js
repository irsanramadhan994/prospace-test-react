import React from "react";
import { connect } from "react-redux";

const Offices = (props) => {

    console.log(props)
    console.log(props.company[0].office.length)

    
  let office = props.company[0] ? (
    <div className="flex-container">
      {props.company[0].office.map((data, i) => {
        return (
          <div className="flex-row" key={data.office_id}>
            <div className="row">
              <div className="header-item">
                <span className="label-header">{data.office_name}</span>
                <span
                  className="icon-header"
                  onClick={() => props.deleteOffice(data.office_id,props.company)}
                >
                  &times;
                </span>
              </div>
            </div>
            <div className="row">
              <div className="row">
                <label>Location:</label>
                <p>{"Lat: " + data.latitude}</p>
                <br />
                <p>{"Lon: " + data.longitude}</p>
              </div>
              <div className="row">
                <label>Office Date:</label>
                <p>{data.office_date}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : null;

  if(props.company[0]){
    return (
        <section className="section-offices">
          <h2>Offices</h2>
          <div>
            {props.company[0].office.length > 0 ? office : "There is no Offices created yet"}
          </div>
        </section>
      );
  }

};

const mapStateToProps = (state) => {
  return {
    company: state.company,
    action: state.action,
  };
};

export default connect(mapStateToProps)(Offices);
