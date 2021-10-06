import { Component } from "react";
import { Link } from "react-router-dom";

class Post extends Component {
  state = {
    readyPost: {
      uid: "",
      userName: "",
      userPwd: "",
      title: "",
      description: "",
      date: "",
      views: 0,
    },
  };

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
      <Link to={`/read-post/${id}`}>
        <article className="view-all col-2">
          <div className="popular-content">
            <div className="popular-title">{title}</div>
            <div className="popular-info row">
              <div className="created-date col-4">{date}</div>
              <div className="writer col-8">{username}</div>
            </div>
            <div className="popular-desc">
              <div>{description}</div>
            </div>
          </div>
        </article>
      </Link>
    )
  }
}

export default Post;