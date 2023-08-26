import { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [shopName, setShopName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      username,
      password,
      role,
      shop_name: role === 'seller' ? shopName : undefined,
    };

    try {
      const response = await axios.post('/register', user);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      </label>
      {role === 'seller' && (
        <label>
          Shop Name:
          <input type="text" value={shopName} onChange={(e) => setShopName(e.target.value)} required />
        </label>
      )}
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
