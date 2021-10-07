import { Component } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post'

class PopularList extends Component {

  render() {
    return (
      <div className='popular-post-box'>
        <div className='popular-header row'>
          <div className='title'>Popular post</div>
          <Link to='/list-post' className='view-all'>View all</Link>
        </div>
        <div className='contents-box row'>
          {this.props.datas.map((data, index) => (
            <Post data={data} />
          ))}
        </div>
      </div>
    )
  }
}

export default PopularList;