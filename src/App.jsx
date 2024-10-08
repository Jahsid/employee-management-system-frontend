import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import EmployeeForm from "./pages/EmployeeForm";
import './index.css';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/employee/new" element={<EmployeeForm />} />
            <Route path="/employee/edit/:id" element={<EmployeeForm isEdit={true} />} />
        </Routes>
    </Router>
  );
}

export default App;
