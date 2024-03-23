import Topbar from '../Components/RootComponents/Topbar'
import LeftSidebar from '../Components/RootComponents/LeftSidebar'
import RightHiddenbar from '../Components/RootComponents/RightHiddenbar'
import Bottombar from '../Components/RootComponents/Bottombar'

function RootLayout() {
  return (
    <div>
      <Topbar/>
      <LeftSidebar/>
      <RightHiddenbar/>
      <Bottombar/>
    </div>
  )
}

export default RootLayout