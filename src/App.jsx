import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './index.css';
import Login from './Login';
import Singnup from './Signup';
import HomePage from './HomePage';
import TermsOfService from './TermsOfService';
import ForgotPass from './ForgotPass';
import Privacy from './Privacy';
import TripPlanner from './TripPlanner';
import Profile from './Profile';
import TravelLogs from './TravelLogs';

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Singnup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/terms",
      element: <TermsOfService/> 
    },
    {
      path: "/forgot-pass",
      element: <ForgotPass/>
    },
    {
      path: "/privacy",
      element: <Privacy/>
    },
    {
      path: "/trip-planner",
      element: <TripPlanner/>
    },
    {
      path: "/profile",
      element: <Profile />
    },
    {
      path: "/travel-logs",
      element: <TravelLogs />
    }


    
  ]);

  return <RouterProvider router={router}/>
}

export default App
