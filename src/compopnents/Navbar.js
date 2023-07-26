import React, { Component } from "react";
import {Link} from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <>
        <div style={{
            display: "flex",
            backgroundColor:"khaki",
             margin:"0px"
           
        }}>
         <Link to="/" style={{textDecoration:"none", color:"black"}}> <h6 className="navbtn"><strong>Home</strong></h6></Link>
         <Link to="/Favourites" style={{textDecoration:"none", color:"black"}}> 
         <h6 className="navbtn"><strong>Favourite</strong></h6>
         </Link>
         
        </div>
      </>
    );
  }
}
 