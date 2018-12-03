import React from "react";
import "./Person-Results.css";
import { Link } from "react-router-dom";
import PersonDetail from "./Person-Details";

export default class Home extends React.Component {
  render() {
    return (
      <div className="result">
        <span className="name">{this.props.person.name}</span>
        <button className="SEE-DETAILS Rectangle-21">
          <Link
            className="link"
            key={this.props.person.url.slice(28)}
            to={"Person-Details/" + this.props.person.url.slice(28)}
            component={PersonDetail}
          >
            See Details
          </Link>
        </button>
        <div className="resultsDivider" />
      </div>
    );
  }
}
