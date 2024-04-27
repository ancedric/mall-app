import { Link } from "react-router-dom"
import Profile from "../../Authentication/Profile"
import LogOut from "../../Authentication/Logout"

function Topbar() {
  return (
    <section className='topbar'>
        <div className='topbar-div '>
            <Link to='/' className=" topbar-link ">
                <img 
                    src='frontend\src\assets\images\logo.svg'
                    alt="logo"
                    width={130}
                    height={325}
                />
            </Link>
            <div className="topbar-profile">
              <Profile></Profile>
              <LogOut></LogOut>
            </div>
        </div>
    </section>
  )
}

export default Topbar