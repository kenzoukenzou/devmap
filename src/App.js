import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Navbar from "./components/layout/Navbar";
import OverviewCreate from "./components/overviews/OverviewCreate";
import OverviewEdit from "./components/overviews/OverviewEdit";
import Overviews from "./components/overviews/Overviews";
import OverviewShow from "./components/overviews/OverviewShow";
import UserShow from "./components/users/UserShow";
import Helmet from "react-helmet";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          {/* Setting OGP */}
          <Helmet
            meta={[
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:title", content: "Devmap" },
              {
                name: "twitter:description",
                content: "独学ロードマップ共有サービス"
              },
              { name: "twitter:image", content: "http://path/to/image" },
              {
                property: "og:title",
                content: "Devmap | 独学ロードマップ共有サービス"
              },
              { property: "og:type", content: "website" },
              { property: "og:url", content: "http://path/to/this/url" },
              { property: "og:image", content: "http://path/to/image" },
              {
                property: "og:description",
                content: "独学ロードマップ共有サービス"
              },
              {
                property: "og:site_name",
                content: "Devmap | 独学ロードマップ共有サービス"
              }
            ]}
          />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Overviews} />
              <Route path="/edit/:id" component={OverviewEdit} />
              <Route path="/create/:id" component={OverviewCreate} />
              <Route path="/overviews/:id" component={OverviewShow} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/users/:id" component={UserShow} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
