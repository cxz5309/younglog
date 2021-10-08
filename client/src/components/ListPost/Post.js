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
    return (
      <Link to={'/read-post/' + id} >
        <article className="row">
          {/* <div className="thumbnail-box col-3">
            <img className="thumbnail" src="<%= contents[i].thumbnail %>" alt="썸네일" className="col-3"></img>
          </div> */}
          <div className="list-content col-9">
            <div className="list-title">{title}</div>
            <div className="list-info row">
              <div className="created-date col-3">{date}</div>
              <div className="writer col-9">{username}</div>
            </div>
            <div className="list-desc">
              {description}
            </div>
          </div>
        </article>
      </Link>
    )
  }
}

export default Post;