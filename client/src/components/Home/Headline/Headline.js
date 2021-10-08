import { Component } from "react";

class Headline extends Component {

  render() {
    return (
      <div className="headline-box row">
        <div className='info-box'>
          <article>
            <div className="title">영우 블로그</div>
            <div className="description">시간배분을..잘하자..</div>
          </article>
        </div>
        <div className='avatar-box'>
          <article className="user-avatar">
            <img src="image/me.jpg" alt="아바타"></img>
          </article>
        </div>
      </div>
    )
  }
}

export default Headline;


