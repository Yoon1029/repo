import Topbar from "./component/Topbar";
import Sidebar from "./component/Sidebar";
import UserList from './component/UserList';
import RegisterPage from "./component/RegisterPage";
import AdminPage from "./component/AdminPage";
import Feed from "./component/Feed";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from "./component/LoginPage";

  
// import { AuthContext } from "./component/AuthContext";
// import { AuthProvider } from './AuthContext'; // AuthContext에서 AuthProvider를 import
// import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        
        {/* <AuthProvider> */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} /> */}
          <Route path="/users" element={<UserList />} />
          <Route path="feed" element={<Feed />} />
        </Routes>
        {/* </AuthProvider> */}
      </div>
    </ Router>

  );
}

export default App;
