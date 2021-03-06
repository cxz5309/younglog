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
        thumbnail: "",
        date: "",
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
    const date = this.state.readyPost.date;
    const username = this.state.readyPost.userName;
    const description = this.state.readyPost.description;
    const thumbnail = this.state.readyPost.thumbnail;
    return (
      <Link to={`/read-post/${id}`}>
        <article>
          <div className="popular-content">
            <div className="popular-title">{title}</div>
            <div className="popular-info row">
              <div className="created-date">{date}</div>
              <div className="writer">{username}</div>
            </div>
            <div className="popular-desc">
              <div>{description}</div>
              <div>{thumbnail}</div>
            </div>
          </div>
        </article>
      </Link>
    )
  }
}

export default Post;