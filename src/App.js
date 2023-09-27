
import './App.css';
import React from 'react';
import { Route ,Routes } from "react-router-dom";
import Auth from './components/Auth/Auth';
import UserProfile from './components/UserProfile/UserProfile';
import NewsFeed from './components/NewsFeed/NewsFeed';
import Messaging from './components/Messaging/Messaging';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
          <NavBar />
        <Routes>
      
        <Route path="/" element = <Auth/> />
        <Route path="/profile" element = <UserProfile/> />
        <Route path="/news-feed" element = <NewsFeed/> />
        <Route path="/messaging" element = <Messaging/> />
      
      </Routes>
   




    </div>
  );
}

export default App;
