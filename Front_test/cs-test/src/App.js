import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      uid:null
    }
  }

  componentDidMount(){
    fetch('http://localhost:4000/transfer')
    .then(res => res.json())
    .then(data => this.setState({uid : data.uid}));
  }

  render() {
    const {uid} = this.state;
    console.log(uid);
    return (
      <div>
        <header>
          {uid ? 'UID : ' + uid : 'No userinfo'}
        </header>
        <form action="http://localhost:4000/transfer/signup" method="post">
          <div style={{width: '30%'}} className="form-group">
            <input  type="text" className="form-control" name="cid" placeholder="cid"/>
            <input  type="text" className="form-control" name="name" placeholder="name"/>
            <input  type="text" className="form-control" name="signid" placeholder="signid"/>
            <input  type="text" className="form-control" name="signpw" placeholder="signpw"/>
          </div>
            <div style={{width: '30%'}}>
              <button className="btn btn-success" type="submit">SignUp</button>
            </div> 
          </form>
      </div>
    )
  }
}

export default App;