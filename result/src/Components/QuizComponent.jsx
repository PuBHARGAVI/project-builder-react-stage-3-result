import React from "react";
import question from "./questions.json";
import service from "./service.js";
import { Redirect } from "react-router-dom";
class QuizComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      questionno: 0,
      questions: [...question],
      show: true,
      answerStatus: false,
      answerAnimation: "",
      attemptedquestionscount: 0,
      questionsStatus: [],
      score: 0,
      minutesLeft: 2,
      secondsLeft: 59,
    };
  }
  timer() {
    if (this.state.secondsLeft <= 0) {
      if (this.state.minutesLeft === 0) {
        clearInterval(this.intervalId);
      } else {
        this.setState({
          secondsLeft: 59,
          minutesLeft: this.state.minutesLeft - 1,
        });
      }
    }
    this.setState({
      secondsLeft: this.state.secondsLeft - 1,
    });
  }
  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  previousHandler() {
    var index = this.state.questionno;
    if (index >= 1) {
      if (this.state.questionsStatus.pop()) {
        this.setState({ score: this.state.score - 1 });
      }
      this.setState({
        questionno: index - 1,
        attemptedquestionscount: this.state.attemptedquestionscount - 1,
      });
      console.log(this.state.questions);
    }
  }
  nextHandler(e) {
    console.log(this.state.questionno);
    var statusArray = this.state.questionsStatus;
    if (e.target.value === this.state.questions[this.state.questionno].answer) {
      console.log(
        e.target.value +
          " " +
          this.state.questions[this.state.questionno].answer +
          "Score" +
          this.state.score
      );
      statusArray.push(true);
      this.setState({
        answerStatus: true,
        answerAnimation: <div id="positive-animation">Correct Answer</div>,
        score: this.state.score + 1,
        questionsStatus: statusArray,
      });
    } else {
      statusArray.push(false);
      this.setState({
        answerStatus: false,
        answerAnimation: <div id="negative-animation">Wrong Answer</div>,
        questionsStatus: statusArray,
      });
    }

    var index = this.state.questionno;
    this.setState({ questionno: index + 1 });
  }
  quitHandler() {
    this.setState({ show: false });
  }
  render() {
    console.log(this.state.questionno + " " + this.state.questions.length);
    if (this.state.minutesLeft === 0 && this.state.secondsLeft === 0) {
      return <Redirect to="/ResultComponent" />;
    }
    if (this.state.questionno === this.state.questions.length) {
      var score = this.state.score;
      service.questionCount = this.state.score;
      var newscore = score * 100;
      console.log("newscore:" + newscore);
      service.sharedData = newscore / 15;
      return <Redirect to="/ResultComponent" />;
    }
    if (!this.state.show) {
      return <Redirect to="/ResultComponent" />;
    }
    console.log("ki");
    return (
      <div className="White-Container">
        <p id="questionStyle">Question</p>
        <div className="flex-container">
          <div id="questionno">{this.state.questionno + 1} of 15</div>
          <div id="questionname">
            {this.state.questions[this.state.questionno].question}
          </div>
          <div>
            {this.state.minutesLeft}:{this.state.secondsLeft}
          </div>
        </div>
        <div className="Option-Container">
          <div className="options">
            <button
              className="blue-button button-radius"
              value={this.state.questions[this.state.questionno].optionA}
              onClick={this.nextHandler.bind(this)}
            >
              {this.state.questions[this.state.questionno].optionA}
            </button>
            <button
              className="blue-button button-radius"
              value={this.state.questions[this.state.questionno].optionC}
              onClick={this.nextHandler.bind(this)}
            >
              {this.state.questions[this.state.questionno].optionC}
            </button>
          </div>
          <div className="options">
            <button
              className="blue-button button-radius"
              value={this.state.questions[this.state.questionno].optionB}
              onClick={this.nextHandler.bind(this)}
            >
              {this.state.questions[this.state.questionno].optionB}
            </button>
            <button
              className="blue-button button-radius"
              value={this.state.questions[this.state.questionno].optionD}
              onClick={this.nextHandler.bind(this)}
            >
              {this.state.questions[this.state.questionno].optionD}
            </button>
          </div>
        </div>
        <div className="Button-Container">
          <button
            className="bluebackground-button"
            onClick={this.previousHandler.bind(this)}
          >
            Previous
          </button>
          <button
            className="greenbackground-button"
            onClick={this.nextHandler.bind(this)}
          >
            Next
          </button>
          <button
            className="palevioletred-button"
            onClick={this.quitHandler.bind(this)}
          >
            Quit
          </button>
        </div>
      </div>
    ); //&&this.state.answerAnimation
  }
}
export default QuizComponent;
