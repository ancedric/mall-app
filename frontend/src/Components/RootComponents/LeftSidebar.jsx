import { Link, NavLink, useLocation } from "react-router-dom";
import LogOut from "../../Authentication/Logout"
import { sidebarLinks } from "../../constants/constants";
import { useEffect, useState } from "react";
import { user } from "../../Authentication/user";

function LeftSidebar() {
  const {pathname} = useLocation()
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    const body = document.body;
    const post = document.querySelector('post-card')
    if(isDarkMode){
      body.classList.add('dark-mode');
      if (post) {
        post.classList.add('dark-mode');
      }
    }else{
      body.classList.remove('dark-mode');
      if (post) {
        post.classList.remove('dark-mode');
      }
    }
  }, [isDarkMode])

  return (
  <><nav className={isDarkMode ? "leftsidebar dark-mode" : "leftsidebar"}>
      <div className="leftsidebar-div">
        <Link to='/home'>
          <img
            src='frontend\src\assets\images\logo.svg'
            alt="logo"
            width={130}
            height={100} />
        </Link>
      </div>
      <div className='profile'>
        <h3>{user.username}</h3>
        <p className='user-email'>{user.email}</p>
      </div>
      <div>
        <button onClick={toggleDarkMode} className={isDarkMode ? 'light-btn' : 'dark-btn'}>{isDarkMode ? <img src="frontend\src\assets\icons\sun-2-svgrepo-com (2).svg" alt="light_mode" width={20} height={20} /> : <img src="frontend\src\assets\icons\nightmode-svgrepo-com (3).svg" alt="dark_mode" width={20} height={20} />}</button>
      </div>
      <ul className="leftsidebar-ul">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <li className={`leftsidebar-link ${isActive && isDarkMode ? 'active-link dark-mode' : isActive ? 'active-link' : ''}`} key={link.label}>
              <NavLink to={link.route} className="leftside-navlink">
                <img
                  src={link.imgURL}
                  alt={link.label}
                  className={`group-hover:invert-white ${isActive && 'invert-white'}`} />
                {link.label}
              </NavLink>
            </li>
          );
        })}
        <li className={`leftsidebar-link`}>
        <div className="leftside-navlink">
        <LogOut></LogOut> Log Out
      </div>
        </li>
      </ul>
      </nav></>
  )
}

export default LeftSidebar