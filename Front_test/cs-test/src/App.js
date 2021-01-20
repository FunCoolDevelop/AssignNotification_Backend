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
      <div>
        <header>
          {username ? 'Hello ' + username : 'No username'}
        </header>
        <form action="http://localhost:4000/transfer/signup" method="post">
          <div style={{width: '30%'}} className="form-group">
            <input  type="text" className="form-control" name="signid" placeholder="signid"/>
            <input  type="text" className="form-control" name="signpw" placeholder="signpw"/>
          </div>
            <div style={{width: '30%'}}>
              <button className="btn btn-success" type="submit">Create</button>
            </div> 
          </form>
      </div>
    )
  }
}

export default App;