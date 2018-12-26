import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/dashboard/Dashboard";
import ProjectDetails from "./components/project/ProjectDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateProject from "./components/project/CreateProject";
import Error404 from "./components/error/Error404";
import EditProject from "./components/project/EditProject";
import Help from "./components/help/Help";
import UserProfile from "./components/user/UserProfile";

class App extends Component {
  componentDidMount() {
    const ele = document.getElementById("loader");
    if (ele) {
      ele.style.display = "none";
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/help" component={Help} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/user" component={UserProfile} />
            <Route path="/create" component={CreateProject} />
            <Route path="/view/:id" component={ProjectDetails} />
            <Route path="/edit/:id" component={EditProject} />
            <Route component={Error404} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
