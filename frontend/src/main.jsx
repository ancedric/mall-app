import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'
import App from './App';
import LandingPage from './LandingPage';
import { clientId, domain } from '../auth0-config';
import Home from './Components/RootComponents/Home';
import Explore from './Components/RootComponents/explore';
import ViewPost from './Components/RootComponents/viewPost';
import Saved from './Components/RootComponents/Saved';
import CreatePost from './Components/RootComponents/CreatePost';
import UpdatePost from './Components/RootComponents/UpdatePost';
import RootLayout from './Root/RootLayout';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
  domain={domain}
  clientId={clientId}
  authorizationParams={{
    redirect_uri: window.location.origin
  }}>
    <Router>
      <Routes>
        {/*public Routes*/}
        <Route path='/' element = {<LandingPage />} />

        {/*private Routes*/}
        <Route path='/home' element = {<App />} />
        <Route element = {<RootLayout />} >
          <Route index path='/home' element = {<Home />} />
          <Route path='/root' element = {<Home />} />
          <Route path='/explore' element = {<Explore />} />
          <Route path='/view-post/:postId' element = {<ViewPost />} />
          <Route path='/saved' element = {<Saved />} />
          <Route path='/create-post' element = {<CreatePost />} />
          <Route path='/update-post/:id' element = {<UpdatePost />} />
        </Route>
      </Routes>
    </Router>
</Auth0Provider>,
    
)