import { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom'
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      readyUser: {
        userName: "",
        password: "",
      }
    };
  }



  componentDidMount() {
    this.getMe();
  }
  getMe = async () => {
    await axios.get('/api/me', {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then((res) => {
      console.log(res.data);
      alert('이미 로그인되어있어 메인 페이지로 이동합니다.');
      this.props.history.push("/")
    })
  }

  login = async (e) => {
    e.preventDefault();
    const payload = this.state.readyUser;

    await axios.post('/api/login', payload)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        alert('로그인되었습니다!');
        this.props.history.push("/")
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          alert(error.response.data.message)
        }
        else {
          console.log(error);
          alert('로그인에 실패했습니다!')
        }
      });
  }

  handleChange = (e) => {
    let readyUser = { ...this.state.readyUser }
    readyUser[e.target.name] = e.target.value;
    this.setState({ readyUser })
  };

  render() {
    return (
      <main className="sign-page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>로그인</h1>
            </div>
            <form>
              <div className="col-12">
                <div className="login-group">
                  <label htmlFor="userName">UserName</label><br />
                  <input type="username" id="userName" name="userName" placeholder="UserName" className="sign-input" onChange={this.handleChange}></input><br /><br />
                  <label htmlFor="userpw">Password</label><br />
                  <input type="password" id="userpw" name="password" placeholder="Password"
                    className="sign-input" onChange={this.handleChange}></input><br /><br />
                </div>
              </div>
              <div className="col-12">
                <button type="submit" onClick={this.login} className="box-btn login-box">로그인</button>
                <button className="box-btn">
                  <Link to="/join">회원가입</Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    )
  }
}

export default Login;