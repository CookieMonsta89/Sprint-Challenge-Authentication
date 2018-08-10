import React, { Component } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

import '../styles/jokes.css';



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
            <div className='fixing'>
            <h1>Jokes</h1>
            </div>
            <div className="containerthree">
            
                {this.state.jokes.map(joke => {
                    return (
                        <div className='jokebox' key={joke.id}>
                            <div className='type'>Type: {joke.type}</div>
                            <div className='setup'>Setup: {joke.setup}</div>
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