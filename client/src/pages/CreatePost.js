import { Component } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom'
import Header from '../components/Header';

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
        date: new Date(),
        views: 0,
      },
    };

  }


  handleSubmit = async (e) => {
    e.preventDefault();
    const payload = this.state.readyPost;
    await axios
      .post('/api/create-post', payload)
      .then((res) => {
        console.log(res.data);
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

  render() {
    return (
      <div>
        <main>
          <section>
            <form onSubmit={this.handleSubmit}>
              <label className="form-label">제목</label>
              <div className="input-group mb-3 input-group-lg">
                <input type="text" id="title" className="form-control" name="title" onChange={this.handleChange}></input>
              </div>
              <label className="form-label">작성자</label>
              <div className="input-group mb-3">
                <input type="text" id="writer" className="form-control" name="userName" onChange={this.handleChange}></input>
              </div>
              <label className="form-label">비밀번호</label>
              <div className="input-group mb-3">
                <input type="text" id="password" className="form-control" name="userPwd" onChange={this.handleChange}></input>
              </div>
              <label className="form-label">내용</label>
              <div className="input-group mb-3">
                <textarea id="description" className="form-control" name="description" onChange={this.handleChange}></textarea>
              </div>
              <label className="form-label">썸네일</label>
              {/* <div className="input-group mb-3">
              <input type="file" className="form-control" id="thumbnail" name="thumbnail" accept='image/jpg, image/png, image/jpeg' ></input>
            </div> */}
              <div>
                <button type="submit" className="btn btn-primary mb-3" >게시물 작성</button>
              </div>
            </form>
          </section>
        </main>
      </div>
    )
  }
}

export default CreatePost;