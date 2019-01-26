import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const JokesPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .buttons{
    display: flex;
  }

  h1{
    font-size: 36px;
  }

  p{
    font-size: 26px;
  }
`;

const NavButton = styled.div`
  font-size: 26px;
  width: 100px
  margin: 20px;
  padding: 8px 12px;
  border: 2px solid black;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  color: black;

  &:hover{
    color: white;
    background-color: black;
    cursor: pointer;
  }
`;

const Joke = styled.div`
  display: flex;
  justify-content: center;
  font-size: 22px;
  width: 600px;
  margin: 20px 0px;
  padding: 10px 10px;
  border: 2px solid black;
  border-radius: 10px;
`;


class DisplayJokes extends Component {
  constructor(props){
    super(props);
    this.state = {
      jokes: []
    }
  }
  componentDidMount(){
    const options = {
      headers:{
        Authorization: localStorage.getItem('jwt')
      }
    }
    axios.get('http://localhost:3300/api/jokes', options)
    .then(res=>{
      this.setState({
        jokes: res.data
      })
    })
    .catch(error=>{
      console.log(error);
    })
  }

  returnHome = (event)=>{
    event.preventDefault();
    this.props.history.push('/');
  }

  logout = (event)=>{
    event.preventDefault();
    localStorage.removeItem('jwt');
    this.props.history.push('/');
  }

  render() {
    if(!this.state.jokes.length){
      return (
        <JokesPage>
          <NavButton onClick={this.returnHome}>Home</NavButton>
          <h1>Jokes</h1>
          <p>You are not authorized to view these jokes</p>
        </JokesPage>
      )
    }
    return (
      <JokesPage>
        <div className="buttons">
          <NavButton onClick={this.returnHome}>Home</NavButton>
          <NavButton onClick={this.logout}>Logout</NavButton>
        </div>
        <h1>Jokes</h1>
        {this.state.jokes.map(joke=>(
          <Joke key={joke.id}>
            <div>{joke.joke}</div>
          </Joke>
        ))}
      </JokesPage>
    );
  }
}

export default DisplayJokes;