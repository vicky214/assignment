import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './App.css';
import ReactNotification from 'react-notifications-component'
import Header from './components/Header/Header';
import ShowData from './components/ShowData/ShowData';
import Form from './components/Form/Form';


function App() {
  return (
    <Router>
      <Header />
      <ReactNotification />
    <Switch>
      <Route exact path="/" component={Form} />
      <Route path="/showdata" component={ShowData} />
    </Switch>
    </Router>
  );
}

export default App;
