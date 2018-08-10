import React, { Component } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';



class Jokes extends Component {
    constructor(props) {
        super();
        this.state = { 
            jokes:[],
         }
    }

    componentDidMount() {
        
        this.getData();
        
      }

      logoutHandler = event => {
        localStorage.removeItem('jwt');
      }
    
      
      getData = () => {
        const token = localStorage.getItem('jwt');
        const requestOptions = {
            headers: {
                Authorization: token
            }
        }
        axios
            .get('http://localhost:5000/api/jokes', requestOptions)
            .then((response) => {
              this.setState({ jokes: response.data })
            })
            .catch(err => console.log(err));
      }

    render() { 
        return ( 
        <div>
            <h1>Users</h1>
            <div className="users">
            
                {this.state.jokes.map(joke => {
                    return (
                        <div className='userbox' key={joke.id}>
                            <div className='user'>Type: {joke.type}</div>
                            <div className='department'>Setup: {joke.setup}</div>
                            <div className='punch'>Punchline: {joke.punchline}</div>
                        </div>
                    )
                })}
            </div>
            <Link to='/signin'>
            <button className='logout' onClick={this.logoutHandler}>Logout</button>
            </Link>
        </div>
         );
    }
}
 
export default Jokes;