import React from "react";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faBars } from '@fortawesome/free-solid-svg-icons'

library.add(fas, faBars);

const Header = () => {
  return (
    <header>
      <div className='row'>
        <div className='logo-box'>
          <Link to='/' className="header-logo" ><img src="/image/zero-w-logo_mini.png" alt="logo-img" /></Link>
        </div>
        <div className='nav-items'>
          <Link to='/join' className="nav-item col-2"> 회원가입 </Link>
          <Link to='/login' className="nav-item col-2"> 로그인 </Link>
          <Link to='/logout' className="nav-item col-2"> 로그아웃 </Link>
          <FontAwesomeIcon icon={fas, faBars} />
        </div>
        <hr />
      </div>
    </header>
  )
}

export default Header;
