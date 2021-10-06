import { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom'

import PopularList from '../components/Home/PopularList/PopularList';
import RecentList from '../components/Home/RecentList/RecentList';
import Header from '../components/Header';
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    pList: [],
    rList: [],
    isLogin: false,
  };

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
          console.log('자동으로 로그인되었습니다!');
          this.setState({ isLogin: true });
        }
        else {
          this.setState({ isLogin: false });
          throw '알수 없는 오류가 있어 로그인되지 않았습니다.';
        }
      })
      .catch((error) => {
        this.setState({ isLogin: false });
        console.log('로그인되어있지 않습니다.');
      });
  }

  getList = async () => {
    await axios.get('/api')
      .then((res) => {
        console.log(res.data);
        console.log(res.data.popularList.length);
        this.setState({ pList: res.data.popularList })
        this.setState({ rList: res.data.recentList })
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
    let popularData = [...this.state.pList];
    let recentData = [...this.state.rList];
    const isLogin = this.state.isLogin;
    return (
      <div>
        <Header isLogin={isLogin} logout={this.logout} />
        <main>
          <section className="headline">
            <div>
              {isLogin && <Link to='/create-post'>CreatePost</Link>}
            </div>
          </section>
          <section className="popular-post">
            <PopularList datas={popularData} />
          </section>
          <section className="recent-post">
            <RecentList datas={recentData} />
          </section>
        </main>
      </div>
    )
  }
}

export default Home;