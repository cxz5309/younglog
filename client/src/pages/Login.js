import { Component } from 'react';
import axios from 'axios';
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
      alert('이미 로그인되어있어 메인 페이지로 이동합니다.');
      this.props.history.push("/")
    })
  }

  login = async (e) => {
    e.preventDefault();
    const payload = this.state.readyUser;
    await axios.post('/api/login', payload)
      .then((res) => {
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
      <main>
        <div className='login-container'>
          <div>
            <h1>로그인</h1>
          </div>
          <form>
            <div>
              <div className="login-group">
                <form>
                  <label>닉네임</label><br />
                  <input type="username" id="userName" name="userName" onChange={this.handleChange}></input><br /><br />
                  <label>비밀번호</label><br />
                  <input type="password" id="userpw" name="password" onChange={this.handleChange}></input><br /><br />
                </form>
              </div>
            </div>
            <div>
              <button type="submit" onClick={this.login} className="login-box">로그인</button>
              <Link to="/join"><button>회원가입</button></Link>
            </div>
          </form>
        </div>
      </main>
    )
  }
}

export default Login;