import { Component } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Comment from '../components/Comment/Comment';
import Footer from '../components/Footer';

class DetailPost extends Component {
  constructor() {
    super();
    this.state = {
      postId: '',
      userName: '',
      readyPost: {
        uid: "",
        userName: "",
        userPwd: "",
        title: "",
        description: "",
        date: new Date(),
        views: 0,
      },
      readyComments: [],
      myComment: '',
    };
  }

  componentDidMount() {
    this.getMe();
    this.setState({ postId: this.props.match.params.id });
    this.getPost();
    this.getComments();
  };

  logout = () => {
    localStorage.removeItem(`token`)
    alert('로그아웃되었습니다!');

    window.location.reload();
  }

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
        console.log('로그인이 필요합니다');
      });
  }

  getPost = async () => {
    await axios.get('/api/read-post/' + this.props.match.params.id)
      .then((res) => {
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

  getComments = async () => {
    await axios.get('/api/comments/' + this.props.match.params.id)
      .then((res) => {
        this.setState({ readyComments: res.data.comments });
      }).catch((error) => {
        console.log('오류로 인해 댓글이 표시되지 않습니다.')
        this.setState({ readyComments: [] });
        if (error.response) {
          console.log(error.response.data.message);
        }
        else {
          console.log(error);
        }
      })
  }


  handleClick = () => {
    this.props.history.push('/update-post/' + this.state.postId);
  }

  CreateComment = async (e) => {
    e.preventDefault();
    let payload = this.state.myComment;
    const token = localStorage.getItem('token');
    if (payload.length === 0) {
      alert('댓글 내용을 입력해주세요');
      return;
    }
    await axios
      .post('/api/create-comment/' + this.props.match.params.id,
        { contents: payload },
        { headers: { authorization: `Bearer ${token}` } })
      .then((res) => {
        alert('댓글 생성!');
        window.location.reload();
      }).catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        }
        else {
          console.log(error);
          alert('댓글 실패!');
        }
        this.props.history.push("/login");
      });
  }

  RemoveThisComment = () => {
    this.setState({
      myComment: ''
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value, // <- 변경 후
    });
  };

  render() {
    const title = this.state.readyPost.title;
    const date = this.state.readyPost.date.valueOf();
    const postUserName = this.state.readyPost.userName;
    const description = this.state.readyPost.description;
    const views = this.state.readyPost.views;
    let userName = this.state.userName;
    let comments = this.state.readyComments === undefined ? [] : this.state.readyComments

    return (
      <div>
        <Header userName={userName} logout={this.logout} />
        <main>
          <section>
            <div className="read-page">
              <div className="content-header">
                <h1 className="read-title">{title}</h1>
                <div className="read-info row">
                  <div className="created-date">{date}</div>
                  <div className="writer">{postUserName}</div>
                </div>
              </div>
              <div className="read-content">
                <div className="desc">{description}</div>
                <div className="views">조회수 : {views}</div>
              </div>
              {userName.length > 0 && (
                <div className="btn">
                  <input type="button" onClick={this.handleClick} value="게시글 수정 & 삭제"></input>
                </div>
              )}
              <div className="comments">
                <div className="myComment">
                  <input type="text" name="myComment" id="content" onChange={this.handleChange} value={this.state.myComment} />
                  <button onClick={this.RemoveThisComment}>취소</button>
                  <button onClick={this.CreateComment}>댓글</button>
                </div>
                <div>{comments.length} 개의 코멘트가 있습니다.</div>
                {comments.map((data, index) => (
                  <div key={index}>
                    <Comment userName={userName} comment={data} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }
}

export default DetailPost;