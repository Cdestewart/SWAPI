import React, { Component } from "react";
import "./Movie-Details.css";
import { Link } from "react-router-dom";

export default class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      movie: { characters: [] }
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    fetch(`https://swapi.co/api/films/${id}/`)
      .then(data => data.json())
      .then(json => {
        console.log(json);
        this.setState({ movie: json });
        console.log(this.state.movie);
      })
      .then(results => {
        let personId = "";
        console.log("CHARACTER LENGHT", this.state.movie.characters.length);
        for (let i = 0; i < this.state.movie.characters.length; i++) {
          personId = this.state.movie.characters[i].slice(28);

          fetch(`https://swapi.co/api/people/${personId}`)
            .then(data => data.json())
            .then(json => {
              this.state.people[i] = json;
              this.setState({ people: this.state.people });
              console.log(this.state.people);
            });
        }
      })

      .catch(errs => console.log(errs));

    return;
  }
  render() {
    return (
      <div className="DetailsBG">
        <h3 className="title">{this.state.movie.title}</h3>

        <div className="sub">
          <h4>Opening Crawl</h4>
          <div className="divider" />
          <span>{this.state.movie.opening_crawl}</span>
        </div>
        <div className="sub rightSub">
          <h4>Characters </h4>
          <div className="divider" />
          {this.state.people.map(character => (
            <Link
              key={character.url.slice(28)}
              to={"/Person-Details/" + character.url.slice(28)}
              className="characters"
            >
              {character.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
