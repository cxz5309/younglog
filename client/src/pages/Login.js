import { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom'
import { Link } from "react-router-dom";

class Login extends Component {

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

  login = async () => {
    try {
      await axios.post('/api/join')
        .then((res) => {
          console.log(res.data);
          localStorage.setItem('token', res.data.token);
        });
    }
    catch {
      alert('로그인에 실패했습니다!');
      this.props.history.push("/")
    }
  }

  render() {
    return (
      <main className="sign-page">
        <div className="container">
          <div className="row travel-group">
            <div className="col-12">
              <h1>Travel-Reviews 로그인</h1>
            </div>
            <div className="col-12">
              <div className="login-group">
                <input type="username" id="userid" name="username" placeholder="User ID" className="sign-input"></input><br /><br />
                <input type="password" id="userpw" name="password" placeholder="User Password"
                  className="sign-input"></input><br /><br />
              </div>
            </div>
            <div className="col-12">
              <button type="submit" onclick={this.login} className="box-btn login-box">로그인</button>
              <button className="box-btn">
                <Link to="/join">회원가입</Link>
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Login;