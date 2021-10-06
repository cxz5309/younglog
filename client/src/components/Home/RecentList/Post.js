import { Component } from "react";
import { Link } from "react-router-dom";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      readyPost: {
        uid: "",
        userName: "",
        userPwd: "",
        title: "",
        description: "",
        date: new Date(),
        views: 0,
      },
    };
  }

  componentDidMount() {
    this.setState({ readyPost: this.props.data })
  }

  render() {

    const id = this.state.readyPost.uid;
    const title = this.state.readyPost.title;
    const date = this.state.readyPost.date.valueOf();
    const username = this.state.readyPost.userName;
    const description = this.state.readyPost.description;
    return (

      <Link to={'/read-post/' + id} >
        <article className="row">
          <div className="thumbnail-box col-3">
            {/* <img className="thumbnail col-3" src="<%= recentPosts[i].thumbnail %>" alt="썸네일"/> */}
          </div>
          <div className="recent-content col-9">
            <div className="recent-title">{title}</div>
            <div className="recent-info row">
              <div className="created-date col-3">{date}</div>
              <div className="writer col-9">{username}</div>
            </div>
            <div className="recent-desc">
              {description}
            </div>
          </div>
        </article>
      </Link>
    )
  }
}

export default Post;