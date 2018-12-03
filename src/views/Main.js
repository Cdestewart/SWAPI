import React, { Component } from "react";
import "./Main.css";
import PersonResults from "./Person-Results";
import MovieResults from "./Movie-Results.js";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", people: [], movie: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchResultsText = (
      <p className="searchResultsText">
        There are zero matches.Use this form to search for People or Movies
      </p>
    );
  }

  render() {
    return (
      <div>
        <div className="SearchContainer">
          <p className="What-are-you-searching-for">
            What are you searching for?
          </p>
          <form onSubmit={this.handleSubmit}>
            <label className="People">
              <input
                className="Ellipse"
                type="radio"
                value="People"
                name="peopleormovie"
                defaultChecked
              />
              People
            </label>
            <label className="Movies">
              <input
                className="Ellipse"
                type="radio"
                value="Movies"
                name="peopleormovie"
              />
              Movies
            </label>
            <input
              type="text"
              className="Rectangle"
              onChange={this.handleChange}
              placeholder="eg-Chewbacca-Yoda-Boba-Fett"
            />

            <button
              disabled={this.disableButtonfunction()}
              className={this.getButtonClass()}
            >
              SEARCH
            </button>
          </form>
        </div>
        <div className="MatchesBG">
          <span className="Results">Results</span>
          <div className="resultsDivider" />
          {this.searchResultsText}
          {this.state.people.map((people, index) => (
            <PersonResults key={index} person={people} />
          ))}
          {this.state.movie.map((movie, index) => (
            <MovieResults key={index} movie={movie} />
          ))}
        </div>
      </div>
    );
  }
  handleChange(e) {
    this.setState({ text: e.target.value });
    this.disableButtonfunction();
    this.getButtonClass();

    return;
  }

  handleSubmit(e) {
    e.preventDefault();
    //resets movie and people results when a user submits a new search
    this.state.people = [];
    this.state.movie = [];
    this.searchResultsText = "";
    //radio button input results
    const radioButtonInput = e.target.peopleormovie.value;
    this.setState();
    //directs the search function based on the user's radio button input
    if (radioButtonInput === "People") {
      this.getPeople(this.state.text);
    } else if (radioButtonInput === "Movies") {
      this.getMovies(this.state.text);
    }
  }

  getButtonClass() {
    //This function changes the styling on the search button when a user inputs text
    let classes = "SEARCH SearchButton-";
    if (this.state.text.length === 0) {
      classes += "Disabled";
    } else {
      classes += "Enabled";
    }
    return classes;
  }
  disableButtonfunction() {
    //enables the search button if there is text in the search box
    if (this.state.text.length === 0) {
      return true;
    } else if (this.state.text.length != 0) {
      return false;
    }
    return true;
  }
  getMovies(searchInput) {
    fetch(
      `https://swapi.co/api/films/?search=${encodeURIComponent(searchInput)}`
    )
      .then(data => data.json())
      .then(json => {
        this.setState({ movie: json.results });
        this.props.movie = json.results;
      })
      .catch(errs => console.log(errs));
    return;
  }
  getPeople(searchInput) {
    fetch(
      `https://swapi.co/api/people/?search=${encodeURIComponent(searchInput)}`
    )
      .then(data => data.json())
      .then(json => {
        this.setState({ people: json.results });
      })
      .catch(errs => console.log(errs));
    return;
  }
}
