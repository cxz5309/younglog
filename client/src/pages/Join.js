import { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom'
import { Link } from "react-router-dom";

class Join extends Component {
  state = {
    readyUser: {
      id: "",
      password: "",
      confirmPassword: "",
    },
  };


  componentDidMount() {
    this.getMe();
  }
  getMe = async () => {
    await axios.get('/api/me', {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => {
        if (res.data.user) {
          console.log(res.data);
          alert('이미 로그인되어있어 메인 페이지로 이동합니다.');
          this.props.history.push("/")
        }
      })
      .catch((error) => {
        console.log('로그인되어있지 않습니다.');
      });
  }

  register = async (e) => {
    e.preventDefault();
    const payload = this.state.readyUser;

    await axios.post('/api/join', payload)
      .then((res) => {
        console.log(res.data);
        alert('회원가입 성공!');
        this.props.history.push("/")
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          alert(error.response.data.message)
        }
        else {
          alert(error)
        }
      })
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
          <div className="row travel-group">
            <div className="col-12">
              <h1>회원가입</h1>
            </div>
            <div className="col-12">
              <div className="login-group">
                <form>
                  <label>3자 이상, 알파벳 대소문자</label><br />
                  <input type="text" name="id" placeholder="New ID (3자 이상)" className="sign-input" onChange={this.handleChange}></input><br />
                  <label>4자 이상</label><br />
                  <input type="password" name="password" placeholder="New Password (4자 이상)" className="sign-input" onChange={this.handleChange}></input><br />
                  <label>비밀번호를 한번 더 입력해주세요.</label><br />
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" className="sign-input" onChange={this.handleChange}></input><br />
                </form>
              </div>
            </div>
            <button onClick={this.register} className="box-btn">회원가입</button>
          </div>
        </div>
      </main>
    )
  }
}

export default Join;