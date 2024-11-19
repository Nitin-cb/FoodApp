import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken, food_list } = useContext(StoreContext);
  const [clicked, setIsClicked] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  };

  const handleFoodSearch = (foodName) => {
    if (foodName) {
      const filteredFood = food_list.filter((food) =>
        food.name.toLowerCase().includes(foodName.toLowerCase())
      );
      
      setSearchResults(filteredFood);
      console.log(searchResults);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className='navbar'>
  
      <Link to='/'><img className='logo' src={assets.logo} alt="Logo" /></Link>

      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={`${menu === "home" ? "active" : ""}`}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={`${menu === "menu" ? "active" : ""}`}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mob-app")} className={`${menu === "mob-app" ? "active" : ""}`}>mobile app</a>
        <a href='#contact' onClick={() => setMenu("contact")} className={`${menu === "contact" ? "active" : ""}`}>contact us</a>
      </ul>

      <div className="navbar-right">

        <div className={`navbar-search ${clicked ? "active" : ""}`}>
          {clicked && (
            <>
              <input
                placeholder="Search..."
                onChange={(e) => handleFoodSearch(e.target.value)}
                onBlur={() => setTimeout(() => setSearchResults([]), 200)} 
              />
              {searchResults.length > 0 && (
                <ul className="search-dropdown">
                  {searchResults.map((result) => (
                    <li key={result.id} onClick={() => navigate(`/food/${result.id}`)}>
                    <span>{result.name}</span> - <span>${result.price}</span>
                  </li>
                  ))}
                </ul>
              )}
            </>
          )}
          <img 
            src={clicked ? assets.cross_icon : assets.search_icon} 
            alt={clicked ? "Close Icon" : "Search Icon"} 
            onClick={() => setIsClicked((prev) => !prev)} 
          />
        </div>

        {/* Cart Icon */}
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="Cart Icon" />
          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </Link>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile Icon" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Orders Icon" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout Icon" />
                <p>Logout</p>
              </li> 
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
