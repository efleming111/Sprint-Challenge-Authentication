import React, { Component } from 'react';
import {Route} from 'react-router-dom';

// Import components
import Home from './components/Home'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import DisplayJokes from './components/DisplayJokes'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={(props)=><Home {...props}/>}/>
        <Route exact path="/signup" component={(props)=><SignUp {...props}/>}/>
        <Route exact path="/signin" component={(props)=><SignIn {...props}/>}/>
        <Route exact path="/jokes" component={(props)=><DisplayJokes {...props}/>}/>
      </div>
    );
  }
}

export default App;
