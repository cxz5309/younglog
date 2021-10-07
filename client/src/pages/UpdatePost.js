import { Component } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom'
import Header from '../components/Header';
class UpdatePost extends Component {
  constructor() {
    super();
    this.state = {
      readyPost: {
        uid: "",
        userName: "",
        userPwd: "",
        title: "",
        description: "",
        date: new Date(),
        views: 0,
      },
      postId: '',
      userName: '',
      submitType: 'update',
    };
  }

  componentDidMount() {
    this.setState({ postId: this.props.match.params.id });
    this.getMe();
    this.getPost();
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
          throw '알수 없는 오류가 있어 로그인되지 않았습니다.';
        }
      })
      .catch((error) => {
        this.setState({ userName: '' });
        console.log(error);
        alert('로그인이 필요합니다. 메인 페이지로 이동합니다.');
        this.props.history.push("/")
      });
  }

  getPost = async () => {
    try {
      await axios.get('/api/update-post/' + this.state.postId)
        .then((res) => {
          console.log(res.data);
          this.setState({ readyPost: res.data.post });
          let readyPost = { ...this.state.readyPost }
          readyPost['userPwd'] = '';
          this.setState({ readyPost })
        })
    }
    catch (error) {
      console.log(error);
      alert('페이지 로딩 실패!');
      this.props.history.push("/")
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let payload = this.state.readyPost;
    console.log(payload);

    if (this.state.submitType === 'update') {
      await axios
        .patch('/api/update-post/' + this.state.postId, payload)
        .then((res) => {
          console.log(res.data);
          alert('업데이트 성공!');
          this.props.history.push("/")
        }).catch((error) => {
          if (error.response) {
            alert(error.response.data.message);
            this.props.history.push("/")
          }
          else {
            console.log(error);
            alert('업데이트 실패!');
            this.props.history.push("/")
          }
        });
    }
    else {
      const userPwd = this.state.readyPost.userPwd;
      await axios
        .delete('/api/delete-post/' + this.state.postId, {
          data: {
            userPwd,
          }
        })
        .then((res) => {
          console.log(res.data);
          alert('삭제 성공!');
          this.props.history.push("/")
        })
        .catch((error) => {
          if (error.response) {
            alert(error.response.data.message);
            this.props.history.push("/")
          }
          else {
            console.log(error);
            alert('삭제 실패!');
            this.props.history.push("/")
          }
        });
    }
  }

  handleChange = (e) => {
    let readyPost = { ...this.state.readyPost }
    readyPost[e.target.name] = e.target.value;
    this.setState({ readyPost })
  };

  render() {
    return (
      <div>
        <main>
          <section>
            <form onSubmit={this.handleSubmit}>
              <label className="form-label">제목</label>
              <div className="input-group mb-3 input-group-lg">
                <input type="text" id="title" className="form-control" name="title" value={this.state.readyPost.title} onChange={this.handleChange}></input>
              </div>
              <label className="form-label">작성자</label>
              <div className="input-group mb-3">
                <input type="text" id="writer" className="form-control" name="userName" value={this.state.readyPost.userName} onChange={this.handleChange}></input>
              </div>
              <label className="form-label">비밀번호</label>
              <div className="input-group mb-3">
                <input type="text" id="password" className="form-control" name="userPwd" value={this.state.readyPost.userPwd} onChange={this.handleChange}></input>
              </div>
              <label className="form-label">내용</label>
              <div className="input-group mb-3">
                <textarea id="description" className="form-control" name="description" value={this.state.readyPost.description} onChange={this.handleChange}></textarea>
              </div>
              <label className="form-label">썸네일</label>
              {/* <div className="input-group mb-3">
              <input type="file" className="form-control" id="thumbnail" name="thumbnail" accept='image/jpg, image/png, image/jpeg' ></input>
            </div> */}
              <div>
                <button type="submit" className="btn btn-primary mb-3" onClick={() => { this.setState({ submitType: 'update' }) }}>게시물 수정</button>
                <button type="submit" className="btn btn-primary mb-3" onClick={() => { this.setState({ submitType: 'delete' }) }}>게시물 삭제</button>
              </div>
            </form>
          </section>
        </main>
      </div>
    )
  }
}

export default UpdatePost;