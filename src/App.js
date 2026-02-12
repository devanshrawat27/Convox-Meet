import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import LandingPage from './pages/landing.jsx';
import { Route,Routes} from 'react-router-dom';
import Authentication from './pages/authentication.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import VideoMeetComponent from './pages/videoMeet.jsx';




function App() {
  return (
        <div className='App'>
         
         <Router>
          <AuthProvider>
          <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/auth' element={<Authentication/>}/>

            <Route path='/:url' element={<VideoMeetComponent/>}></Route>
          </Routes>
          </AuthProvider>
         </Router>


        </div>
    
  );
}

export default App;
