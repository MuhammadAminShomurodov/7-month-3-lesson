import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { StudentProvider } from "./components/StudentContext";
import AllStudents from "./components/AllStudents";
import AddStudent from "./components/AddStudents";
import UpdateStudent from "./components/Update";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <StudentProvider>
        <Router>
          <div className="container mt-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={<ProtectedRoute element={<AllStudents />} />}
              />
              <Route
                path="/add"
                element={<ProtectedRoute element={<AddStudent />} />}
              />
              <Route
                path="/update/:id"
                element={<ProtectedRoute element={<UpdateStudent />} />}
              />
            </Routes>
            <ToastContainer />
          </div>
        </Router>
      </StudentProvider>
    </AuthProvider>
  );
};

export default App;
