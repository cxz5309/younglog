import { Component } from "react";
import { Link } from 'react-router-dom';
import Post from './Post'

class RecentList extends Component {
  render() {
    
    return (
      <div className="recent-post-box">
        <div className="recent-header row">
          <div className="title col-10"><h1>Recent post</h1></div>
          <Link to='/list-post' className="view-all col-2">View all</Link>
        </div>
        <div className="contents-box">
          {this.props.datas.map((data, index) => (
            <span key={index}>
              <Post data={data} />
              {" ------- recent end -------- "}
            </span>
          ))}
        </div>
      </div>
    )
  }
}

export default RecentList;