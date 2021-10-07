import { Component } from 'react';
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faBars } from '@fortawesome/free-solid-svg-icons'
import { render } from '@testing-library/react';


class Header extends Component {
  constructor() {
    super();
    library.add(fas, faBars);
  }

  render() {

    return (
      <header className='header'>
        <nav>
          <div className='row'>
            <div className='logo-box'>
              <Link to='/' className="header-logo" ><img src="/image/zero-w-logo_mini.png" alt="logo-img" /></Link>
            </div>
            <div className='nav-items row'>
              <Link to='/join' className="nav-item col-2"> 회원가입 </Link>
              {
                this.props.userName.length > 0
                  ? <span onClick={this.props.logout}>로그아웃</span>
                  : <Link to='/login' className="nav-item col-2"> 로그인 </Link>
              }
              <FontAwesomeIcon icon={fas, faBars} />
            </div>
            <hr />
          </div>
        </nav>
      </header>
    )
  }
}

export default Header;
