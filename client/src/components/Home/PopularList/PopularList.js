import { Component } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post'

class PopularList extends Component {

  render() {
    return (
      <div className='popular-post-box'>
        <div className='popular-header'>
          <div className='title'>Popular post</div>
          <div className='view-all'>
            <Link to='/list-post/popular' >View all</Link>
          </div>
        </div>
        <div className='contents-box row'>
          {this.props.datas.map((data, index) => (
            <div key={index}>
              <Post data={data} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default PopularList;