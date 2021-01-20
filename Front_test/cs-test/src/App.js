import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username:null
    }
  }

  componentDidMount(){
    fetch('http://localhost:4000/transfer')
    .then(res => res.json())
    .then(data => this.setState({username : data.username}));
  }

  render() {
    const {username} = this.state;
    console.log(username);
    return (
      <div className = "App">
        <header className = "App-header">
          {username ? 'Hello ' + username : 'No username'}
        </header>
      </div>
    )
  }
}

export default App;