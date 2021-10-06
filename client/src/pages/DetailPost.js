import { Component } from 'react';
import axios from 'axios';
import { Redirect, useHistory, useParams } from 'react-router-dom'
import Header from '../components/Header';
class DetailPost extends Component {
  state = {
    readyPost: {
      uid: "",
      userName: "",
      userPwd: "",
      title: "",
      description: "",
      date: new Date(),
      views: 0,
    },
    userId: '',
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.setState({ userId: this.props.match.params.id });
    this.getPost();
  };

  getPost = async () => {
    await axios.get('/api/read-post/' + this.props.match.params.id)
      .then((res) => {
        console.log(res.data);
        this.setState({ readyPost: res.data.post });
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        }
        else {
          console.log(error);
          alert('페이지 로딩 실패!');
        }
        this.props.history.push("/")
      });
  }


  handleClick = () => {
    this.props.history.push('/update-post/' + this.state.userId);
  }


  render() {
    const title = this.state.readyPost.title;
    const date = this.state.readyPost.date.valueOf();
    const username = this.state.readyPost.userName;
    const description = this.state.readyPost.description;


    return (
      <div>
        <Header />
        <main>
          <section>
            <div className="content-header">
              <h1 className="read-title">{title}</h1>
              <div className="read-info row">
                <div className="created-date col-3">{date}</div>
                <div className="writer col-9">{username}</div>
              </div>
            </div>
            <div className="read-content">
              <div className="desc">{description}</div>
            </div>
            <div className="btn">
              <input type="button" onClick={this.handleClick} value="게시글 수정 및 삭제"></input>
            </div>
          </section>
        </main>
      </div>
    )
  }
}

export default DetailPost;