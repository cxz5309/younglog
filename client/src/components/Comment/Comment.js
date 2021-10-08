import axios from 'axios';
import { Component } from "react";

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      commentState: 'ready',
      readyUpdateContent: '',
    }
  }

  handleClick = (state) => {
    this.setState({ commentState: state });
    if (state === 'update')
      this.setState({ readyUpdateContent: this.props.comment.contents })
  }

  submitUpdate = async () => {
    const payload = this.state.readyUpdateContent;
    const token = localStorage.getItem('token');
    if (payload.length === 0) {
      alert('댓글 내용을 입력해주세요');
      return;
    }
    await axios.patch('/api/edit-comments/' + this.props.comment.uid,
      { contents: payload },
      { headers: { authorization: `Bearer ${token}` } })
      .then((res) => {
        alert('코멘트가 수정되었습니다!');
        window.location.reload();
      }).catch((error) => {
        if (error.response) {
          console.log(error.response);
          alert(error.response.data.message)
        }
        else {
          alert(error)
        }
      });
  }
  submitDelete = async () => {
    const payload = this.state.readyUpdateContent;
    const token = localStorage.getItem('token');

    await axios.delete('/api/delete-comments/' + this.props.comment.uid,
      {
        contents: payload,
        headers: { authorization: `Bearer ${token}` }
      })
      .then((res) => {
        alert('코멘트가 삭제되었습니다!');
        window.location.reload();
      }).catch((error) => {
        if (error.response) {
          console.log(error.response);
          alert(error.response.data.message)
        }
        else {
          alert(error)
        }
      });
  }

  renderSwitch(param) {
    switch (param) {
      default:
      case 'ready':
        return (
          <div>
            <div className="comment">
              <div className="comment-writer">{this.props.comment.writer}</div>
              <div className="comment-date">{this.props.comment.date}</div><br />
              <div className="comment-content">{this.props.comment.contents}</div>
            </div>
            {this.props.userName === this.props.comment.writer &&
              <div>
                <button onClick={() => this.handleClick('update')}>수정</button>
                <button onClick={() => this.handleClick('delete')}>삭제</button>
              </div>
            }
          </div>
        )
      case 'update':
        return (
          <div>
            <div className="comment">
              <div className="comment-writer">{this.props.comment.writer}</div>
              <div className="comment-date">{this.props.comment.date}</div><br />
              <input
                className="comment-content"
                onChange={(e) => this.setState({ readyUpdateContent: e.target.value })}
                value={this.state.readyUpdateContent}>
              </input>
            </div>
            {this.props.userName === this.props.comment.writer &&
              <div>
                <button onClick={() => this.handleClick('ready')}>수정 취소</button>
                <button onClick={() => this.submitUpdate()}>수정 확인</button>
              </div>
            }
          </div>
        )
      case 'delete':
        return (
          <div>
            <div className="comment">
              <div className="comment-writer">{this.props.comment.writer}</div>
              <div className="comment-date">{this.props.comment.date}</div><br />
              <div className="comment-content">{this.props.comment.contents}</div>
            </div>
            {this.props.userName === this.props.comment.writer &&
              <div>
                <button onClick={() => this.handleClick('ready')}>삭제 취소</button>
                <button onClick={() => this.submitDelete()}>삭제 확인</button>
              </div>
            }
          </div>
        )
    }
  }

  render() {
    return (
      <div>
        {
          this.renderSwitch(this.state.commentState)
        }
      </div>
    )
  }
}

export default Comment;