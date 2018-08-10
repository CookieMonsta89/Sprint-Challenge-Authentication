import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import{Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Signin from './component/signin';
import Signup from './component/signup';
import Jokes from './component/jokes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div className='buttons'>
          <Link to='/signin'>
          <button className='red'>Sign In</button>
          </Link>
          <Link to='/signup'>
          <button className='blue'>Register</button>
          </Link>
          <Link to ='/users'>
          <button className='green'>Users</button>
          </Link>
        </div>
        <h1>
          SPRINT CHALLENGE
        </h1>
         

        </header>
        <div>
          <Route path='/signin' component={Signin} />
          <Route path='/register' component={Signup} />
          <Route path='/jokes' component={Jokes} />
          <div>
            
          </div>

        </div>
        
        
        
      </div>
      
    );
  }
}

export default App;
