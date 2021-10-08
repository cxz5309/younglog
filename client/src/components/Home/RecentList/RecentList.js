import { Component } from "react";
import { Link } from 'react-router-dom';
import Post from './Post'

class RecentList extends Component {
  render() {

    return (
      <div className="recent-post-box">
        <div className="recent-header row">
          <div className="title"><h1>Recent post</h1></div>
          <Link to='/list-post/recent' className="view-all">View all</Link>
        </div>
        <div className="contents-box">
          {this.props.datas.map((data, index) => (
            <span key={index}>
              <Post data={data} />
            </span>
          ))}
        </div>
      </div>
    )
  }
}

export default RecentList;