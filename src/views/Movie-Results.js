import React from "react";
import "./Movie-Results.css";
import { Link } from "react-router-dom";
import MovieDetails from "./Movie-Details";

export default class Home extends React.Component {
  render() {
    return (
      <div className="Result">
        <span className="name">{this.props.movie.title}</span>
        <button className="SEE-DETAILS Rectangle-21">
          <Link
            className="link"
            key={this.props.movie.url.slice(26)}
            to={"Movie-Details" + this.props.movie.url.slice(26)}
            component={MovieDetails}
          >
            See Details
          </Link>
        </button>
        <div className="resultsDivider" />
      </div>
    );
  }
}
