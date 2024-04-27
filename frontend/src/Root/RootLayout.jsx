import Topbar from '../Components/RootComponents/Topbar'
import LeftSidebar from '../Components/RootComponents/LeftSidebar'
import RightHiddenbar from '../Components/RootComponents/RightHiddenbar'
import Bottombar from '../Components/RootComponents/Bottombar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className=" root-layout ">
      <LeftSidebar />
      <Topbar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
      <RightHiddenbar />
    </div>
  )
}

export default RootLayout