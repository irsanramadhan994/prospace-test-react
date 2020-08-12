import React from "react";
import "./App.css";
import Company from "./component/company/Company";
import Office from "./component/office/Office"
import Modal from './component/Modal/Modal'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

const App = (props) => {
  
  
  return (
    <Router>
      <div className="App">
        <Modal />
        <div id="overlay" className={props.modals[0].modals_show ? 'show': null}/>
      

        <Switch>
          <Route exact path="/">
            <Company />
          </Route>
          <Route exact path="/:id">
            <Office />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    company: state.company,
    action: state.action,
    modals:state.modals
  };
};


export default connect(mapStateToProps)(App);
