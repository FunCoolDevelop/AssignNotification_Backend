import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      uid:null,
      loginId:null,
      loginPw:null
    }
    this.login = this.login.bind(this);
    this.handleId = this.handleId.bind(this);
    this.handlePw = this.handlePw.bind(this);
  }

  componentDidMount(){
    fetch('http://localhost:4000/loginVerify')
    .then(res => res.json({loginId : this.state.loginId, 
      loginPw : this.state.loginPw}))
    .then(data => this.setState({uid : data.uid}));
  }

  login(e){
    fetch('http://localhost:4000/loginVerify')
    .then(res => res.json())
    .then(data => this.setState({uid : data.uid}));

    if(this.state.uid == null)
      alert("로그인 실패!");

    e.preventDefault();
  }

  handleId(e){
    this.setState({
      loginId: e.target.value,
    });
  }

  handlePw(e){
    this.setState({
      loginPw: e.target.value,
    });
  }

  render() {
    const {uid} = this.state;

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
          <form onSubmit={this.login}>
          <div style={{width: '30%'}}>
            <input  type="text" value={this.state.loginId} onChange={this.handleId} placeholder="loginId"/>
            <input  type="text" value={this.state.loginPw} onChange={this.handlePw} placeholder="loginPw"/>
          </div>
            <div style={{width: '30%'}}>
              <button type="submit">Login</button>
            </div> 
          </form>
      </div>
    )
  }
}

export default App;