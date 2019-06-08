import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import OverviewCreate from "./components/overviews/OverviewCreate";
import OverviewEdit from "./components/overviews/OverviewEdit";
import Overviews from "./components/overviews/Overviews";
import OverviewShow from "./components/overviews/OverviewShow";
import UserShow from "./components/users/UserShow";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Overviews} />
              <Route path="/edit/:id" component={OverviewEdit} />
              <Route path="/create/:id" component={OverviewCreate} />
              <Route path="/overviews/:id" component={OverviewShow} />
              <Route path="/login" component={Login} />
              <Route path="/users/:id" component={UserShow} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
