import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
//import socket
import { io } from "socket.io-client";
//importing components
import HomePage from './components/Home/Page';
import ChatPage from './components/Chat/Page';
const socket=io.connect('http://localhost:9000/')
function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<HomePage socket={socket}/>}/>
          <Route path='/chat' element={<ChatPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
