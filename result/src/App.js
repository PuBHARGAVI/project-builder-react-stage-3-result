import React from 'react';
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import './App.css';
import HomeComponent from './Components/HomeComponent';
import QuizComponent from './Components/QuizComponent';
import ResultComponent from './Components/ResultComponent';
import axios from 'axios';
import service from "./Components/service.js";
function App() {
  axios
  .get(
    "https://my-json-server.typicode.com/Naveen132895/quiz-api/questions"
  )
  .then((response) => {
    var urldata = [];
    for (var i = 0; i < response.data.length; i++) {
      urldata.push(response.data[i]);
    }
    service.apidata=urldata;
  });
  return (
    <div className="App">
     <Router>
       <Switch>
      <Route exact path="/">
        <HomeComponent></HomeComponent>
      </Route>
      <Route  path="/QuizComponent">
        <QuizComponent></QuizComponent>
      </Route>
      <Route  path="/ResultComponent">
        <ResultComponent></ResultComponent>
      </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;