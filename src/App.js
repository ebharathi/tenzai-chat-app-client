import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
//import socket
import { io } from "socket.io-client";
//importing components
import LoginPage from './components/Login/Page';
import HomePage from './components/Home/Page';
import ChatPage from './components/Chat/Page';
//socket connection here....
const socket=io.connect('http://localhost:9000/')

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<LoginPage socket={socket}/>}/>
          <Route path='/home' element={<HomePage socket={socket}/>}/>
          <Route path='/chat/:id' element={<ChatPage socket={socket}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
