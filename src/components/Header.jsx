
import React, { useState, useEffect, useContext } from 'react';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { BookListContext } from '../contexts/BookListContext';

const Header = () => {
  const { bookList } = useContext(BookListContext);
  const [isPulsing, setIsPulsing] = useState(false)
  const totalQuantity = bookList.reduce((sum, item) => sum + item.quantity, 0);

   useEffect(() => {
    if (totalQuantity > 0) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [totalQuantity]);



  return (
    
    <header className="header">
      <img src={logo} alt="logo" />
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
            Home
          </NavLink>
        </li>

        <li style={{ position: "relative" }}>
          <NavLink to="/booklist" className={({ isActive }) => isActive ? "active-link" : ""}>
            Book List
          </NavLink>
          {totalQuantity > 0 && (
            <span className={`cart-badge ${isPulsing ? "pulse" : ""}`}>
              {totalQuantity}
            </span>
          )}

        </li>

        <li>
          <NavLink to="/checkout" className={({ isActive }) => isActive ? "active-link" : ""}>
            Checkout
          </NavLink>
        </li>

        <li>
          <NavLink to = "/contact" className = {({isActive}) => isActive ? "active-link": ""}>
            Contact Us 
          </NavLink>

        </li>
      </ul>
    </header>
    
  );
};

export default Header;

