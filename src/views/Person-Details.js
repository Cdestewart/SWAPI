import React, { Component } from "react";
import "./Person-Details.css";
import MovieDetails from "./Movie-Details";
import { Link } from "react-router-dom";

export default class PersonDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: { films: [] },
      movieData: []
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    fetch(`https://swapi.co/api/people/${id}/`)
      .then(data => data.json())
      .then(json => {
        console.log(json);
        this.setState({ people: json });
        console.log(this.state.people.name);
      })
      .then(results => {
        let filmId = "";
        console.log("film number", this.state.people.films.length);
        for (let i = 0; i < this.state.people.films.length; i++) {
          filmId = this.state.people.films[i].slice(27);
          fetch(`https://swapi.co/api/films/${filmId}`)
            .then(data => data.json())
            .then(json => {
              this.state.movieData[i] = json;
              this.setState({ movieData: this.state.movieData });
              console.log(this.state.movieData);
            })
            .catch(errs => console.log(errs));
          console.log("FILMS", filmId);
        }
      })
      .catch(errs => console.log(errs));

    return;
  }
  render() {
    return (
      <div className="DetailsBG">
        <h3 className="title">{this.state.people.name}</h3>
        <div className="sub">
          <h4>Details</h4>
          <div className="divider" />
          <h5>Birth Year: {this.state.people.birth_year}</h5>
          <h5>Gender: {this.state.people.gender}</h5>
          <h5>Eye Color: {this.state.people.eye_color}</h5>
          <h5>Hair Color: {this.state.people.hair_color}</h5>
          <h5>Height: {this.state.people.height}</h5>
          <h5>Mass: {this.state.people.mass}</h5>
        </div>
        <div className="sub rightSub">
          <h4>Movies </h4>
          <div className="divider" />

          {this.state.movieData.map(Movie => (
            <ul>
              <Link
                className="movieName"
                key={Movie.url.slice(26)}
                to={"/Movie-Details" + Movie.url.slice(26)}
                component={MovieDetails}
              >
                {Movie.title}
              </Link>
            </ul>
          ))}
        </div>
        <button className="backToSearch">
          <a href="/">BACK TO SEARCH</a>
        </button>
      </div>
    );
  }
}
