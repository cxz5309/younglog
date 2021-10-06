import { Component } from "react";
import { Link } from 'react-router-dom';
import Post from './Post'
import { render } from '@testing-library/react';

class PopularList extends Component {

  render() {
    return (
      <div className="popular-post-box">
        <div className="popular-header row">
          <div className="title col-10"><h1>Popular post</h1></div>
          <Link to='/list-post' className="view-all col-2">View all</Link>
        </div>
        <div className="contents-box row">
          {this.props.datas.map((data, index) => (
            <span key={index}>
              <Post data={data} />
              <div>" -------- popular end----------- "</div>
            </span>
          ))}
        </div>
      </div>
    )
  }
}

export default PopularList;