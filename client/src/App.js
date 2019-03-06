import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Launch from "./pages/launch";
import News from "./pages/news";
import createEvent from "./pages/createEvent";
import Events from "./pages/viewEvents";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import newUser from "./pages/newUser"
import login from "./pages/login"
import signIn from "./pages/signin"
// import Profile from "./pages/Profile/profile"
import "./App.css"

class App extends Component {


  render() {

    return (
      <Router>
        <div>
          <Nav lock={this.lock} />
          <Switch>
            <Route exact path="/" component={Launch} />
            <Route exact path="/news" component={News} />
            <Route exact path="/create_event" component={createEvent} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/newUser" component={newUser} />
            <Route exact path="/login" component={login} />
            <Route exact path ="/signIn" component={signIn}/>
            {/* <Route exact path ="/profile" component={Profile}  /> */}
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }


}

export default App;
