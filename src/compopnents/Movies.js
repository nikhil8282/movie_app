import React, { Component } from "react";
import axios from "axios";

// import { movies } from './get_movies'

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      parr: [1],
      currp: 1,
      movie: [],
      favourites: [],
    };
  }
  async componentDidMount() {
    let res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currp}`
    );
    let data = res.data;
    this.handlesavefavourites();
    this.setState({
      movie: [...data.results],
    });
  }

  handleChangeMovies = async () => {
    let res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currp}`
    );
    let data = res.data;
    this.setState({
      movie: [...data.results],
    });
  };
  handleRight = () => {
    let carr = [];
    for (let i = 1; i <= this.state.parr.length + 1; i++) {
      carr.push(i);
    }

    this.setState(
      {
        parr: [...carr],
        currp: this.state.currp + 1,
      },
      this.handleChangeMovies
    );
  };

  handleLeft = () => {
    if (this.state.currp !== 1) {
      this.setState(
        {
          currp: this.state.currp - 1,
        },
        this.handleChangeMovies
      );
    }
  };

  pageclick = (page) => {
    if (page !== this.state.currp) {
      this.setState(
        {
          currp: page,
        },
        this.handleChangeMovies
      );
    }
  };
  // add to favourites
  handleFavourites = (m) => {
    let oldData = JSON.parse(localStorage.getItem("Movies") || "[]");
    if (this.state.favourites.includes(m.id)) {
      oldData = oldData.filter((movie) => m.id !== movie.id);
    } else {
      oldData.push(m);
    }
    localStorage.setItem("Movies", JSON.stringify(oldData));
    this.handlesavefavourites();
  };

  // save favourites
  handlesavefavourites = () => {
    let olddata = JSON.parse(localStorage.getItem("Movies") || "[]");
    let temp = olddata.map((movie) => movie.id);
    this.setState({
      favourites: [...temp],
    });

  };

  render() {
    return (
      <>
        <div>
          <h1 className="text-center">
            <strong>Trending</strong>
          </h1>

          <div className="movies_list">
            {this.state.movie.length === 0 ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              this.state.movie.map((movieObj) => (
                <div
                  className="card movies_card"
                  onMouseEnter={() => this.setState({ hover: movieObj.id })}
                  onMouseLeave={() => this.setState({ hover: "" })}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    style={{ height: "100%", width: "100%" }}
                    className="card-img-top movies_card_img"
                    alt="..."
                  />
                  <h5 className="card-title movies_card_title">
                    {movieObj.original_title}
                  </h5>

                  <div
                    className="button-wrapper"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {this.state.hover === movieObj.id && (
                      <a
                        className="btn btn-primary movies_btn"
                        onClick={() => this.handleFavourites(movieObj)}
                      >
                        {this.state.favourites.includes(movieObj.id)
                          ? "Remove from Favourites"
                          : "Add to Favourites"}
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          <nav
            aria-label="Page navigation example"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" onClick={this.handleLeft}>
                  Previous
                </a>
              </li>

              {this.state.parr.map((page) => (
                <li className="page-item">
                  <a className="page-link" onClick={() => this.pageclick(page)}>
                    {page}
                  </a>
                </li>
              ))}

              <li className="page-item">
                <a
                  className="page-link"
                  style={{ inactive: "yellow" }}
                  onClick={this.handleRight}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }
}
