import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing.jsx';
import AboutPage from './pages/about.jsx';
import Authentication from './pages/authentication.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import VideoMeetComponent from './pages/videoMeet.jsx';
import HomeComponent from './pages/home.jsx';
import History from './pages/History.jsx';

function App() {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/auth' element={<Authentication />} />
            <Route path='/home' element={<HomeComponent />} />
            <Route path='/history' element={<History />} />
            {/* Ye hamesha niche hona chahiye baki fixed routes se */}
            <Route path='/:url' element={<VideoMeetComponent />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;