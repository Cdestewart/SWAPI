import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Main from "./views/Main";
import PersonDetail from "./views/Person-Details";
import MovieDetails from "./views/Movie-Details";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div id="header">
            <p className="SWStarter">SWStarter</p>
          </div>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/Person-Details/:id/" component={PersonDetail} />
            <Route path="/Movie-Details/:id" component={MovieDetails} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
