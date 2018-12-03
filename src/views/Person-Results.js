import React, { Component } from "react";
import "./Person-Results.css";
import { Switch, Link, Route, BrowserRouter as Router } from "react-router-dom";
import PersonDetail from "./Person-Details";

export default class Home extends React.Component {
  render() {
    return (
      <div className="Result">
        <span className="name">{this.props.person.name}</span>
        <button className="SEE-DETAILS Rectangle-21">
          <Link
            key={this.props.person.url.slice(28)}
            to={"Person-Details/" + this.props.person.url.slice(28)}
            component={PersonDetail}
          >
            See Details
          </Link>
        </button>
        <div className="divider" />
      </div>
    );
  }
}
