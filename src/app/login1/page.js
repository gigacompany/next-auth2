'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession, status } from 'next-auth/react';
import Dashboard from '../dashboard/page';
import Home from '../page';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data: session } = useSession();
 


  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await signIn('credentials', {
      email,
      password,
      redirect: true,
    });

    if (response.ok) {
      router.push('/'); // Redirect to the home page after successful login
    } else {
      // Handle login error
      router.push('/login1')
      alert('Login failed. Please check your credentials.');
    }
  };

  if (session) {
    
    return (
      <div>
       <Home/>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="text"
              id="email"
              className="w-full border-gray-300 border rounded-md py-2 px-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="w-full border-gray-300 border rounded-md py-2 px-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-black rounded-md py-2 px-4 hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
