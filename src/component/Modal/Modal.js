import React from "react";
import "./Modal.css";
import { connect } from "react-redux";

const Modal = (props) => {

  console.log(props);

  let modalclass = props.modals[0].modals_show
    ? "modal-container"
    : "modal-container hide";

  console.log(modalclass);

  let button = null;

  if (props.modals[0].modals_name == "COMPANY") {
    button = (
      <div>
        <div onClick={() => props.modalCloseState()}>OK</div>
      </div>
    );
  } else if (props.modals[0].modals_name == "OFFICE") {
    button = (
      <div>
        <div onClick={() => props.modalCloseState()}>OK</div>;
      </div>
    );
  } else if (props.modals[0].modals_name == "DELETE COMPANY") {
    button = (
      <div>
        <div onClick={() => props.deleteCompany(props.modals[0].modals_index)}>
          OK
        </div>
        <div onClick={() => props.modalCloseState()}>NO</div>;
      </div>
    );
  }else if (props.modals[0].modals_name == "DELETE OFFICE") {
    button = (
      <div>
        <div onClick={() => props.deleteOffice(props.modals[0].modals_index,props.modals[0].modals_company_name)}>
          OK
        </div>
        <div onClick={() => props.modalCloseState()}>NO</div>
      </div>
    );
  }

  return (
    <div className={modalclass}>
      <div className="row">
        <h2>{props.modals[0].modals_name}</h2>
      </div>

      <div className="row">
        <p>{props.modals[0].modals_message}</p>
      </div>

      <div className="row">{button}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    company: state.company,
    action: state.action,
    modals: state.modals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    modalCloseState: () => dispatch({ type: "MODAL_CLOSE" }),
    deleteCompany: (index) =>
      dispatch({ type: "DELETE_COMPANY", index: index }),
      deleteCompany: (index) =>
      dispatch({ type: "DELETE_COMPANY", index: index }),
      deleteOffice: (index,payload) =>
      dispatch({ type: "DELETE_OFFICE", index: index , payload: payload}),


  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
