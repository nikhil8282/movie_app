import React, { Component } from 'react'
import { movies } from './get_movies'

export default class Banner extends Component {
  render() {
    let movie= movies.results[0];
    return (
        <div className="card banner_card" >
        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}  className="card-img-top banner_card_img" alt="..."/>
        {/* <div className="card-body"> */}
          <h5 className="card-title banner_card_title">{movie.original_title}</h5>
          <p className="card-text banner_card_text">{movie.overview}</p>
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        {/* </div> */}
  
      </div>

    )
  }
}
