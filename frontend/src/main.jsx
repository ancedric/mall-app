import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'
import App from './App';
import LandingPage from './LandingPage';
import { clientId, domain } from '../auth0-config';

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
      </Routes>
    </Router>
</Auth0Provider>,
    
)