import React from "react";
import "./App.css";
import Company from "./component/company/Company";
import Office from "./component/office/Office"
import Modal from './component/Modal/Modal'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  
  
  return (
    <Router>
      <div className="App">
        <Modal />
      

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

export default App;
