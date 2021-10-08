import { Component } from 'react';
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faBars } from '@fortawesome/free-solid-svg-icons'


class Header extends Component {
  constructor() {
    super();
    library.add(fas, faBars);
  }

  render() {
    return (
      <header className='header'>
        <nav>
          <div className='header-box row'>
            <div className='logo-box'>
              <Link to='/' className="header-logo" ><img src="/image/zero-w-logo_mini.png" alt="logo-img" /></Link>
            </div>
            <div className='nav-items row'>
              {this.props.userName.length > 0 && <Link to='/create-post' className="nav-item">게시물 작성</Link>}
              <Link to='/join' className="nav-item"> 회원가입 </Link>
              {
                this.props.userName.length > 0
                  ? <span onClick={this.props.logout}>로그아웃</span>
                  : <Link to='/login' className="nav-item"> 로그인 </Link>
              }
              <FontAwesomeIcon className="nav-item" icon={fas, faBars} size='2x' />
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header;
