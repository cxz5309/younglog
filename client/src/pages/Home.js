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
    this.getList();
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
        console.log(error);
        alert('페이지 로딩 실패!');
        this.props.history.push("/")
      });
  }

  render() {
    let popularData = [...this.state.pList];
    let recentData = [...this.state.rList];
    return (
      <div>
        <Header />
        <main>
          <section className="headline">
            <Link to='/create-post'>CreatePost</Link>
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