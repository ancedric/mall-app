import LogOut from "../../Authentication/Logout"
import Profile from "../../Authentication/Profile"

function LeftSidebar() {
  return (
    <div>
      <Profile></Profile>
      <LogOut></LogOut>
    </div>
  )
}

export default LeftSidebar