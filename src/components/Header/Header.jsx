import React, { useEffect, useState } from 'react';
import { NavLink} from 'react-router-dom';
import {PersonFill,HouseDoorFill } from 'react-bootstrap-icons';
import './Header.css';

function Header() {
  const [sessionId, setSessionID] = useState("");

  const onHandleClick = (e) => {
    sessionStorage.removeItem("activeSessionEmail");
    sessionStorage.removeItem("currentID");
    sessionStorage.removeItem("userType");
  }

  const onHomeClick = (e) => {
    sessionStorage.removeItem("currentID");
  };

  useEffect(() =>{
    const getSessionId = sessionStorage.getItem("activeSessionEmail");
    setSessionID(getSessionId);
  },[sessionId]);

    return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-container" style={{ background: '#202020'}}>
      <div className="container">
       <div className='truffle-health-logo'>
            <NavLink className="navbar-brand" to="/" >
                <div className="logo-container">    
                    <img src="/images/logo-ngo.png" alt="Logo" className="logo-img"/>
                    <div className="weight-bold gray-color logo-text"> DonationMadeEasy</div>
                </div>
            </NavLink>
        </div>  

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav  ms-auto custom-text-links">
          {sessionId !== null && <li className="nav-item">
              <NavLink onClick={onHomeClick} 
              className={(navData) => (navData.isActive ? "active-style nav-link" : 'nav-link none')}
              to={sessionStorage.getItem("userType") === "NGO" ?"/homeNGO" : "/homeCustomer" }>
               <HouseDoorFill /> Home
              </NavLink>
            </li>}

            {sessionId === null && (<li className="nav-item">
              <NavLink 
              className={(navData) => (navData.isActive ? "active-style nav-link" : 'nav-link none')} 
              to="/">
              <PersonFill /> Login/Signup
              </NavLink>
            </li>)}

            {sessionId !== null && (<li className="nav-item">
              <NavLink onClick={onHandleClick} 
              className={(navData) => (navData.isActive ? "active-style nav-link" : 'nav-link none')} 
              to="/">
              <PersonFill /> Sign Out
              </NavLink>
            </li>)}

          </ul>
        </div>
      </div>
    </nav>
    );
}

export default Header;