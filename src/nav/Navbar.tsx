import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import '../sass/navbar.scss'

const Navbar = () => {
  
  return (
    <div className="navbar-area">
      <div className="logo" id="logo">
        <Link to="/">
          {/* <h2>HOME</h2> */}
          <img src="https://ktlea.co.kr/kor/assets/images/main/logo.png" alt="logo" />
        </Link>
      </div>
      <div className="link-items">
        <Link to="/">
          <p className="link-item">협회소개</p>
        </Link>
        <Link to="/">
          <p className="link-item">회원사 소개</p>
        </Link>
        <Link to="/">
          <p className="link-item">뉴스 · 공지</p>
        </Link>
        <Link to="/">
          <p className="link-item">문의하기</p>
        </Link>
        <Link to="/guestbook">
          <p className="link-item">방명록</p>
        </Link>

      </div>

    </div>
  )
}

export default Navbar