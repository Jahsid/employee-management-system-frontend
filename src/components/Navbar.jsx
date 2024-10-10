import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [fName, setFName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('f_Name');
    if (storedName) {
      setFName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('f_Name');
    setFName(null);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="flex space-x-4">
          <Link to="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
          <Link to="/register" className="text-white hover:text-gray-300">
            Register
          </Link>
          <Link to="/employee/new" className="text-white hover:text-gray-300">
            Create Employee
          </Link>
          <Link to="/employees" className="text-white hover:text-gray-300">
            Employee List
          </Link>
          <Link to="/dashboard" className="text-white hover:text-gray-300">
            Home
          </Link>
        </div>

        {fName && (
          <div className="flex space-x-4">
            <span className="text-white">{fName}</span>
            <button onClick={handleLogout} className="text-white">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
