import { Component } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Post from '../components/ListPost/Post';

class ListPost extends Component {
  constructor() {
    super();
    this.state = {
      postList: [],
      userName: '',
    };
  }

  // date: "2021. 9. 29."
  // description: "r"
  // thumbnail: "image/zero-w-logo_mini"
  // title: "q"
  // userName: "w"
  // userPwd: "e"
  // views: 0
  // __v: 0
  // uid: "615472023afd20d3915a872f"

  componentDidMount() {
    this.getMe();
    this.getList();
  }

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
          console.log(res.data.user);
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

  getList = async () => {
    await axios.get('/api/list-post/' + this.props.match.params.sortType)
      .then((res) => {
        console.log(res);
        this.setState({ postList: res.data.postList })
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
          this.props.history.push("/")
        }
        else {
          console.log(error);
          alert('페이지 로딩 실패!');
          this.props.history.push("/")
        }
      });
  }

  render() {
    let postList = [...this.state.postList];
    const userName = this.state.userName;
    return (
      <div>
        <Header userName={userName} logout={this.logout} />
        <main>
          <section className="recent-post">
            <div className="content-header">
              <h1 className="page-title">{this.props.match.params.id}</h1>
            </div>
            <div className="list-contents">
              <div className="contents">
                <div className="contents-box">
                  {postList.map((data, index) => (
                    <div key={index}>
                      <Post data={data} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }
}

export default ListPost;