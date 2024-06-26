import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://127.0.0.1:8000/omunavi/';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}logout/`, {}, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
