import React, { Component } from 'react'
// import {movies} from "./get_movies"
export default class Favourite extends Component {
  constructor() {
    super();
    this.state = {
      currGenre: 'All Genre',
      Genre: [],
      movies: [],
      currsearch: ""
    }
  }
  componentDidMount() {
    let genreids = {
      28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
      27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
    };
    let oldData = JSON.parse(localStorage.getItem("Movies") || "[]");

    let temp = [];
    oldData.forEach((m) => {
      if (!temp.includes(genreids[m.genre_ids[0]])) {
        temp.push(genreids[m.genre_ids[0]])
      }
    })
    temp.unshift('All Genre');
    this.setState({
      Genre: [...temp],
      movies: [...oldData]
    })

  }
  // sort popularity in ascending order
  sortPop = () => {
    let temp = this.state.movies;

    temp.sort(function (a, b) { return b.popularity - a.popularity })
    this.setState({

      movies: [...temp]
    })
  }
  // sort popolarity in descinding order
  sortPopRev = () => {
    let temp = this.state.movies;

    temp.sort(function (a, b) { return a.popularity - b.popularity })
    this.setState({

      movies: [...temp]
    })
  }

  // sort rating in ascending order
  sortRate = () => {
    let temp = this.state.movies;

    temp.sort(function (a, b) { return b.vote_average - a.vote_average })
    this.setState({

      movies: [...temp]
    })
  }
  // sort rating in descinding order
  sortRateRev = () => {

    let temp = this.state.movies;

    temp.sort(function (a, b) { return a.vote_average - b.vote_average })
    this.setState({

      movies: [...temp]
    })
  }

  // Delete movie 
  deleteMovie = (movieObj) => {

    let temp = this.state.movies;
    temp = temp.filter((m) => m.id !== movieObj.id);

    localStorage.setItem("Movies", JSON.stringify(temp));

    this.setState({
      movies: [...temp]
    })
  }
  render() {

    let genreids = {
      28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
      27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
    };
    let filterarr = [];
    if (this.state.currsearch === '') {

      filterarr = this.state.movies

    }
    else {
      filterarr = this.state.movies.filter((m) => {
        let title = m.original_title.toLowerCase();
        return title.includes(this.state.currsearch.toLowerCase())
      })
    }
    if (this.state.currGenre !== 'All Genre') {

      filterarr = this.state.movies.filter((m) => genreids[m.genre_ids[0]] === this.state.currGenre)

    }

    return (
      <div className='main '>
        <div className='row'>
          <div className='col-3'>
            <ul class="list-group favourite_gen">
              {
                this.state.Genre.map((g) => (

                  <li class="list-group-item"
                    onClick={() => this.setState({ currGenre: g })}
                    style={
                      this.state.currGenre === g ? { backgroundColor: "#0d6efd", fontWeight: "bold", color: "white", borderColor: "#0d6efd", borderRadius: "3px",
                    cursor:"pointer" } : { borderRadius: "3px", fontWeight: "bold", borderColor: "#0d6efd",
                    cursor:"pointer" }}>{g}</li>

                ))
              }


            </ul>
          </div>
          <div className='col-9 fovourite_input' >
            <div className='row '>

              <input type={"text"} placeholder={"Search fovourite movie"} className='input-group-text col border border-dark me-1' value={this.state.currsearch}
                onChange={(e) => this.setState({ currsearch: e.target.value })}
              />
             
            </div>


            <table class="table">
              <thead>
                <tr>

                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col"><i class="fa-solid fa-caret-up" onClick={this.sortPop}></i>Popularity<i class="fa-solid fa-caret-down" onClick={this.sortPopRev}></i></th>
                  <th scope="col"><i class="fa-solid fa-caret-up" onClick={this.sortRate}></i>Rating<i class="fa-solid fa-caret-down" onClick={this.sortRateRev}></i></th>

                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>

                {
                  filterarr.map((movieObj) => (
                    <tr>
                      <th scope="row"><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{ width: "5rem", borderRadius: "2px" }} className="me-3" />{movieObj.original_title}</th>
                      <td>{genreids[movieObj.genre_ids[0]]}</td>
                      <td>{movieObj.popularity}</td>
                      <td>{movieObj.vote_average}</td>
                      <td><button type="button" class="btn btn-primary" onClick={() => this.deleteMovie(movieObj)}>Delete</button></td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
            <nav aria-label="Page navigation example" style={{ display: "flex", justifyContent: "center" }}>
              <ul class="pagination">

                <li class="page-item"><a class="page-link" href="#">1</a></li>

              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}
