import './login.css';
import Form from '../../component/form/form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {

  const user = useAuth();
  const navigate = useNavigate();

 // ✅ Redirect ONLY when user changes
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="divideSection">
  <div className="section1">
    <h1>Welcome to CRM</h1>
    <p>Manage your customers and get all the details in one place.</p>
  </div>

  <div className="section2">
    <Form />
  </div>
</div>

  );
}

export default Login;