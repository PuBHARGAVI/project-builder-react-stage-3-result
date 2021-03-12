import React, { Component } from "react";
import { Link } from "react-router-dom";
class HomeComponent extends Component {
  render() {
    return (
      <div className="Home-Container">
        <h1 className="white-text">Quiz App</h1>
        <button type="button" className="green-button button-radius">
          <Link to={"/QuizComponent"}>Play</Link>
        </button>
      </div>
    );
  }
}
export default HomeComponent;
