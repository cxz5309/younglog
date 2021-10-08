import { Component } from 'react';
import axios from 'axios';

class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      readyPost: {
        uid: "",
        userName: "",
        userPwd: "",
        title: "",
        description: "",
        date: '',
        views: 0,
        thumbnailUrl: '',
      },
      thumbnail: null
    };

  }

  componentDidMount() {
    this.getMe();
  };

  getMe = async () => {
    await axios.get('/api/me', {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => {
        if (res.data.user) {
          console.log('자동으로 로그인되었습니다!');
          this.setState({ userName: res.data.user.userName });
        }
        else {
          this.setState({ userName: '' });
          throw new Error('알수 없는 오류가 있어 로그인되지 않았습니다.');
        }
      })
      .catch((error) => {
        this.setState({ userName: '' });
        console.log(error);
        alert('로그인이 필요합니다. 메인 페이지로 이동합니다.');
        this.props.history.push("/")
      });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const payload = this.state.readyPost;
    let data = new FormData();
    data.append("file", this.state.thumbnail);
    data.set("title", payload.title);
    data.set("description", payload.description);
    data.set("userName", payload.userName);
    data.set("userPwd", payload.userPwd);
    console.log(data);
    await axios
      .post('/api/create-post', data)
      .then((res) => {
        alert('포스트 성공!');
        this.props.history.push("/")
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        }
        else {
          console.log(error);
          alert('포스트 실패!');
        }
        this.props.history.push("/")
      });
  }

  handleChange = (e) => {
    let readyPost = { ...this.state.readyPost }
    readyPost[e.target.name] = e.target.value;
    this.setState({ readyPost })
  };

  onImgChange = (e) => {
    this.setState({ thumbnail: e.target.files[0] })
  }

  render() {
    return (
      <div>
        <main>
          <div>
            <section className='create-post-container'>
              <div className="create-post-group">
                <form onSubmit={this.handleSubmit}>
                  <label className="form-label">제목</label>
                  <input type="text" id="title" className="form-control" name="title" onChange={this.handleChange}></input>
                  <label className="form-label">작성자</label>
                  <input type="text" id="writer" className="form-control" name="userName" onChange={this.handleChange}></input>
                  <label className="form-label">비밀번호</label>
                  <input type="text" id="password" className="form-control" name="userPwd" onChange={this.handleChange}></input>
                  <label className="form-label">내용</label>
                  <textarea id="description" className="form-control" name="description" onChange={this.handleChange}></textarea>
                  <label className="form-label">썸네일</label>
                  <div className="input-group mb-3">
                    <input type="file" className="form-control" id="thumbnail" name="thumbnail" accept='image/jpg, image/png, image/jpeg' onChange={this.onImgChange}></input>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary mb-3" >게시물 작성</button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </main>
      </div>
    )
  }
}

export default CreatePost;