import React from 'react';
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import './App.css';
import HomeComponent from './Components/HomeComponent';
import QuizComponent from './Components/QuizComponent';
import ResultComponent from './Components/ResultComponent';

function App() {

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