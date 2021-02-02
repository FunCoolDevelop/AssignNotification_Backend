import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      sid:undefined,
      loginId:undefined,
      loginPw:undefined,
      assignData:undefined
    }
    this.getAssign = this.getAssign.bind(this);
    this.login = this.login.bind(this);
    this.handleId = this.handleId.bind(this);
    this.handlePw = this.handlePw.bind(this);
    this.crawl = this.crawl.bind(this);
  }

  componentDidMount(){
    fetch('http://localhost:4000/transfer')
    .then(res => res.json())
    .then(data => this.setState({sid : data.sid}));
  }

  getAssign(e){
    const recipeUrl = 'http://localhost:4000/transfer/getAssign';
    const postBody = {
      sid : this.state.sid
    };
    const requestMetadata = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
    };

    fetch(recipeUrl, requestMetadata)
    .then(res => res.json())
    .then(data => this.setState({assignData : data.assignData}));

    e.preventDefault();
  }

  login(e){
    //alert(this.state.loginId + " " + this.state.loginPw);

    const recipeUrl = 'http://localhost:4000/transfer/loginVerify';
    const postBody = {
      loginId : this.state.loginId,
      loginPw : this.state.loginPw, 
    };
    const requestMetadata = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
    };

    fetch(recipeUrl, requestMetadata)
    .then(res => res.json())
    .then(data => this.setState({sid : data.sid}));

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

  crawl(e){
    const recipeUrl = 'http://localhost:4000/transfer/crawl';
    const postBody = {
      sid : this.state.sid
    };
    const requestMetadata = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
    };

    fetch(recipeUrl, requestMetadata)
    .then(res => res.json())

    e.preventDefault();
  }

  render() {
    const {sid} = this.state;
    const {assignData} = this.state;

    return (
      <div>
        <header>
          {sid ? 'UID : ' + sid : 'No userinfo'}
        </header>

        <hr size="1" width="100%" color="red"/>

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

          <hr size="1" width="100%" color="red"/>  

          <form onSubmit={this.login}>
          <div style={{width: '30%'}}>
            <input  type="text" value={this.state.loginId} onChange={this.handleId} placeholder="signId"/>
            <input  type="password" value={this.state.loginPw} onChange={this.handlePw} placeholder="signPw"/>
          </div>
            <div style={{width: '30%'}}>
              <button type="submit">Login</button>
            </div> 
          </form>

          <hr size="1" width="100%" color="red"/>

          <div>
            <p>
              {assignData ? assignData : 'No AssignData'}
            </p>
            <button onClick={this.getAssign}>getAssign</button>
          </div>

          <hr size="1" width="100%" color="red"/>

          <div>
            <button onClick={this.crawl}>crawlSingle</button>
          </div>
      </div>
    )
  }
}

export default App;