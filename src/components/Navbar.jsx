import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaHome, FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import { GrTest } from "react-icons/gr";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY.current && window.scrollY > 50) {
      // Scrolling down
      setShow(false);
    } else {
      // Scrolling up
      setShow(true);
    }
    lastScrollY.current = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, []);

  return (
    <StyledNavbar className={show ? 'visible' : 'hidden'}>
      <a href="/" className="button" title="Home">
        <FaHome className="icon" />
      </a>
      <a href="/search" className="button" title="Search">
        <FaSearch className="icon" />
      </a>
      <a href="/profile" className="button" title="Profile">
        <FaUser className="icon" />
      </a>
      <a href="/cart" className="button" title="Cart">
        <GrTest className="icon" />
      </a>
    </StyledNavbar>
  );
};

const StyledNavbar = styled.nav`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: black;
  padding: 5px 15px;
  border-radius: 25px;
  display: flex;
  gap: 15px;
  z-index: 1000;
  transition: top 0.3s ease, opacity 0.3s ease;
  opacity: 1;

  &.hidden {
    top: -60px;
    opacity: 0;
    pointer-events: none;
  }

  .button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.3s ease;
  }

  .button:hover {
    transform: translateY(-3px);
  }

  .icon {
    font-size: 20px;
  }
`;

export default Navbar;
