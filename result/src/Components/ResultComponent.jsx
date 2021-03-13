import service from "./service.js";
import React from "react";
import { Link, Redirect } from "react-router-dom";
class ResultComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      correctQuestionsCount: 0,
      wrongQuestionsCount: 0,
      homebutton: false,
      againbutton: false,
    };
  }
  componentDidMount() {
    this.setState({
      correctQuestionsCount: service.questionCount,
      wrongQuestionsCount: 11 - service.questionCount,
      score: service.sharedData,
    });
  }
  render() {
    return (
      <div>
        <h1 id="green">Result</h1>
        <div className="White-Container1">
          <h2 align="center">You need more practice!</h2>
          <h1 id="score" align="center">
            Your Score:{this.state.score}%
          </h1>
          <div className="alignelements">
            <text>Total Number of questions:</text>
            <text>11</text>
          </div>
          <div className="alignelements">
            <text>Number of attempted questions:</text>
            <text>11</text>
          </div>
          <div className="alignelements">
            <text>Number of Correct Answers:</text>
            <text>{this.state.correctQuestionsCount}</text>
          </div>
          <div className="alignelements">
            <text>Number of Wrong Answers:</text>
            <text>{this.state.wrongQuestionsCount}</text>
          </div>
        </div>
        <div className="Footer-Container">
          <button className="darkbluebackground-button" id="again">
            <Link to="/QuizComponent">Play Again</Link>
          </button>
          <button className="darkbluebackgroundgreen-button" id="home">
            <Link to="/">Back to Home</Link>
          </button>
        </div>
      </div>
    );
  }
}
export default ResultComponent;
