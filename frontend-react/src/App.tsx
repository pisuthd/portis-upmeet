import React from 'react';
import styled from "styled-components";
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { render } from 'react-dom';
import {
  Container
} from 'reactstrap';
import './App.css';
import logo from './logo.svg';
import Home from "./Components/Home/Home";
import Gas from "./Components/Gas/Gas";
import Header from "./Layouts/Header";

const Content = styled(Container)`
    padding: 40px;
    height: 100vh;
    z-index:2;
    padding-top: 70px;
    font-family: helvetica;
`;

const App: React.FC = () => {

  return (
    <Router>
        <Header/>
        <Content>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/gas" component={Gas} />
          </Switch>
        </Content>
    </Router>
  );
}

export default App;
