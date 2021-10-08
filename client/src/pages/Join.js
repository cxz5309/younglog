import { Component } from 'react';
import axios from 'axios';

class Join extends Component {
  constructor() {
    super();
    this.state = {
      readyUser: {
        userName: "",
        password: "",
        confirmPassword: "",
      },
    };
  }



  componentDidMount() {
    this.getMe();
  }
  getMe = async () => {
    await axios.get('/api/me', {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => {
        if (res.data.user) {
          alert('이미 로그인되어있어 메인 페이지로 이동합니다.');
          this.props.history.push("/")
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('로그인이 필요합니다');
      });
  }

  register = async (e) => {
    e.preventDefault();
    const payload = this.state.readyUser;

    await axios.post('/api/join', payload)
      .then((res) => {
        alert('회원가입 성공!');
        this.props.history.push("/login")
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
      <main>
        <div className='join-container'>
          <div>
            <h1>회원가입</h1>
          </div>
          <div>
            <div className="join-group">
              <form>
                <label>사용자 닉네임</label><br />
                <input type="text" name="userName" placeholder="3자 이상, 알파벳 대소문자" className="sign-input" onChange={this.handleChange}></input><br />
                <label>비밀번호</label><br />
                <input type="password" name="password" placeholder="4자 이상" className="sign-input" onChange={this.handleChange}></input><br />
                <label>비밀번호를 한번 더 입력해주세요.</label><br />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" className="sign-input" onChange={this.handleChange}></input><br />
              </form>
            </div>
          </div>
          <button onClick={this.register} className="box-btn">회원가입</button>
        </div>
      </main>
    )
  }
}

export default Join;